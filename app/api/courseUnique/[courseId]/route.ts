import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";

// export async function GET(
//   req: Request,
//   { params }: { params: { courseId: string } }
// ) {

export async function GET(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  // Await the resolution of params
  const resolvedParams = await params;
  const { courseId } = resolvedParams;

  //   const { courseId } = params;

  // Fetch the user session
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // Fetch the course details from the database
    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        chapters: {
          where: {
            isPublished: true,
          },
          orderBy: {
            position: "asc",
          },
        },
      },
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error fetching course details:", error);
    return new NextResponse("Failed to fetch course details", {
      status: 500,
    });
  }
}
