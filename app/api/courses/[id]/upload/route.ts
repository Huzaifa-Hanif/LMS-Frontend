import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";
import { createUploadFolder, saveFile } from "@/lib/storage"; // Assuming these utilities are defined
import { db } from "@/lib/db";
import path from "path";
import cloudinary from "@/app/utils/cloudinary";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Unwrap the params Promise
  const { id } = await params;

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const userId = session.user.id;
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new NextResponse("No file uploaded", { status: 400 });
    }

    // Determine file type and set the upload path
    let folder = "";
    if (file.type.startsWith("image/")) {
      folder = `courses/${id}/images`;
    } else if (file.type.startsWith("video/")) {
      folder = `courses/${id}/videos`;
    } else if (file.type.startsWith("application/")) {
      folder = `courses/${id}/docs`;
    } else {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 400 }
      );
    }

    // await createUploadFolder(uploadPath);
    const arrayBuffer = await file.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    // Save the file and get the URL
    // const filePath = await saveFile(file, uploadPath);
    // const fullFile = `\\${filePath}`; // Adds a backslash before the filePath

    // const cleanedFilePath = filePath.replace(/\\/g, '/'); // Replace all backslashes
    // const fullFile = `/${cleanedFilePath}`; // Optionally add a leading backslash
    // console.log(fullFile,"fiiillllll")
    // const updatedCourse = await db.course.update({
    //   where: { id, userId },
    //   data: {
    //     imageUrl: fullFile,
    //   },
    // });
    // Upload to Cloudinary
    const uploadResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: file.type.startsWith("video/") ? "video" : "auto",
        },
        (error, result) => {
          if (error) {
            reject(error); // Reject on error
          } else {
            resolve(result); // Resolve with the result
          }
        }
      );
      uploadStream.end(buffer); // Send the buffer to Cloudinary
    });
    console.log(uploadResult, "939j9j9j9j");
    const updatedCourse = await db.course.update({
      where: { id, userId },
      data: { imageUrl: uploadResult.secure_url },
    });

    // return NextResponse.json({
    //   url: `${fullFile}`,
    //   updatedCourse,
    // });
    return NextResponse.json({ url: uploadResult.secure_url, updatedCourse });
  } catch (error) {
    console.error("Error uploading file:", error);
    return new NextResponse("Failed to upload file", { status: 500 });
  }
}
