"use client";
import { redirect } from "next/navigation";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { getUserDataFromLocalStorage } from "@/lib/auth";
import useCourses from "./useCourses";

const CoursesPage = () => {
  const loggedInUserData = getUserDataFromLocalStorage();
  console.log(loggedInUserData, "course");
  // const loggedInUserData = useSelector((state: RootState) => state.user.user);
  // const [isLoadingUser, setIsLoadingUser] = useState(true);

  // useEffect(() => {
  //   if (loggedInUserData) {
  //     setIsLoadingUser(false);
  //   }
  // }, [loggedInUserData]);

  const userId = loggedInUserData?.id;
  const { courses, loading, error } = useCourses();

  if (!userId) {
    redirect("/");
    return null; // Ensure to return null after redirecting
  }
  // Handle loading states
  //  if (isLoadingUser) return <div>Loading user data...</div>;
  // if (loading) return <div>Loading courses...</div>;
  if (error) return <div>Error loading courses: {error}</div>;

  // Redirect if no user ID is found

  // Handle errors if necessary
  // if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
