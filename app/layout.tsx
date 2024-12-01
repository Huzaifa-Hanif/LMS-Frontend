"use client";
import { Suspense, useEffect } from "react";
import { Inter } from "next/font/google";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "./store/store";
import { getSession } from "next-auth/react";
import { setLoading, setLoggedInUserData } from "./store/userSlice";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { AuthContext } from "@/context/AutxContext";
import axios from "axios";
import FetchUserData from "@/components/FetchUserData";
import "bootstrap/dist/css/bootstrap.min.css";

import "@fortawesome/fontawesome-free/css/all.min.css";

import "../css/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./lib/animate/animate.min.css";
import "./lib/owlcarousel/assets/owl.carousel.min.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <link href="css/style.css" rel="stylesheet"> */}

        <Provider store={store}>
          <Suspense fallback={"<div>Loading</div>"}>
            <FetchUserData />
            <ConfettiProvider />
            <AuthContext>
              <ToastProvider />
              {/* <Navbar /> */}
              {children}
            </AuthContext>
          </Suspense>
        </Provider>
      </body>
    </html>
  );
}
