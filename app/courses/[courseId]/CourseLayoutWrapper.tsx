// // CourseLayoutWrapper.tsx
// import { redirect } from "next/navigation";
// import { useSelector } from "react-redux";
// import { RootState } from "@/app/store/store";
// import { Spin } from "antd";
// import CourseLayout from "./layout";
// // import { CourseLayout } from "./layout";
// // import CourseLayout from "./layout";
// // import { CourseLayout } from "./CourseLayout";

// const CourseLayoutWrapper = ({
//   children,
//   params,
// }: {
//   children: React.ReactNode;
//   params: { courseId: string };
// }) => {
//   const loggedInUserData = useSelector((state: RootState) => state.user.user);
//   const loading = useSelector((state: RootState) => state.user.loading);

//   if (loading) {
//     return (
//       <div className="flex h-screen justify-center items-center bg-chatareacolor">
//         <Spin className="sidebar-spinner" size="large" />
//       </div>
//     );
//   }

//   if (!loggedInUserData?.id) {
//     return redirect("/");
//   }

//   // Pass the loggedInUserData to the server-side layout
//   return (
//     <CourseLayout loggedInUserData={loggedInUserData} params={params}>
//       {children}
//     </CourseLayout>
//   );
// };

// export default CourseLayoutWrapper;
