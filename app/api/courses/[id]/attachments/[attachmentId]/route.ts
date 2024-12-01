// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";

// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string; attachmentId: string } }
// ) {
  export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string; attachmentId: string }> }
  ) {
    // Await the resolution of params
    const resolvedParams = await params;
    const { id, attachmentId } = resolvedParams;
  
  
  try {
    // const { userId } = auth();
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.attachment.delete({
      where: {
        courseId: id,
        id: attachmentId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("ATTACHMENT_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
