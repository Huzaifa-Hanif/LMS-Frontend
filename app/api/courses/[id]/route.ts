import { authOptions } from "@/app/utils/authOptions";
import { isUserType } from "@/lib/auth";
import { db } from "@/lib/db";
import { UseIsTeacher } from "@/lib/teacher";
import { getServerSession } from "next-auth/next";
// import { getServerSession } from "next-auth/next";
// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Named export for the GET request
// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // console.log(req, "399999999999");
  // Await the resolution of params
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const url = new URL(req.url);
  const session = await getServerSession(authOptions);
  // console.log(session, "df343434`");
  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const userId = session.user.id;
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const course = await db.course.findUnique({
      where: { id: id, userId },
      include: {
        chapters: { orderBy: { position: "asc" } },
        attachments: { orderBy: { createdAt: "desc" } },
      },
    });

    if (!course) {
      return new NextResponse("Course not found or unauthorized access.", {
        status: 404,
      });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error fetching course details:", error);
    return new NextResponse("Failed to fetch course details.", {
      status: 500,
    });
  }
}

// export async function PATCH(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Await the resolution of params
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // const url = new URL(req.url);
  // const userId = url.searchParams.get("userId");

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const userId = session.user.id;
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { title, description, ...otherFields } = await req.json();

    // Verify that the course exists and belongs to the user
    const course = await db.course.findUnique({
      where: { id: id, userId },
    });

    if (!course) {
      return new NextResponse("Course not found or unauthorized access.", {
        status: 404,
      });
    }

    // Update the course
    const updatedCourse = await db.course.update({
      where: { id: id },
      data: {
        title,
        description,
        ...otherFields,
      },
    });

    return NextResponse.json(updatedCourse);
  } catch (error) {
    console.error("Error updating course details:", error);
    return new NextResponse("Failed to update course details.", {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const { title } = await req.json();
    const session = await getServerSession(authOptions);
    const IsTeacher = session?.user.type === "TEACHER";

    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userId = session.user.id;

    if (!userId || !IsTeacher) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
