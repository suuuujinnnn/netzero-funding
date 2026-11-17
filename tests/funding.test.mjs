import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import {
  filledPieces,
  loadFunding,
} from "../src/views/project/ui/funding-data.ts";
import {
  fundingConfig,
  fundingResponse,
} from "../src/views/project/api/private-funding.ts";
test("published script exposes only validated aggregate values", () => {
  const code = readFileSync(
    new URL("../apps-script/Code.gs", import.meta.url),
    "utf8",
  );
  const run = (rows) => {
    const sheet = {
      getLastRow: () => rows.length,
      getRange: (_row, _col, _height, width) => {
        assert.equal(width, 3);
        return { getValues: () => rows };
      },
    };
    const context = {
      SpreadsheetApp: {
        openById: () => ({
          getSheetByName: (name) => {
            assert.equal(name, "홈페이지집계");
            return sheet;
          },
        }),
      },
      ContentService: {
        MimeType: { JSON: "json" },
        createTextOutput: (text) => ({ setMimeType: () => text }),
      },
    };
    runInNewContext(code, context);
    return JSON.parse(context.doGet());
  };
  const header = ["확인금액", "확인건수", "이름"];
  assert.deepEqual(run([header, [1000, 2, "가"], ["", "", "가"]]), {
    amount: 1000,
    count: 2,
    names: ["가", "가"],
  });
  for (const rows of [
    [header, ["#ERROR!", 1, ""]],
    [header, [1, 0, "가"]],
    [header, [1, 1, ""], [5, "", ""]],
    [
      ["확인금액", "확인건수", "이메일"],
      [0, 0, ""],
    ],
  ])
    assert.deepEqual(run(rows), { status: "error" });
});
test("puzzle boundaries", () => {
  for (const [a, n] of [
    [0, 0],
    [41666, 0],
    [41667, 1],
    [500000, 12],
    [800000, 19],
    [999999, 23],
    [1000000, 24],
    [1100000, 24],
  ])
    assert.equal(filledPieces(a), n);
});
test("Apps Script configuration rejects unsafe URLs", () => {
  assert.equal(fundingConfig({}), null);
  for (const url of [
    "http://script.google.com/macros/s/id/exec",
    "https://example.com/macros/s/id/exec",
    "https://script.google.com/macros/s/id/dev",
    "https://script.google.com/macros/s/id/exec?x=1",
  ])
    assert.throws(() => fundingConfig({ FUNDING_APPS_SCRIPT_URL: url }));
});
test("server validates redirects, response data, caches and masks failures", async (t) => {
  const env = {
    FUNDING_APPS_SCRIPT_URL: "https://script.google.com/macros/s/test/exec",
  };
  let mode = "badRedirect",
    calls = 0;
  t.mock.method(globalThis, "fetch", async (url, init) => {
    calls++;
    if (String(url).includes("script.google.com"))
      return new Response(null, {
        status: 302,
        headers: {
          location:
            mode === "badRedirect"
              ? "https://example.com/"
              : "https://script.googleusercontent.com/macros/echo?token=test",
        },
      });
    assert.equal(init.redirect, "error");
    return Response.json(
      mode === "badData"
        ? { amount: 1, count: 0, names: [], email: "private" }
        : { amount: 33334, count: 1, names: ["가"] },
    );
  });
  assert.deepEqual(await (await fundingResponse({})).json(), {
    status: "unconfigured",
  });
  for (mode of ["badRedirect", "badData"]) {
    const response = await fundingResponse(env);
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { status: "error" });
  }
  mode = "ok";
  const results = await Promise.all([
    fundingResponse(env),
    fundingResponse(env),
  ]);
  for (const response of results) {
    const value = await response.json();
    assert.deepEqual(value.data, { amount: 33334, count: 1, names: ["가"] });
    assert.equal(value.status, "ready");
    assert(Number.isFinite(Date.parse(value.checkedAt)));
  }
  const previous = calls;
  await fundingResponse(env);
  assert.equal(calls, previous);
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
