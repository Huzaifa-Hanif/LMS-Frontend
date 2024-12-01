"use client";
import React, { use } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Axios from "@/app/utils/axiosInstance";
import { URL } from "@/app/constants/apiEndpoints";

type Course = {
  id: string;
  title: string;
  chapters: { id: string; position: number }[];
  // Add other course properties as needed
};

// const CourseIdPage = ({ params }: { params: { courseId: string } }) => {

type Params = Promise<{ courseId: string }>;

const CourseIdPage = (props: { params: Params }) => {
  // const { courseId } =React.use(params);
  let params = use(props.params);
  const courseId = params.courseId;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const isNest = process.env.NEXT_PUBLIC_API_BACKEND === "true";

  // Fetch course details asynchronously
  const getCourseDetails = async (courseId: string) => {
    try {
      const response: any = await Axios.get<Course>(
        `${URL.COURSE_UNIQUE + courseId}`
      );

      setCourse(isNest ? response.data.data : response.data);
    } catch (error) {
      setError("Error fetching course details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Get the course details when the component mounts
    getCourseDetails(courseId);
    // console.log(course?.chapters, "93jj9j9j");
  }, [courseId]);

  // Handle loading, error, or course not found
  if (loading) {
    return null;
  }

  if (error) {
    return;
  }

  if (!course) {
    return <div>Loadding.....</div>;
  }

  // Redirect to the first chapter
  router.push(`/courses/${course.id}/chapters/${course.chapters[0]?.id}`);

  return null; // Since you're doing a redirect, there's no need to render anything else
};

export default CourseIdPage;

// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/utils/authOptions";
// import { getProgress } from "@/actions/get-progress";

// export async function GET(
//   req: Request,
//   { params }: { params: Promise<{ courseId: string }> }
// ) {
//   // Await the resolution of params
//   const resolvedParams = await params;
//   const courseId = resolvedParams.courseId;

//   const session = await getServerSession(authOptions);
//   if (!session || !session.user) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const userId = session.user.id;
//   const course = await db.course.findUnique({
//     where: { id: courseId },
//     include: {
//       chapters: {
//         where: { isPublished: true },
//         include: { userProgress: { where: { userId } } },
//         orderBy: { position: "asc" },
//       },
//     },
//   });
//   if (!course) {
//     return NextResponse.json({ error: "Course not found" }, { status: 404 });
//   }

//   const progressCount = await getProgress(userId, course.id);

//   return NextResponse.json({ course, progressCount });
// }

// import { db } from "@/lib/db";
// import { redirect } from "next/navigation";

// type Params = Promise<{ courseId: string }>;

// const CourseIdPage = async ({ params }: { params: Params }) => {
//   const resolvedParams = await params;
//   const courseId = resolvedParams.courseId;

//   // const courseDetails = await getCourseDetails(courseId);

//   console.log(resolvedParams, "resolvedParamsresolvedParams");
//   const course = await db.course.findUnique({
//     where: {
//       id: courseId,
//     },
//     include: {
//       chapters: {
//         where: {
//           isPublished: true,
//         },
//         orderBy: {
//           position: "asc",
//         },
//       },
//     },
//   });
//   // console.log(course, "coor9393939");
//   if (!course) {
//     return redirect("/");
//   }

//   return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
// };

// export default CourseIdPage;
