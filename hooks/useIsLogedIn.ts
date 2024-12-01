import { useDispatch } from "react-redux";
import {
  setLoggedInUserData,
  // clearLoggedInUserData,
} from "@/app/store/userSlice";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const useIsLogedIn = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "authenticated") {
      // console.log('Dispatching user data:', {
      //   id: session.user.id,
      //   name: session.user.name,
      //   fullname: session.user.name,
      //   role: session.user.role,
      // });
      dispatch(
        setLoggedInUserData({
          id: session.user.id,
          name: session.user.name,
          fullname: session.user.name,
          role: session.user.role,
        })
      );
    } else if (status === "unauthenticated") {
      // Clear user data if not authenticated
      // dispatch(set());
    }
  }, [status, session, dispatch]);

  return session;
};

export { useIsLogedIn };
