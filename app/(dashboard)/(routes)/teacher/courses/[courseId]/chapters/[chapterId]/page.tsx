// import { auth } from "@clerk/nextjs";
"use client";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterDescriptionForm } from "./_components/chapter-description-form";
import { ChapterAccessForm } from "./_components/chapter-access-form";
import { ChapterVideoForm } from "./_components/chapter-video-form";
import { ChapterActions } from "./_components/chapter-actions";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";
import { NextResponse } from "next/server";
import { use, useEffect, useState } from "react";
import Axios from "@/app/utils/axiosInstance";
import { URL } from "@/app/constants/apiEndpoints";
// import { useRouter } from "next/router";

// const ChapterIdPage = async ({
//   params,
// }: {
//   params: { courseId: string; chapterId: string };
// }) => {
interface ChapterIdPageProps {
  params: Promise<{
    courseId: string;
    chapterId: string;
  }>;
}

type Params = Promise<{ courseId: string; chapterId: string }>;

const ChapterIdPage = (props: { params: Params }) => {
  // const { courseId } =React.use(params);
  let params = use(props.params);
  const courseId = params.courseId;
  const chapterId = params.chapterId;
  // const ChapterIdPage = ({ params }: ChapterIdPageProps) => {
  // Await the resolution of params
  // const resolvedParams = await params;
  // const { courseId, chapterId } = resolvedParams;

  // const session = await getServerSession(authOptions);
  // if (!session || !session.user) {
  //   return new NextResponse("Unauthorized", { status: 401 });
  // }

  // const { courseId, chapterId } = await params;
  const [chapterData, setChapterData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    console.log(111);
    const fetchChapter = async () => {
      try {
        // const res = await Axios.get(
        //   `/api/courses/${courseId}/chapters/${chapterId}`
        // );
        const res = await Axios.get(
          `${URL.GET_CHAPTER + courseId + URL.CHAPTERS + chapterId}`
        );

        if (res.status === 401) {
          router.push("/login");
          return;
        }
        if (res.status === 404) {
          router.push("/not-found");
          return;
        }
        const data = await res.data;
        setChapterData(data);
      } catch (error) {
        console.error("Error fetching chapter:", error);
        router.push("/error");
      }
    };

    fetchChapter();
  }, [courseId, chapterId, router]);

  if (!chapterData) return <div>Loading...</div>;

  const { chapter, completionText, isComplete } = chapterData;

  // // const { userId } = auth();
  // const userId = session.user.id;
  // if (!userId) {
  //   return redirect("/");
  // }

  // const chapter = await db.chapter.findUnique({
  //   where: {
  //     id: chapterId,
  //     courseId: courseId,
  //   },
  //   include: {
  //     muxData: true,
  //   },
  // });

  // if (!chapter) {
  //   return redirect("/");
  // }

  // const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  // const totalFields = requiredFields.length;
  // const completedFields = requiredFields.filter(Boolean).length;

  // const completionText = `(${completedFields}/${totalFields})`;

  // const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter Creation</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <ChapterActions
                disabled={!isComplete}
                courseId={courseId}
                chapterId={chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize your chapter</h2>
              </div>
              <ChapterTitleForm
                initialData={chapter}
                courseId={courseId}
                chapterId={chapterId}
              />
              <ChapterDescriptionForm
                initialData={chapter}
                courseId={courseId}
                chapterId={chapterId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">Access Settings</h2>
              </div>
              <ChapterAccessForm
                initialData={chapter}
                courseId={courseId}
                chapterId={chapterId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">Add a video</h2>
            </div>
            <ChapterVideoForm
              initialData={chapter}
              chapterId={chapterId}
              courseId={courseId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterIdPage;
