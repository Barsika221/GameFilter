import { getGenres } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("API: /api/genres called");
  
  try {
    const genres = await getGenres();
    console.log("API: Successfully fetched genres:", genres);
    return NextResponse.json(genres);
  } catch (error) {
    console.error("API: Error fetching genres:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch genres", 
        details: error instanceof Error ? error.message : "Unknown error" 
      }, 
      { status: 500 }
    );
  }
}