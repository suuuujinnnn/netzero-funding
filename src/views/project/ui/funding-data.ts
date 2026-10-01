export const FUNDING_TARGET = 800_000;
export const REFRESH_INTERVAL = 5 * 60 * 1000;
export type FundingData = { amount: number; count: number; names: string[] };
export const INITIAL_FUNDING: FundingData = { amount: 0, count: 0, names: [] };
export function filledPieces(amount: number) {
  return Math.min(24, Math.max(0, Math.floor((amount / FUNDING_TARGET) * 24)));
}

function csvRows(source: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  let closed = false;
  const text = source.replace(/^\uFEFF/, "");
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          quoted = false;
          closed = true;
        }
      } else field += c;
      continue;
    }
    if (c === '"') {
      if (field || closed) throw new Error("CSV 인용부호 오류");
      quoted = true;
    } else if (c === "," || c === "\n" || c === "\r") {
      row.push(field);
      field = "";
      closed = false;
      if (c !== ",") {
        rows.push(row);
        row = [];
        if (c === "\r" && text[i + 1] === "\n") i++;
      }
    } else {
      if (closed) throw new Error("CSV 인용부호 오류");
      field += c;
    }
  }
  if (quoted) throw new Error("CSV 인용부호 오류");
  if (field || closed || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim()));
}
export function parseFundingCsv(source: string): FundingData {
  const rows = csvRows(source);
  const headers = rows.shift()?.map((s) => s.trim());
  if (
    !headers ||
    headers.length !== 3 ||
    new Set(headers).size !== 3 ||
    !["확인금액", "확인건수", "공개표시명"].every((h) => headers.includes(h))
  )
    throw new Error("공개 CSV 열을 확인해 주세요.");
  if (!rows.length || rows.some((r) => r.length !== 3))
    throw new Error("CSV 행을 확인해 주세요.");
  const ai = headers.indexOf("확인금액"),
    ci = headers.indexOf("확인건수"),
    ni = headers.indexOf("공개표시명");
  const integer = (value: string) => {
    const v = value.trim();
    if (!/^\d+$/.test(v))
      throw new Error("집계는 음수가 아닌 정수여야 합니다.");
    const n = Number(v);
    if (!Number.isSafeInteger(n)) throw new Error("집계 범위 오류");
    return n;
  };
  const amount = integer(rows[0][ai]);
  const count = integer(rows[0][ci]);
  if (rows.slice(1).some((r) => r[ai].trim() || r[ci].trim()))
    throw new Error("집계는 첫 번째 데이터 행에만 입력해 주세요.");
  const names = rows.map((r) => r[ni].trim()).filter(Boolean);
  if (names.some((n) => n.length > 80) || names.length > count)
    throw new Error("공개 이름 목록을 확인해 주세요.");
  return { amount, count, names };
}
export async function loadFunding(
  url: string,
  signal: AbortSignal,
): Promise<FundingData> {
  const address = new URL(url);
  if (
    address.protocol !== "https:" ||
    address.hostname !== "docs.google.com" ||
    !address.pathname.startsWith("/spreadsheets/d/e/") ||
    !address.pathname.endsWith("/pub") ||
    address.searchParams.get("output") !== "csv"
  )
    throw new Error("게시된 Google Sheets CSV 주소가 필요합니다.");
  const response = await fetch(address, {
    signal,
    cache: "no-store",
    credentials: "omit",
  });
  if (!response.ok) throw new Error("집계 요청 실패");
  const text = await response.text();
  if (text.length > 1_000_000) throw new Error("집계 파일 크기 초과");
  return parseFundingCsv(text);
}

export type FundingState = {
  data: FundingData | null;
  status: "unconfigured" | "loading" | "ready" | "error";
  checkedAt: string | null;
};
