const COUNTER_KEY = "profile-views";
const SESSION_KEY_PREFIX = "profile-view-session:";
const SESSION_TTL_SECONDS = 86_400;
const MAX_BODY_BYTES = 256;
const SECURITY_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
  "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; media-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'",
  "Content-Type": "application/json; charset=utf-8",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
};

function json(body, status = 200) {
  return Response.json(body, { status, headers: SECURITY_HEADERS });
}

function isSameOrigin(request) {
  const origin = request.headers.get("Origin");
  if (!origin) return true;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

function validSessionToken(token) {
  return typeof token === "string" && /^[a-f0-9-]{16,100}$/i.test(token);
}

async function readCount(kv) {
  return Number.parseInt((await kv.get(COUNTER_KEY)) ?? "0", 10) || 0;
}

export async function onRequestGet(context) {
  try {
    return json({ count: await readCount(context.env.PHANTOM_VIEWS) });
  } catch {
    return json({ error: "counter_unavailable" }, 503);
  }
}

export async function onRequestPost(context) {
  if (!isSameOrigin(context.request)) return json({ error: "invalid_origin" }, 403);
  if (context.request.headers.get("Content-Type")?.split(";")[0].trim() !== "application/json") {
    return json({ error: "invalid_content_type" }, 415);
  }
  const contentLength = Number(context.request.headers.get("Content-Length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) return json({ error: "request_too_large" }, 413);

  let body;
  try {
    body = await context.request.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }
  if (!validSessionToken(body?.sessionToken)) return json({ error: "invalid_session" }, 400);

  try {

    const sessionKey = `${SESSION_KEY_PREFIX}${body.sessionToken}`;
    const alreadyCounted = await context.env.PHANTOM_VIEWS.get(sessionKey);
    if (alreadyCounted) return json({ count: await readCount(context.env.PHANTOM_VIEWS), counted: false });

    const current = await readCount(context.env.PHANTOM_VIEWS);
    const next = current + 1;
    await context.env.PHANTOM_VIEWS.put(COUNTER_KEY, String(next));
    await context.env.PHANTOM_VIEWS.put(sessionKey, "1", { expirationTtl: SESSION_TTL_SECONDS });
    return json({ count: next, counted: true });
  } catch {
    return json({ error: "counter_unavailable" }, 503);
  }
}

export function onRequest(context) {
  if (context.request.method === "GET") return onRequestGet(context);
  if (context.request.method === "POST") return onRequestPost(context);
  return json({ error: "method_not_allowed" }, 405);
}
