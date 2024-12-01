import { useSession } from "next-auth/react";

export const FetchUserData = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return { user: null, loading: true };
  }

  return {
    user: session?.user || null,
    loading: false,
  };
};
