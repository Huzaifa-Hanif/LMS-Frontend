// import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

import { UseIsTeacher } from "@/lib/teacher";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";
import { NextResponse } from "next/server";
import { getUserDataFromLocalStorage, isUserType } from "@/lib/auth";

const f = createUploadthing();

const handleAuth = async () => {
  // const { userId } = auth();

  // const session = await getServerSession(authOptions);
  const session = getUserDataFromLocalStorage();
  console.log(session, "99");
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const userId = session.id;
  const IsTeacher = session?.type === "TEACHER";

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  // return userId

  // const isAuthorized = isUserType();

  if (!userId || !IsTeacher) throw new Error("Unauthorized");
  return userId;
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    // .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:");
      console.log("file url", file.url);
      return {}; // Return an empty object to prevent the JSON parse error
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
