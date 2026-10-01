import assert from "node:assert/strict";
import test from "node:test";
import {
  parseFundingCsv,
  filledPieces,
  loadFunding,
} from "../src/views/project/ui/funding-data.ts";

test("CSV: ordered names, duplicate names and escaped characters survive", () => {
  assert.deepEqual(
    parseFundingCsv(
      '\uFEFF확인금액,확인건수,공개표시명\r\n400000,3,\r\n,,김하늘\r\n,,김하늘\r\n,,"이름, \"\"별명\"\""\r\n',
    ),
    { amount: 400000, count: 3, names: ["김하늘", "김하늘", '이름, "별명"'] },
  );
});
test("zero, corrected and removed records replace previous snapshots", () => {
  for (const [amount, count, names] of [
    [0, 0, []],
    [100000, 2, ["가", "나"]],
    [50000, 1, ["가"]],
    [0, 0, []],
  ]) {
    const csv = `확인금액,확인건수,공개표시명\n${amount},${count},\n${names.map((n) => `,,${n}`).join("\n")}`;
    assert.deepEqual(parseFundingCsv(csv), { amount, count, names });
  }
});
test("malformed, private, repeated totals and invalid numeric cells fail closed", () => {
  for (const csv of [
    "확인금액,확인건수,이메일\n0,0,a@b",
    "확인금액,확인건수,공개표시명\n-1,0,",
    "확인금액,확인건수,공개표시명\n1.2,1,",
    "확인금액,확인건수,공개표시명\n1,1,\n2,1,",
    "확인금액,확인건수,공개표시명\n1,0,이름",
    '확인금액,확인건수,공개표시명\n1,1,"열림',
    "<html>Google login</html>",
    "확인금액,확인건수,공개표시명\n9007199254740992,0,",
  ])
    assert.throws(() => parseFundingCsv(csv));
});
test("24-piece boundaries and over-goal values", () => {
  for (const [amount, expected] of [
    [0, 0],
    [33333, 0],
    [33334, 1],
    [400000, 12],
    [799999, 23],
    [800000, 24],
    [900000, 24],
  ])
    assert.equal(filledPieces(amount), expected);
});
test("only published Google CSV endpoints can be requested", async () => {
  for (const url of [
    "http://docs.google.com/spreadsheets/d/e/a/pub?output=csv",
    "https://example.com/data.csv",
    "https://docs.google.com/spreadsheets/d/private/edit",
  ])
    await assert.rejects(loadFunding(url, new AbortController().signal));
});
