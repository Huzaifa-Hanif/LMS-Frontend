"use client"; // Ensure this is a Client Component

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Spin } from "antd";
// import Preloader from '@/components/Preloader'; // Your preloader component

const TeacherLayout = ({ children }: { children: React.ReactNode }) => {
  // Access logged-in user data from the Redux store
  const loggedInUserData = useSelector((state: RootState) => state.user.user);
  // Handle loading state
  if (!loggedInUserData) {
    return (
      <div className="flex h-screen justify-center items-center bg-chatareacolor">
        <Spin className="sidebar-spinner" size="large" />
      </div>
    ); // Show a loading state if user data is not available
  }

  // Check if the user is a TEACHER
  const isTeacher = loggedInUserData.type === "TEACHER";

  return (
    <div>
      {isTeacher ? (
        <div>{children}</div> // Render children if user is a teacher
      ) : (
        <div>You are not authorized to access this page.</div>
      )}
    </div>
  );
};

export default TeacherLayout;
