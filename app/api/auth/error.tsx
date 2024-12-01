// pages/api/auth/error.tsx
import { NextPage } from "next";
import { useRouter } from "next/router";

const ErrorPage: NextPage = () => {
  const router = useRouter();
  const { error } = router.query;

  return (
    <div>
      <h1>Error</h1>
      <p>
        {error ? `An error occurred: ${error}` : "An unknown error occurred"}
      </p>
    </div>
  );
};

export default ErrorPage;
