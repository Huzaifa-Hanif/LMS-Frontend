"use client";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import "../../css/style.css";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { AuthContext } from "@/context/AutxContext";
import FetchUserData from "@/components/FetchUserData";
// import { FetchUserData } from "../layout";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <Provider store={store}>
    //   <FetchUserData />

      // <AuthContext>
        <div className="h-full">
          <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
            <Navbar />
          </div>
          <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
            <Sidebar />
          </div>
          <main className="md:pl-56 pt-[80px] h-full">{children}</main>
        </div>
    //   </AuthContext>
    // </Provider>
  );
};

export default DashboardLayout;
