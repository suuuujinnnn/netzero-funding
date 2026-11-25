import { timingSafeEqual } from "node:crypto";
import { get, put } from "@vercel/blob";
import { validateFunding, type FundingData } from "../ui/funding-data.ts";

const pathname = "funding/current.json";
const maxBodySize = 512 * 1024;
const headers = {
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};

export async function fundingResponse(env = process.env, read = get) {
  const token = env.BLOB_READ_WRITE_TOKEN;
  if (!token) return Response.json({ status: "unconfigured" }, { headers });

  try {
    const result = await read(pathname, {
      access: "private",
      token,
      useCache: false,
      abortSignal: AbortSignal.timeout(5000),
    });
    if (!result?.stream) throw new Error("집계 파일 없음");
    const snapshot = await new Response(result.stream).json();
    if (
      typeof snapshot?.checkedAt !== "string" ||
      !Number.isFinite(Date.parse(snapshot.checkedAt))
    )
      throw new Error("집계 확인 시각 오류");
    return Response.json(
      {
        status: "ready",
        data: validateFunding(snapshot.data),
        checkedAt: snapshot.checkedAt,
      },
      { headers },
    );
  } catch {
    return Response.json({ status: "error" }, { status: 503, headers });
  }
}

export async function publishFunding(
  request: Request,
  env = process.env,
  write = put,
) {
  const token = env.BLOB_READ_WRITE_TOKEN;
  const secret = env.FUNDING_SYNC_SECRET;
  if (!token || !secret)
    return Response.json({ status: "unconfigured" }, { status: 503, headers });

  const actual = Buffer.from(request.headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${secret}`);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected))
    return Response.json({ status: "error" }, { status: 401, headers });

  let data: FundingData;
  try {
    const body = await request.text();
    if (Buffer.byteLength(body) > maxBodySize)
      return Response.json({ status: "error" }, { status: 413, headers });
    data = validateFunding(JSON.parse(body));
    if (data.names.length > 1000) throw new Error("공개 명단 크기 오류");
  } catch {
    return Response.json({ status: "error" }, { status: 400, headers });
  }

  try {
    const checkedAt = new Date().toISOString();
    await write(pathname, JSON.stringify({ data, checkedAt }), {
      access: "private",
      token,
      allowOverwrite: true,
      contentType: "application/json",
      abortSignal: AbortSignal.timeout(10000),
    });
    return new Response(null, { status: 204, headers });
  } catch {
    return Response.json({ status: "error" }, { status: 503, headers });
  }
}
