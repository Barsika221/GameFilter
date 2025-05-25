import { GET_genres } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await GET_genres();
  if ('error' in result) {
    return NextResponse.json(result, { status: 500 });
  }
  return NextResponse.json(result.genres);
}