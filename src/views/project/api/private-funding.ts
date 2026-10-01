import { createPrivateKey, sign } from "node:crypto";
import { validateFunding } from "../ui/funding-data.ts";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const RANGE = "'홈페이지집계'!A1:C1001";
type Config = { spreadsheetId: string; email: string; privateKey: string };
export function fundingConfig(env: NodeJS.ProcessEnv): Config | null {
  const spreadsheetId = env.GOOGLE_FUNDING_SPREADSHEET_ID?.trim();
  const email = env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n",
  ).trim();
  if (!email && !privateKey) return null;
  if (
    !spreadsheetId ||
    !/^[a-zA-Z0-9_-]+$/.test(spreadsheetId) ||
    !email ||
    !/^[^\s@]+@[^\s@]+\.iam\.gserviceaccount\.com$/.test(email) ||
    !privateKey
  )
    throw new Error("서버 설정 오류");
  return { spreadsheetId, email, privateKey };
}
export function parseSheetFunding(value: unknown) {
  if (!value || typeof value !== "object") throw new Error("집계 형식 오류");
  const rows = (value as { values?: unknown }).values;
  if (
    !Array.isArray(rows) ||
    rows.length < 2 ||
    rows.length > 1001 ||
    rows.some((r) => !Array.isArray(r) || r.length > 3)
  )
    throw new Error("집계 행 오류");
  if (
    JSON.stringify(rows[0]) !== JSON.stringify(["확인금액", "확인건수", "이름"])
  )
    throw new Error("집계 열 오류");
  const names: string[] = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (i > 1 && row.slice(0, 2).some((v: unknown) => v !== "" && v != null))
      throw new Error("집계 위치 오류");
    const name = row[2];
    if (name != null && name !== "") {
      if (typeof name !== "string") throw new Error("이름 형식 오류");
      if (name.trim()) names.push(name.trim());
    }
  }
  return validateFunding({ amount: rows[1][0], count: rows[1][1], names });
}
async function json(response: Response): Promise<unknown> {
  if (!response.ok) throw new Error("Google 요청 실패");
  const source = await response.text();
  if (source.length > 1_000_000) throw new Error("응답 크기 오류");
  return JSON.parse(source);
}
export async function queryPrivateFunding(config: Config, signal: AbortSignal) {
  const key = createPrivateKey(config.privateKey);
  if (key.asymmetricKeyType !== "rsa") throw new Error("서버 인증키 오류");
  const issued = Math.floor(Date.now() / 1000);
  const encode = (v: object) =>
    Buffer.from(JSON.stringify(v)).toString("base64url");
  const payload = `${encode({ alg: "RS256", typ: "JWT" })}.${encode({ iss: config.email, scope: "https://www.googleapis.com/auth/spreadsheets.readonly", aud: TOKEN_URL, iat: issued, exp: issued + 3600 })}`;
  const assertion = `${payload}.${sign("RSA-SHA256", Buffer.from(payload), key).toString("base64url")}`;
  const token = await json(
    await fetch(TOKEN_URL, {
      method: "POST",
      cache: "no-store",
      signal,
      redirect: "error",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion,
      }),
    }),
  );
  const access = (token as { access_token?: unknown } | null)?.access_token;
  if (typeof access !== "string" || !access || /[\r\n]/.test(access))
    throw new Error("서버 인증 실패");
  const url = new URL(
    `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/${encodeURIComponent(RANGE)}`,
  );
  url.searchParams.set("valueRenderOption", "UNFORMATTED_VALUE");
  url.searchParams.set("majorDimension", "ROWS");
  return parseSheetFunding(
    await json(
      await fetch(url, {
        signal,
        cache: "no-store",
        redirect: "error",
        headers: { Authorization: `Bearer ${access}` },
      }),
    ),
  );
}
let cache: {
  data: ReturnType<typeof parseSheetFunding>;
  checkedAt: string;
  expires: number;
  spreadsheetId: string;
} | null = null;
let pending: Promise<Response> | null = null;
const headers = {
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};
export async function fundingResponse(
  env: NodeJS.ProcessEnv = process.env,
): Promise<Response> {
  let config: Config | null;
  try {
    config = fundingConfig(env);
  } catch {
    return Response.json({ status: "error" }, { status: 503, headers });
  }
  if (!config) return Response.json({ status: "unconfigured" }, { headers });
  if (
    cache &&
    cache.spreadsheetId === config.spreadsheetId &&
    Date.now() < cache.expires
  )
    return Response.json(
      { status: "ready", data: cache.data, checkedAt: cache.checkedAt },
      { headers },
    );
  if (pending) return (await pending).clone();
  pending = (async () => {
    try {
      const data = await queryPrivateFunding(
        config,
        AbortSignal.timeout(10000),
      );
      const checkedAt = new Date().toISOString();
      cache = {
        data,
        checkedAt,
        expires: Date.now() + 60000,
        spreadsheetId: config.spreadsheetId,
      };
      return Response.json({ status: "ready", data, checkedAt }, { headers });
    } catch {
      // Never expose upstream errors, tokens, keys or original donor rows.
      return Response.json({ status: "error" }, { status: 503, headers });
    }
  })();
  try {
    return (await pending).clone();
  } finally {
    pending = null;
  }
}
