"use client"; // This makes it a Client Component

import { useEffect, useState } from "react";
// import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getAnalytics } from "@/actions/get-analytics";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

// Define the type for analytics data
interface AnalyticsData {
  data: {
    name: string;
    total: number;
  }[];
  totalRevenue: number;
  totalSales: number;
}

const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const loggedInUserData = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!loggedInUserData) {
        setLoading(false);
        return; // Handle the case where user data is not available
      }

      const userId = loggedInUserData.id;

      if (!userId) {
        redirect("/");
        return; // Ensure redirection happens and exit
      }

      const data = await getAnalytics(userId);
      setAnalyticsData(data);
      setLoading(false);
    };

    fetchAnalytics();
  }, [loggedInUserData]);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (!analyticsData) {
    return <div>No data available.</div>; // Handle case when no data is fetched
  }

  const { data, totalRevenue, totalSales } = analyticsData;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard label="Total Revenue" value={totalRevenue} shouldFormat />
        <DataCard label="Total Sales" value={totalSales} />
      </div>
      <Chart data={data} />
    </div>
  );
};

export default AnalyticsPage;
