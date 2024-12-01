import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";
import { db } from "@/lib/db";
import { getCourses } from "@/actions/get-courses";

export default async function fetchCategoriesAndCourses(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = session.user.id;

    const searchParams = req.query;

    const categories = await db.category.findMany({
      orderBy: { name: "asc" },
    });

    const courses = await getCourses({ userId, ...searchParams });

    return res.status(200).json({ categories, courses });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
