"use client";
import "../../../css/style.css";

import { redirect } from "next/navigation";
import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";
import axios from "axios";
import { use, useEffect, useState } from "react";
import Axios from "@/app/utils/axiosInstance";
import { URL } from "@/app/constants/apiEndpoints";

// type Params = { courseId: string };
//

// type Params = Promise<{ courseId: string }>;

// const CourseIdPage = (props: { params: Params }) => {
//   // const { courseId } =React.use(params);
//   let params = use(props.params);
//   const courseId = params.courseId;

type Params = Promise<{ courseId: string }>;

// Updated CourseLayout component
const CourseLayout = ({
  params,
  children,
}: {
  params: Params;
  children: React.ReactNode;
}) => {
  // Using `use` to resolve the Promise and extract the courseId
  let paramsResolved = use(params);
  const courseId = paramsResolved.courseId;

  const [course, setCourse] = useState(null);
  const [progressCount, setProgressCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // type Params = Promise<{ courseId: string }>;

  // const CourseIdPage = (props: { params: Params }) => {
  // const { courseId } =React.use(params);
  // let params1 = use(params.courseId);
  // const courseId = params.courseId;
  // let params = use(props.params);
  // // const courseId = params.courseId;

  // const courseId = params.courseId;

  useEffect(() => {
    const getCourses = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
        const response = await Axios.get(
          `${URL.COURSE_WITH_PROGRESS + courseId}`
        );

        if (response.status === 401) {
          return redirect("/");
        }

        const { course, progressCount } = response.data;
        setCourse(course);
        setProgressCount(progressCount);
        setLoading(false); // Set loading to false once data is fetched

        if (!course) {
          return redirect("/");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
        // Handle error (e.g., show a message to the user)
      }
    };

    getCourses();
  }, [courseId]);

  if (loading) {
    // Render a loading state or spinner
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <main className="md:pl-80 pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default CourseLayout;
