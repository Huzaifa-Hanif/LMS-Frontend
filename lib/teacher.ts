"use client";
import { useEffect, useState } from "react";
export const UseIsTeacher = () => {
  // const [isTeacherUser, setIsTeacherUser] = useState(false);
  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   const parsedUser = user ? JSON.parse(user) : null;
  //   setIsTeacherUser(parsedUser?.role === "TEACHER");
  // }, []); // Only runs once on mount
  return true;
};
// import { useEffect, useState } from 'react';

// export const useUserData = () => {
//   const [userData, setUserData] = useState<any>(null);

//   useEffect(() => {
//     try {
//       const user = localStorage.getItem("user");
//       console.log(user, "udddd");
//       if (user) {
//         const parsedUser = JSON.parse(user);
//         setUserData(parsedUser);
//         console.log("Parsed user data:", parsedUser);
//       } else {
//         console.log("No user data found in localStorage.");
//       }
//     } catch (error) {
//       console.error("Error parsing user data from localStorage:", error);
//     }
//   }, []); // Empty dependency array to run only once on mount

//   return userData;
// };

// import { RootState } from "@/app/store/store";
// import { useSelector } from "react-redux";

// export const isTeacher = () => {
//   const loggedInUserData = useSelector((state: RootState) => state.user.user);
//   console.log(loggedInUserData, "lidd");
//   // if (!loggedInUserData) {
//   //   return null; // Show a preloader or loading indicator based on this
//   // }

//   return loggedInUserData?.userType === "TEACHER"; // Returns true if userType is TEACHER, otherwise false
// };
