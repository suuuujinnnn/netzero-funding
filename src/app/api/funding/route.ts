import "server-only";
import { fundingResponse } from "@/views/project/api/private-funding";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET() {
  return fundingResponse();
}
