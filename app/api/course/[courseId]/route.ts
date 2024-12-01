import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";
import { getProgress } from "@/actions/get-progress";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  // Await the resolution of params
  const resolvedParams = await params;
  const courseId = resolvedParams.courseId;

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const course = await db.course.findUnique({
    where: { id: courseId },
    include: {
      chapters: {
        where: { isPublished: true },
        include: { userProgress: { where: { userId } } },
        orderBy: { position: "asc" },
      },
    },
  });
  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  const progressCount = await getProgress(userId, course.id);

  return NextResponse.json({ course, progressCount });
}
