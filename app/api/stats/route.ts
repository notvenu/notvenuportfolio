import { NextResponse } from "next/server";
import { getStats } from "@/lib/stats";

export const revalidate = 3600;

/** Public endpoint. Same data the facts strip renders, curl-able. */
export async function GET() {
  const stats = await getStats();
  return NextResponse.json(stats, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
  });
}
