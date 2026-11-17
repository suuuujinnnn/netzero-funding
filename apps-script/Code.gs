// Deploy as the netzero account. This endpoint is public: return aggregate data only.
function doGet() {
  try {
    var sheet = SpreadsheetApp.openById(
      "1aAFvpV5t0_3YIngNYJspW6lffRnUx18n4YBeRjaMGgI",
    ).getSheetByName("홈페이지집계");
    if (!sheet || sheet.getLastRow() > 1001)
      throw new Error("Invalid aggregate");
    var rows = sheet
      .getRange(1, 1, Math.max(2, sheet.getLastRow()), 3)
      .getValues();
    if (
      JSON.stringify(rows[0]) !==
      JSON.stringify(["확인금액", "확인건수", "이름"])
    )
      throw new Error("Invalid header");
    var amount = rows[1][0],
      count = rows[1][1],
      names = [];
    if (
      !Number.isSafeInteger(amount) ||
      amount < 0 ||
      !Number.isSafeInteger(count) ||
      count < 0
    )
      throw new Error("Invalid totals");
    for (var i = 1; i < rows.length; i++) {
      if (i > 1 && (rows[i][0] !== "" || rows[i][1] !== ""))
        throw new Error("Invalid aggregate");
      var name = rows[i][2];
      if (name !== "") {
        if (typeof name !== "string" || !name.trim() || name.length > 80)
          throw new Error("Invalid name");
        names.push(name.trim());
      }
    }
    if (names.length > count) throw new Error("Invalid count");
    return ContentService.createTextOutput(
      JSON.stringify({ amount: amount, count: count, names: names }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error" }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
