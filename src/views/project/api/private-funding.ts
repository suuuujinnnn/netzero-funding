import { validateFunding } from "../ui/funding-data.ts";

type Config = { url: string };
export function fundingConfig(env: NodeJS.ProcessEnv): Config | null {
  const raw = env.FUNDING_APPS_SCRIPT_URL?.trim();
  if (!raw) return null;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error("서버 설정 오류");
  }
  if (
    url.protocol !== "https:" ||
    url.hostname !== "script.google.com" ||
    url.port ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    !/^\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(url.pathname)
  )
    throw new Error("서버 설정 오류");
  return { url: url.toString() };
}
export async function queryPrivateFunding(config: Config, signal: AbortSignal) {
  const first = await fetch(config.url, {
    signal,
    cache: "no-store",
    redirect: "manual",
  });
  if (first.status !== 302) throw new Error("집계 요청 실패");
  const location = first.headers.get("location");
  if (!location) throw new Error("집계 응답 오류");
  const redirect = new URL(location);
  if (
    redirect.protocol !== "https:" ||
    redirect.hostname !== "script.googleusercontent.com" ||
    redirect.port ||
    redirect.username ||
    redirect.password
  )
    throw new Error("집계 응답 오류");
  const response = await fetch(redirect, {
    signal,
    cache: "no-store",
    redirect: "error",
  });
  if (!response.ok) throw new Error("집계 요청 실패");
  const body = await response.text();
  if (body.length > 1000000) throw new Error("응답 크기 오류");
  return validateFunding(JSON.parse(body));
}
let cache: {
  data: ReturnType<typeof validateFunding>;
  checkedAt: string;
  expires: number;
  url: string;
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
  if (cache && cache.url === config.url && Date.now() < cache.expires)
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
        url: config.url,
      };
      return Response.json({ status: "ready", data, checkedAt }, { headers });
    } catch {
      // Never expose upstream errors, original donor rows.
      return Response.json({ status: "error" }, { status: 503, headers });
    }
  })();
  try {
    return (await pending).clone();
  } finally {
    pending = null;
  }
}
