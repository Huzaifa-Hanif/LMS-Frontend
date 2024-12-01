"use client";
// import { auth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";
import { message, Spin } from "antd";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";

import { InfoCard } from "./_components/info-card";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store";
import { useEffect, useState } from "react";
import { setLoggedInUserData } from "@/app/store/userSlice";

export default function Dashboard() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const dispatch: AppDispatch = useDispatch();
  const loggedInUserData = useSelector((state: RootState) => state.user.user);
  const userLoging = useSelector((state: RootState) => state.user.loading);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<{
    completedCourses: any[];
    coursesInProgress: any[];
  }>({ completedCourses: [], coursesInProgress: [] });

  const getLoggedInUser = async () => {
    try {
      setLoading(true);
      if (loggedInUserData) {
        dispatch(setLoggedInUserData(loggedInUserData));
      } else {
        message.error("Something went wrong! Please try again later.");
      }
    } catch (error) {
      message.error("Something went wrong! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      if (loggedInUserData) {
        const { completedCourses, coursesInProgress } =
          await getDashboardCourses(loggedInUserData.id);
        setCourses({ completedCourses, coursesInProgress });
      }
    } catch (error) {
      message.error("Failed to load courses!");
    }
  };

  useEffect(() => {
    if (
      !userLoging &&
      !pathname.includes("/sign-in") &&
      !pathname.includes("/sign-up")
    ) {
      getLoggedInUser();
    }
  }, [pathname, userLoging]);

  useEffect(() => {
    if (!loading) {
      fetchCourses();
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center bg-chatareacolor">
        <Spin className="sidebar-spinner" size="large" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={courses.coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={courses.completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList
        items={[...courses.coursesInProgress, ...courses.completedCourses]}
      />
    </div>
  );
}
