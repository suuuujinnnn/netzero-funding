var FUNDING_SHEET_ID = "1aAFvpV5t0_3YIngNYJspW6lffRnUx18n4YBeRjaMGgI";

function readFunding_() {
  var sheet =
    SpreadsheetApp.openById(FUNDING_SHEET_ID).getSheetByName("홈페이지집계");
  if (!sheet || sheet.getLastRow() > 1001) throw new Error("Invalid aggregate");
  var rows = sheet
    .getRange(1, 1, Math.max(2, sheet.getLastRow()), 3)
    .getValues();
  if (
    JSON.stringify(rows[0]) !== JSON.stringify(["확인금액", "확인건수", "이름"])
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
  return { amount: amount, count: count, names: names };
}

/** Run once from the editor as the sheet's operating account. */
function installFundingSync() {
  publishFunding_(true);
  ScriptApp.getProjectTriggers().forEach(function (trigger) {
    if (
      ["onFundingEdit", "retryFundingSync"].indexOf(
        trigger.getHandlerFunction(),
      ) !== -1
    )
      ScriptApp.deleteTrigger(trigger);
  });
  ScriptApp.newTrigger("onFundingEdit")
    .forSpreadsheet(FUNDING_SHEET_ID)
    .onEdit()
    .create();
  ScriptApp.newTrigger("retryFundingSync").timeBased().everyMinutes(5).create();
}

function onFundingEdit(event) {
  var name = event.range.getSheet().getName();
  if (name === "실제 응답" || name === "홈페이지집계") publishFunding_();
}

function retryFundingSync() {
  publishFunding_();
}

function publishFunding_(force) {
  var lock = LockService.getScriptLock();
  if (force) lock.waitLock(30000);
  else if (!lock.tryLock(1000)) return; // The periodic trigger catches skipped edits.
  try {
    var properties = PropertiesService.getScriptProperties();
    var url = properties.getProperty("FUNDING_SYNC_URL");
    var secret = properties.getProperty("FUNDING_SYNC_SECRET");
    if (!url || !/^https:\/\/[a-z0-9.-]+\/api\/funding$/i.test(url) || !secret)
      throw new Error("Funding sync configuration is missing or invalid");

    SpreadsheetApp.flush();
    var body = JSON.stringify(readFunding_());
    var digest = Utilities.base64EncodeWebSafe(
      Utilities.computeDigest(
        Utilities.DigestAlgorithm.SHA_256,
        url + "\n" + body,
        Utilities.Charset.UTF_8,
      ),
    );
    if (!force && digest === properties.getProperty("FUNDING_LAST_PUBLISHED"))
      return;

    var response = UrlFetchApp.fetch(url, {
      method: "post",
      contentType: "application/json",
      headers: { Authorization: "Bearer " + secret },
      payload: body,
      followRedirects: false,
      muteHttpExceptions: true,
    });
    if (response.getResponseCode() !== 204)
      throw new Error(
        "Funding sync failed (HTTP " + response.getResponseCode() + ")",
      );
    properties.setProperty("FUNDING_LAST_PUBLISHED", digest);
  } finally {
    lock.releaseLock();
  }
}
