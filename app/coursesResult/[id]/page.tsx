"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CoursePage() {
  const router = useRouter();
  //   const route = router.prefetch;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <h1>Course Details for </h1>

      {<p style={{ color: "green" }}>Payment Successful! 🎉</p>}
      {<p style={{ color: "red" }}>Payment Canceled! 😞</p>}
    </div>
  );
}
