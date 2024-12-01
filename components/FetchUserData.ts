"use client";

import {
  setHasPassword,
  setLoading,
  setLoggedInUserData,
} from "@/app/store/userSlice";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { DecodeToken } from "@/app/utils/decodeToken";

export default function FetchUserData() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserData = async () => {
      dispatch(setLoading(true));
      const accessToken =
        Cookies.get("accessToken") || localStorage.getItem("accessToken");

      if (accessToken) {
        try {
          const decodedUser = await DecodeToken(accessToken);
          decodedUser.hasPassword = false;
          const response = await fetch(`/api/auth/user/${decodedUser.id}`);

          const data = await response.json();
          console.log(data, "datata");
          dispatch(setHasPassword(data.hasPassword));
          dispatch(setLoggedInUserData(decodedUser));
          decodedUser.hasPassword = data.hasPassword;

          dispatch(setLoggedInUserData(decodedUser));
          localStorage.setItem("user", JSON.stringify(decodedUser));
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      } else {
        // If no access token, fall back to session
        const session = await getSession();
        if (session?.user) {
          const response = await fetch(`/api/auth/user/${session.user.id}`);

          const data = await response.json();
          console.log(data, "datata");
          dispatch(setHasPassword(data.hasPassword));
          const updatedSession = {
            ...session,
            user: {
              ...session.user,
              hasPassword: data.hasPassword, // Modify or add fields
            },
          };
          dispatch(setLoggedInUserData(updatedSession.user));
          localStorage.setItem("user", JSON.stringify(updatedSession.user)); // Or update cookies/session if needed

          // dispatch(setLoggedInUserData(session.user)); // Set the session user data in the store
          // localStorage.setItem("user", JSON.stringify(session.user)); // Store user data
        }
      }

      dispatch(setLoading(false));
    };

    fetchUserData();
  }, [dispatch]);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     dispatch(setLoading(true));
  //     const session = await getSession();
  //     if (session?.user) {
  //       dispatch(setLoggedInUserData(session.user));
  //       localStorage.setItem("user", JSON.stringify(session.user)); // Storing the entire user object
  //     }
  //     dispatch(setLoading(false));
  //   };

  //   fetchUserData();
  // }, [dispatch]);
  useEffect(() => {
    axios
      .get("/api/initTeacherUser")
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Failed to initialize teacher user:", error);
      });
  }, []);
  return null;
}
