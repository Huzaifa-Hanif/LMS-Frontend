// import Mux from "@mux/mux-node";
// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
// import mux from "@/lib/mux"; // Import the Mux configuration
// import mux from "@/lib/mux"
import { db } from "@/lib/db";
import Mux from "@mux/mux-node";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";

const { MUX_TOKEN_ID, MUX_TOKEN_SECRET } = process.env;
const mux = new Mux({
  tokenId: MUX_TOKEN_ID,
  tokenSecret: MUX_TOKEN_SECRET,
  // : MUX_TOKEN_ID,
  // secret: MUX_TOKEN_SECRET,
});

const video = mux.video; // Assign Video for easier reference

// module.exports = mux;

// const { Video } = new Mux(
//   process.env.MUX_TOKEN_ID!,
//   process.env.MUX_TOKEN_SECRET!
// );

// export async function DELETE(
//   req: Request,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {

// export async function GET(
//   req: Request,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {
//   const { courseId, chapterId } = params;
//   console.log(courseId, "couuu");
//   // Authorize the user
//   // const session = await getServerSession(authOptions);
//   // if (!session || !session.user) {
//   //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   // }
//   // const userId = session.user.id;

//   // Find the course for the user
//   // const ownCourse = await db.course.findUnique({
//   //   where: {
//   //     id: courseId,
//   //     userId,
//   //   },
//   // });
//   // if (!ownCourse) {
//   //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   // }

//   // Fetch the chapter with its Mux data
//   const chapter = await db.chapter.findUnique({
//     where: {
//       id: chapterId,
//       courseId: courseId,
//     },
//     include: {
//       muxData: true,
//     },
//   });

//   // Return chapter details if found, otherwise a 404 response
//   if (!chapter) {
//     return NextResponse.json({ error: "Not Found" }, { status: 404 });
//   }

//   return NextResponse.json(chapter);
// }

// export async function GET(
//   req: Request,
//   { params }: { params: { courseId: string; chapterId: string } }
// ) {

export async function GET(
  req: Request,
  { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  // const { courseId, chapterId } = params;
  const resolvedParams = await params;
  const { courseId, chapterId } = resolvedParams;

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch the chapter with Mux data included
  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      courseId: courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
  }

  // Calculate completion details
  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const isComplete = requiredFields.every(Boolean);
  const completionText = `(${completedFields}/${totalFields})`;

  // Return the chapter data and completion details
  return NextResponse.json({
    chapter,
    completionText,
    isComplete,
  });
}

// export async function GET(
//   req: Request,
//   res,
//   // params
//   context: any
// ) {
//   console.log(context, "reqqq");
//   // console.log(params, "passsdfdf");
//   // const { courseId, chapterId } = params; // Destructure directly from params

//   // Await the params to extract `courseId` and `chapterId`
//   // const resolvedParams = await params;
//   // const { courseId, chapterId } = resolvedParams;

//   // try {
//   //   const session = await getServerSession(authOptions);

//   //   if (!session || !session.user) {
//   //     return new NextResponse("Unauthorized", { status: 401 });
//   //   }

//   //   const userId = session.user.id;

//   //   if (!userId) {
//   //     return new NextResponse("Unauthorized", { status: 401 });
//   //   }

//   //   const chapter = await db.chapter.findUnique({
//   //     where: {
//   //       id: chapterId,
//   //       courseId: courseId,
//   //     },
//   //     include: {
//   //       muxData: true,
//   //     },
//   //   });

//   //   if (!chapter) {
//   //     return new NextResponse("Not Found", { status: 404 });
//   //   }
//   //   const requiredFields = [
//   //     chapter.title,
//   //     chapter.description,
//   //     chapter.videoUrl,
//   //   ];
//   //   const totalFields = requiredFields.length;
//   //   const completedFields = requiredFields.filter(Boolean).length;
//   //   const completionText = `(${completedFields}/${totalFields})`;
//   //   const isComplete = requiredFields.every(Boolean);

//   //   // return NextResponse.json(chapter);
//   //   return res.status(200).json({
//   //     chapter,
//   //     completionData: {
//   //       totalFields,
//   //       completedFields,
//   //       completionText,
//   //       isComplete,
//   //     },
//   //   });
//   // } catch (error) {
//   //   console.error("Error fetching chapter:", error);
//   //   return new NextResponse("Internal Server Error", { status: 500 });
//   // }
// }

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  // Await the resolution of params
  const resolvedParams = await params;
  const { courseId, chapterId } = resolvedParams;

  try {
    // const { userId } = auth();
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // const { userId } = auth();
    const userId = session.user.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId: courseId,
      },
    });

    if (!chapter) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (chapter.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: chapterId,
        },
      });

      if (existingMuxData) {
        // await Video.Assets.del(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }
    }

    const deletedChapter = await db.chapter.delete({
      where: {
        id: chapterId,
      },
    });

    const publishedChaptersInCourse = await db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
    });

    if (!publishedChaptersInCourse.length) {
      await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(deletedChapter);
  } catch (error) {
    console.log("[CHAPTER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// export async function PATCH(
//   req: Request,
//   { params }: { params: { id: string; chapterId: string } }
// ) {
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string; chapterId: string }> }
) {
  // Await the resolution of params
  const resolvedParams = await params;
  const { id, chapterId } = resolvedParams;

  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // const { userId } = auth();
    const userId = session.user.id;

    // const { userId } = auth();
    const { isPublished, ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: id,
        userId,
      },
    });
    console.log(ownCourse, "owncourssee");

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId: id,
      },
      data: {
        ...values,
      },
    });

    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: chapterId,
        },
      });

      if (existingMuxData) {
        // await Video.Assets.del(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }
      // const asset  = await mux..create({
      //   input: values.videoUrl, // Use the file stream for upload
      //   playback_policy: "public", // Set playback policy
      //   test: false,

      // });

      const asset = await video.assets.create({
        input: values.videoUrl,
        playback_policy: ["public"],
        // playback_policy: "public",
        test: false,
      });

      await db.muxData.create({
        data: {
          chapterId: chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
