import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// GET method to fetch all categories
export async function GET() {
  try {
    const categories = await db.category.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new NextResponse("Failed to fetch categories.", { status: 500 });
  }
}
