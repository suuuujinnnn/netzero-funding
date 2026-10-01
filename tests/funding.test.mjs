import assert from "node:assert/strict";
import test from "node:test";
import { generateKeyPairSync, verify } from "node:crypto";
import {
  validateFunding,
  filledPieces,
  loadFunding,
} from "../src/views/project/ui/funding-data.ts";
import {
  fundingConfig,
  parseSheetFunding,
  queryPrivateFunding,
  fundingResponse,
} from "../src/views/project/api/private-funding.ts";
const snapshot = (amount, count, names = []) => ({
  values: [
    ["확인금액", "확인건수", "이름"],
    [amount, count],
    ...names.map((n) => ["", "", n]),
  ],
});
test("snapshot preserves order, duplicates, corrections, removal and over-goal totals", () => {
  for (const [amount, count, names] of [
    [0, 0, []],
    [400000, 3, ["가", "가", "나"]],
    [900000, 1, ["가"]],
    [0, 0, []],
  ])
    assert.deepEqual(parseSheetFunding(snapshot(amount, count, names)), {
      amount,
      count,
      names,
    });
});
test("rejects private columns, invalid numbers, formula errors and malformed aggregates", () => {
  for (const value of [
    {
      values: [
        ["확인금액", "확인건수", "이메일"],
        [0, 0],
      ],
    },
    snapshot(-1, 0),
    snapshot(1.2, 1),
    snapshot("1000", 1),
    snapshot("#N/A", 1),
    snapshot(1, 0, ["가"]),
    snapshot(Number.MAX_SAFE_INTEGER + 1, 1),
    {
      values: [
        ["확인금액", "확인건수", "이름"],
        [0, 0],
        [1, 1],
      ],
    },
  ])
    assert.throws(() => parseSheetFunding(value));
  assert.throws(() =>
    validateFunding({ amount: 0, count: 0, names: [], email: "private" }),
  );
});
test("puzzle boundaries", () => {
  for (const [a, n] of [
    [0, 0],
    [33333, 0],
    [33334, 1],
    [400000, 12],
    [799999, 23],
    [800000, 24],
    [900000, 24],
  ])
    assert.equal(filledPieces(a), n);
});
test("setup state versus incomplete credentials", () => {
  assert.equal(fundingConfig({}), null);
  assert.equal(fundingConfig({ GOOGLE_FUNDING_SPREADSHEET_ID: "sheet" }), null);
  assert.throws(() =>
    fundingConfig({ GOOGLE_SERVICE_ACCOUNT_EMAIL: "partial" }),
  );
});
test("signed readonly authentication requests only sanitized sheet range", async (t) => {
  const { privateKey, publicKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048,
  });
  const config = {
    spreadsheetId: "test-sheet",
    email: "reader@test.iam.gserviceaccount.com",
    privateKey: privateKey.export({ type: "pkcs8", format: "pem" }),
  };
  let calls = 0;
  t.mock.method(globalThis, "fetch", async (url, init) => {
    assert.equal(init.cache, "no-store");
    assert.equal(init.redirect, "error");
    calls++;
    if (calls === 1) {
      assert.equal(String(url), "https://oauth2.googleapis.com/token");
      const assertion = init.body.get("assertion"),
        parts = assertion.split(".");
      assert(
        verify(
          "RSA-SHA256",
          Buffer.from(parts.slice(0, 2).join(".")),
          publicKey,
          Buffer.from(parts[2], "base64url"),
        ),
      );
      const claims = JSON.parse(Buffer.from(parts[1], "base64url"));
      assert.equal(
        claims.scope,
        "https://www.googleapis.com/auth/spreadsheets.readonly",
      );
      assert.equal(claims.exp - claims.iat, 3600);
      assert.equal(claims.iss, config.email);
      return Response.json({ access_token: "test-token" });
    }
    const address = new URL(url);
    assert.equal(address.hostname, "sheets.googleapis.com");
    assert(
      decodeURIComponent(address.pathname).endsWith("/'홈페이지집계'!A1:C1001"),
    );
    assert.equal(
      address.searchParams.get("valueRenderOption"),
      "UNFORMATTED_VALUE",
    );
    assert.equal(init.headers.Authorization, "Bearer test-token");
    return Response.json({
      ...snapshot(100000, 2, ["가"]),
      privateUnrequestedMetadata: "ignored",
    });
  });
  assert.deepEqual(
    await queryPrivateFunding(config, new AbortController().signal),
    { amount: 100000, count: 2, names: ["가"] },
  );
  assert.equal(calls, 2);
});
test("server masks upstream errors and supports retry, caching and concurrency", async (t) => {
  const { privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
  const env = {
    GOOGLE_FUNDING_SPREADSHEET_ID: "handler-sheet",
    GOOGLE_SERVICE_ACCOUNT_EMAIL: "reader@test.iam.gserviceaccount.com",
    GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: privateKey.export({
      type: "pkcs8",
      format: "pem",
    }),
  };
  let fail = true,
    calls = 0;
  t.mock.method(globalThis, "fetch", async (url) => {
    calls++;
    if (fail) return new Response("private-detail", { status: 403 });
    return String(url).includes("oauth2")
      ? Response.json({ access_token: "test-token" })
      : Response.json(snapshot(33334, 1, ["가"]));
  });
  const unconfigured = await fundingResponse({});
  assert.deepEqual(await unconfigured.json(), { status: "unconfigured" });
  const error = await fundingResponse(env);
  assert.equal(error.status, 503);
  assert.deepEqual(await error.json(), { status: "error" });
  assert.equal(error.headers.get("Cache-Control"), "no-store");
  fail = false;
  const results = await Promise.all([
    fundingResponse(env),
    fundingResponse(env),
  ]);
  for (const r of results) {
    const b = await r.json();
    assert.deepEqual(b.data, { amount: 33334, count: 1, names: ["가"] });
    assert.equal(b.status, "ready");
    assert(Number.isFinite(Date.parse(b.checkedAt)));
  }
  assert.equal(calls, 3);
  await fundingResponse(env);
  assert.equal(calls, 3);
});
test("browser uses same-origin endpoint and fails closed on errors", async (t) => {
  let mode = "ok";
  t.mock.method(globalThis, "fetch", async (url, init) => {
    assert.equal(url, "/api/funding");
    assert.equal(init.credentials, "omit");
    if (mode === "network") throw new Error("network");
    if (mode === "error")
      return Response.json({ status: "error" }, { status: 503 });
    if (mode === "unconfigured")
      return Response.json({ status: "unconfigured" });
    if (mode === "bad")
      return Response.json({
        status: "ready",
        checkedAt: "invalid",
        data: { amount: 0, count: 0, names: [] },
      });
    return Response.json({
      status: "ready",
      checkedAt: new Date().toISOString(),
      data: { amount: 0, count: 0, names: [] },
    });
  });
  assert.equal(
    (await loadFunding(new AbortController().signal)).status,
    "ready",
  );
  mode = "unconfigured";
  assert.equal(
    (await loadFunding(new AbortController().signal)).status,
    "unconfigured",
  );
  for (mode of ["error", "network", "bad"])
    await assert.rejects(loadFunding(new AbortController().signal));
});
