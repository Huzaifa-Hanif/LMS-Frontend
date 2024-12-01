import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";
import { db } from "@/lib/db";
import { getCourses } from "@/actions/get-courses";

export async function GET(req: Request) {
  try {
    // Get session
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    // Parse search params from the request URL
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");
    const title = searchParams.get("title");

    // Fetch categories and courses
    const categories = await db.category.findMany({
      orderBy: { name: "asc" },
    });

    const courses = await getCourses({ userId, ...searchParams });

    return NextResponse.json({ categories, courses });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
