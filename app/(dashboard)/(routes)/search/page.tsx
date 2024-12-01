"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // To handle redirect
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { SearchInput } from "@/components/search-input";
import { CoursesList } from "@/components/courses-list";
import { Categories } from "./_components/categories";
// import { fetchCategoriesAndCourses } from "./fetchCategoriesAndCourses";
import { Spin } from "antd";
import axios from "axios";
import { URL } from "@/app/constants/apiEndpoints";
import Axios from "@/app/utils/axiosInstance";
// import { fetchCategoriesAndCourses } from "@/lib/server-functions"; // Server-side function

// interface SearchPageProps {
//   searchParams: {
//     title: string;
//     categoryId: string;
//   };
// }

// const SearchPage = ({ searchParams }: SearchPageProps) => {
interface SearchPageProps {
  searchParams: Promise<{
    title: string;
    categoryId: string;
  }>;
}

type Params = Promise<{ searchParams: string }>;

const SearchPage = (props: { params: Params }) => {
  // const { courseId } =React.use(params);
  let params = use(props.params);
  const searchParams = params.searchParams;

  // const SearchPage = ({ searchParams }: SearchPageProps) => {
  const router = useRouter();
  const loggedInUserData = useSelector((state: RootState) => state.user.user);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loggedInUserData) return;
    if (!loggedInUserData.id) {
      router.push("/");
      return;
    }

    const fetchData = async () => {
      try {
        // const data = await fetchCategoriesAndCourses(
        //   loggedInUserData.id,
        //   searchParams
        // );
        const response = await Axios.get(URL.CATEGORIES_AND_COURSES, {
          params: searchParams,
        });
        const data = response.data;

        setCategories(data.categories);
        setCourses(data.courses);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [loggedInUserData, searchParams, router]);

  if (!loggedInUserData || loading) {
    return (
      <div className="flex h-screen justify-center items-center bg-chatareacolor">
        <Spin className="sidebar-spinner" size="large" />
      </div>
    );
  }

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
