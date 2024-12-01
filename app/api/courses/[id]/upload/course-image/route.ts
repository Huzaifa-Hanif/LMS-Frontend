import { authOptions } from "@/app/utils/authOptions";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { createUploadFolder, saveFile } from "@/lib/storage";
import { isUserType } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !isUserType()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const userId = session.user.id;
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return new NextResponse("No file uploaded", { status: 400 });
  }

  try {
    const uploadPath = `api/uploads/courses/${userId}/images/`;
    await createUploadFolder(uploadPath);
    const filePath = await saveFile(file, uploadPath);
    return NextResponse.json({ url: `/uploads/courses/${userId}/images/${filePath}` });
  } catch (error) {
    console.error("Error uploading course image:", error);
    return new NextResponse("File upload failed", { status: 500 });
  }
}
