// import { db } fro../../../../../lib/db/db";

// import { db } from "@/lib/db"
import { URL } from "@/app/constants/apiEndpoints";
import Axios from "@/app/utils/axiosInstance";
import axios from "axios";
export const fetchCourseDetails = async (courseId: string, userId: string) => {
  try {
    const response = await Axios.get(
      `${URL.CREATE_COURSE + courseId}?userId=${userId}`
    );
    console.log(response, "ressss");

    if (response.status !== 200) {
      throw new Error("Failed to fetch course details.");
    }

    const course = await response.data;
    return course;
  } catch (error) {
    console.error("Error fetching course details:", error);
    throw error;
  }
};

// export const fetchCourseDetails = async (courseId: string, userId: string) => {
//   try {
//     console.log(courseId, "user");
//     const course = await db.course.findUnique({
//       where: { id: courseId, userId: userId },
//       include: {
//         chapters: { orderBy: { position: "asc" } },
//         attachments: { orderBy: { createdAt: "desc" } },
//       },
//     });

//     if (!course) {
//       throw new Error("Course not found or unauthorized access.");
//     }

//     return course;
//   } catch (error) {
//     console.error("Error fetching course details:", error);
//     throw new Error("Failed to fetch course details.");
//   }
// };

export const fetchCategories = async () => {
  try {
    const response = await axios.get("/api/categories");

    if (response.status !== 200) {
      throw new Error("Failed to fetch categories.");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
