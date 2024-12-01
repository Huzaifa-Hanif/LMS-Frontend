// "use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import { ClerkProvider } from "@clerk/nextjs";
// import CustomLayout from "@/custom-layout";

// import "../../css/bootstrap.min.css";
import "./chat.css";
import { store } from "../store/store";
import { Provider } from "react-redux";
import CustomLayout from "../custom-layout";
// import CustomLayout from "@/custom-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Gemini ChatApp",
  description:
    "This is a fullstack chatapp created with the help of NextJS and Google Gemini API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ClerkProvider>
    // <Provider store={store}>
    <html lang="en">
      <body className={inter.className}>
        <CustomLayout>{children}</CustomLayout>
      </body>
    </html>
    // </Provider>
    // </ClerkProvider>
  );
}
