import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import {
  filledPieces,
  loadFunding,
} from "../src/views/project/ui/funding-data.ts";
import {
  fundingResponse,
  publishFunding,
} from "../src/views/project/api/private-funding.ts";
test("publisher reads only validated aggregate values", () => {
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
    };
    runInNewContext(code, context);
    return JSON.parse(JSON.stringify(context.readFunding_()));
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
    assert.throws(() => run(rows));
});
test("puzzle boundaries", () => {
  for (let piece = 1; piece <= 24; piece++) {
    const threshold = Math.ceil((piece * 500000) / 24);
    assert.equal(filledPieces(threshold - 1), piece - 1);
    assert.equal(filledPieces(threshold), piece);
  }
  for (const [a, n] of [
    [0, 0],
    [20833, 0],
    [20834, 1],
    [250000, 12],
    [499999, 23],
    [500000, 24],
    [550000, 24],
  ])
    assert.equal(filledPieces(a), n);
});
test("only authenticated, valid updates replace the last saved snapshot", async () => {
  const env = {
    BLOB_READ_WRITE_TOKEN: "blob-token",
    FUNDING_SYNC_SECRET: "sync-secret",
  };
  const data = { amount: 33334, count: 1, names: ["가"] };
  let saved;
  let failWrite = false;
  const write = async (pathname, body, options) => {
    assert.equal(pathname, "funding/current.json");
    assert.equal(options.access, "private");
    assert.equal(options.allowOverwrite, true);
    assert.equal(options.token, env.BLOB_READ_WRITE_TOKEN);
    if (failWrite) throw new Error("storage unavailable");
    saved = body;
  };
  const read = async (pathname, options) => {
    assert.equal(pathname, "funding/current.json");
    assert.equal(options.access, "private");
    assert.equal(options.useCache, false);
    return saved ? { stream: new Response(saved).body } : null;
  };
  const publish = (body, key = "sync-secret") =>
    publishFunding(
      new Request("https://example.com/api/funding", {
        method: "POST",
        headers: { authorization: `Bearer ${key}` },
        body: JSON.stringify(body),
      }),
      env,
      write,
    );

  assert.deepEqual(await (await fundingResponse({}, read)).json(), {
    status: "unconfigured",
  });
  assert.equal((await fundingResponse(env, read)).status, 503);
  assert.equal((await publish(data, "wrong-secret")).status, 401);
  assert.equal((await publish({ ...data, email: "private" })).status, 400);
  assert.equal(saved, undefined);

  assert.equal((await publish(data)).status, 204);
  const first = await (await fundingResponse(env, read)).json();
  assert.equal(first.status, "ready");
  assert.deepEqual(first.data, data);
  assert(Number.isFinite(Date.parse(first.checkedAt)));

  const correction = { amount: 0, count: 0, names: [] };
  failWrite = true;
  assert.equal((await publish(correction)).status, 503);
  assert.deepEqual(await (await fundingResponse(env, read)).json(), first);
  failWrite = false;
  assert.equal((await publish(correction)).status, 204);
  assert.deepEqual(
    (await (await fundingResponse(env, read)).json()).data,
    correction,
  );
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
