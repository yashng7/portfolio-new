import { NextResponse } from "next/server";
import { getGithubActivity } from "@/lib/github";

export const revalidate = 3600; // 1 hour

export async function GET() {
  try {
    const data = await getGithubActivity();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch GitHub activity" },
      { status: 500 }
    );
  }
}
