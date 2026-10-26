import assert from "node:assert/strict";
import { onRequest } from "../functions/api/views.js";

function createKv(initial = "7") {
  const values = new Map([["profile-views", initial]]);
  return {
    async get(key) { return values.get(key) ?? null; },
    async put(key, value) { values.set(key, String(value)); },
    values,
  };
}

function createFailingKv() {
  return {
    async get() { throw new Error("KV unavailable"); },
    async put() { throw new Error("KV unavailable"); },
  };
}

function createConcurrentKv(initial = "7") {
  const values = new Map([["profile-views", initial]]);
  return {
    async get(key) {
      if (key === "profile-views") await new Promise((resolve) => setTimeout(resolve, 5));
      return values.get(key) ?? null;
    },
    async put(key, value) { values.set(key, String(value)); },
    values,
  };
}

function context(kv, request) {
  return { env: { PHANTOM_VIEWS: kv }, request };
}

const readRequest = () => new Request("https://example.com/api/views", { method: "GET" });
const postRequest = (sessionToken, contentType = "application/json") => new Request("https://example.com/api/views", {
  method: "POST",
  headers: { "Content-Type": contentType, Origin: "https://example.com" },
  body: JSON.stringify({ sessionToken }),
});

const kv = createKv();
let response = await onRequest(context(kv, readRequest()));
assert.equal(response.status, 200);
assert.deepEqual(await response.json(), { count: 7 });
assert.equal(kv.values.get("profile-views"), "7", "GET must not increment");

response = await onRequest(context(kv, postRequest("11111111-1111-4111-8111-111111111111")));
assert.equal(response.status, 200);
assert.deepEqual(await response.json(), { count: 8, counted: true });

response = await onRequest(context(kv, postRequest("11111111-1111-4111-8111-111111111111")));
assert.equal(response.status, 200);
assert.deepEqual(await response.json(), { count: 8, counted: false });

response = await onRequest(context(kv, postRequest("not-valid")));
assert.equal(response.status, 400);
assert.deepEqual(await response.json(), { error: "invalid_session" });

response = await onRequest(context(kv, postRequest("22222222-2222-4222-8222-222222222222", "text/plain")));
assert.equal(response.status, 415);
assert.deepEqual(await response.json(), { error: "invalid_content_type" });

response = await onRequest(context(kv, new Request("https://example.com/api/views", { method: "DELETE" })));
assert.equal(response.status, 405);

response = await onRequest({ env: {}, request: readRequest() });
assert.equal(response.status, 503, "missing KV binding must fail safely");

response = await onRequest(context(createFailingKv(), readRequest()));
assert.equal(response.status, 503, "KV read failures must not expose internals");

const concurrentKv = createConcurrentKv();
const concurrentResponses = await Promise.all([
  onRequest(context(concurrentKv, postRequest("44444444-4444-4444-8444-444444444444"))),
  onRequest(context(concurrentKv, postRequest("55555555-5555-4555-8555-555555555555"))),
]);
assert.deepEqual(concurrentResponses.map((item) => item.status), [200, 200]);
assert.ok(Number(concurrentKv.values.get("profile-views")) >= 8, "concurrent requests must remain valid");

console.log("view-counter tests passed");
