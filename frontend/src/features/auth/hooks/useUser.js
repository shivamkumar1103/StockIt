import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/authApi";

export const useUser = () => {
  const {
    data: user,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false, // Don't keep retrying if the user simply isn't logged in
    staleTime: Infinity, // The auth status doesn't change unless they login/logout
  });

  return { user, isPending, isError };
};
