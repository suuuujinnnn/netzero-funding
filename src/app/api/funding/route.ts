import "server-only";
import {
  fundingResponse,
  publishFunding,
} from "@/views/project/api/private-funding";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return fundingResponse();
}

export async function POST(request: Request) {
  return publishFunding(request);
}
