export async function onRequestGet(context) {
  const key = "profile-views";
  const readOnly = new URL(context.request.url).searchParams.get("mode") === "read";

  try {
    const current = Number.parseInt((await context.env.PHANTOM_VIEWS.get(key)) ?? "0", 10) || 0;
    const value = readOnly ? current : current + 1;

    if (!readOnly) {
      await context.env.PHANTOM_VIEWS.put(key, String(value));
    }

    return Response.json(
      { count: value },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "Content-Type": "application/json; charset=utf-8",
        },
      },
    );
  } catch {
    return Response.json(
      { error: "counter_unavailable" },
      { status: 503, headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  }
}
