import { GET_platforms } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await GET_platforms();
  if ('error' in result) {
    return NextResponse.json(result, { status: 500 });
  }
  return NextResponse.json(result.platforms);
}