import { getPlatforms } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("API: /api/platforms called");
  
  try {
    const platforms = await getPlatforms();
    console.log("API: Successfully fetched platforms:", platforms);
    return NextResponse.json(platforms);
  } catch (error) {
    console.error("API: Error fetching platforms:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch platforms", 
        details: error instanceof Error ? error.message : "Unknown error" 
      }, 
      { status: 500 }
    );
  }
}