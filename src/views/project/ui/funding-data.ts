export const FUNDING_TARGET = 800_000;
export const REFRESH_INTERVAL = 5 * 60 * 1000;
export type FundingData = { amount: number; count: number; names: string[] };
export const INITIAL_FUNDING: FundingData = { amount: 0, count: 0, names: [] };
export function filledPieces(amount: number) {
  return Math.min(24, Math.max(0, Math.floor((amount / FUNDING_TARGET) * 24)));
}
export function validateFunding(value: unknown): FundingData {
  if (!value || typeof value !== "object") throw new Error("집계 형식 오류");
  const v = value as Record<string, unknown>;
  if (
    Object.keys(v).sort().join(",") !== "amount,count,names" ||
    typeof v.amount !== "number" ||
    !Number.isSafeInteger(v.amount) ||
    v.amount < 0 ||
    typeof v.count !== "number" ||
    !Number.isSafeInteger(v.count) ||
    v.count < 0 ||
    !Array.isArray(v.names) ||
    v.names.length > v.count ||
    v.names.some((n) => typeof n !== "string" || !n.trim() || n.length > 80)
  )
    throw new Error("집계 값 오류");
  return {
    amount: v.amount,
    count: v.count,
    names: v.names.map((n) => n.trim()),
  };
}
export type FundingState = {
  data: FundingData | null;
  status: "unconfigured" | "loading" | "ready" | "error";
  checkedAt: string | null;
};
export type FundingResult =
  | { status: "unconfigured" }
  | { status: "ready"; data: FundingData; checkedAt: string };
export async function loadFunding(signal: AbortSignal): Promise<FundingResult> {
  const response = await fetch("/api/funding", {
    signal,
    cache: "no-store",
    credentials: "omit",
  });
  if (!response.ok) throw new Error("집계 요청 실패");
  const value: unknown = await response.json();
  if (!value || typeof value !== "object") throw new Error("집계 형식 오류");
  const v = value as Record<string, unknown>;
  if (v.status === "unconfigured" && Object.keys(v).length === 1)
    return { status: "unconfigured" };
  if (
    v.status !== "ready" ||
    Object.keys(v).sort().join(",") !== "checkedAt,data,status" ||
    typeof v.checkedAt !== "string" ||
    !Number.isFinite(Date.parse(v.checkedAt))
  )
    throw new Error("집계 형식 오류");
  return {
    status: "ready",
    data: validateFunding(v.data),
    checkedAt: v.checkedAt,
  };
}
