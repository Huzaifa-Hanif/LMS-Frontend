"use client";
import { CourseProgress } from "@/components/course-progress";
import axios from "axios";
import { useState, useEffect } from "react";
import { CourseSidebarItem } from "./course-sidebar-item";
import Axios from "@/app/utils/axiosInstance";
import { URL } from "@/app/constants/apiEndpoints";

interface PurchaseResponse {
  purchase: {
    id: string;
    userId: string;
    courseId: string;
    createdAt: string;
  } | null;
}

const checkPurchase = async (courseId: string) => {
  try {
    const response = await Axios.get<PurchaseResponse>(
      `${URL.PURCHASES}=${courseId}`
    );
    return response.data.purchase;
  } catch (error) {
    console.error("Error checking purchase:", error);
    return null;
  }
};

export const CourseSidebar = ({ course, progressCount }) => {
  const [purchase, setPurchase] = useState<PurchaseResponse["purchase"] | null>(
    null
  );

  useEffect(() => {
    const fetchPurchase = async () => {
      const result = await checkPurchase(course.id);
      setPurchase(result);
    };

    fetchPurchase();
  }, [course.id]);

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};

// // import { auth } from "@clerk/nextjs";
// import { Chapter, Course, UserProgress } from "@prisma/client";
// import { redirect } from "next/navigation";

// import { db } from "@/lib/db";
// import { CourseProgress } from "@/components/course-progress";

// import { CourseSidebarItem } from "./course-sidebar-item";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/utils/authOptions";
// import { NextResponse } from "next/server";

// interface CourseSidebarProps {
//   course: Course & {
//     chapters: (Chapter & {
//       userProgress: UserProgress[] | null;
//     })[];
//   };
//   progressCount: number;
// }

// export const CourseSidebar = async ({
//   course,
//   progressCount,
// }: CourseSidebarProps) => {
//   // const { userId } = auth();
//   const session = await getServerSession(authOptions);
//   if (!session || !session.user) {
//     return redirect("/");
//   }
//   const userId = session.user.id;

//   if (!userId) {
//     return redirect("/");
//   }

//   const purchase = await db.purchase.findUnique({
//     where: {
//       userId_courseId: {
//         userId,
//         courseId: course.id,
//       },
//     },
//   });

//   return (
//     <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
//       <div className="p-8 flex flex-col border-b">
//         <h1 className="font-semibold">{course.title}</h1>
//         {purchase && (
//           <div className="mt-10">
//             <CourseProgress variant="success" value={progressCount} />
//           </div>
//         )}
//       </div>
//       <div className="flex flex-col w-full">
//         {course.chapters.map((chapter) => (
//           <CourseSidebarItem
//             key={chapter.id}
//             id={chapter.id}
//             label={chapter.title}
//             isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
//             courseId={course.id}
//             isLocked={!chapter.isFree && !purchase}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };
