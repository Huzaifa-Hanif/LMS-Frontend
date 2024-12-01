"use client";

import ChatArea from "@/_components/ChatArea";
import Sidebar from "@/_components/Sidebar";

const Page = () => {
  return (
    <div className="h-screen flex">
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      <ChatArea />
    </div>
  );
};

export default Page;
