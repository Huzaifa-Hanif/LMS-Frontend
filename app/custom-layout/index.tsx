"use client";

import React, { useEffect, useState } from "react";
import { message, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
// import { setLoggedInUserData } from "../store/userSlice";
import { usePathname } from "next/navigation";
import { FetchUserData } from "../lib/fetchUserData";
import { setLoggedInUserData } from "../store/userSlice";
import { useSession } from "next-auth/react";
// import { useIsLogedIn } from '../admin/hooks/useIsLogedIn';

function CustomLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const dispatch: AppDispatch = useDispatch();
  const loggedInUserData = useSelector((state: RootState) => state.user.user);
  const userLoging = useSelector((state: RootState) => state.user.loading);
  const [loading, setLoading] = useState(false);
  // Function to get the logged-in user data
  const getLoggedInUser = async () => {
    try {
      setLoading(true);
      if (loggedInUserData) {
        dispatch(setLoggedInUserData(loggedInUserData));
      } else {
        message.error("Something dfdfd went wrong! Please try again later.");
      }
    } catch (error) {
      console.log(session, "sessionsessionsessionsession");
      message.error("Something went wrong! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch logged-in user data when the component mounts
  useEffect(() => {
    if (
      !userLoging &&
      !pathname.includes("/sign-in") &&
      !pathname.includes("/sign-up")
    ) {
      getLoggedInUser();
    }
  }, [pathname, userLoging]);
  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center bg-chatareacolor">
        <Spin className="sidebar-spinner" size="large" />
      </div>
    );
  }
  // if (
  //   !session?.user &&
  //   !pathname.includes("/sign-in") &&
  //   !pathname.includes("/sign-up")
  // ) {
  //   return null; // Optionally handle the case where no user data is available
  // }

  return <>{children}</>;
}

export default CustomLayout;
