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

console.log("view-counter tests passed");
