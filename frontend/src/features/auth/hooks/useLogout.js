import { useQueryClient, useMutation } from "@tanstack/react-query";
import { logout as logoutApi } from "../api/authApi";
import { toast } from "react-hot-toast";

const useLogout = () => {
  const queryClient = useQueryClient();
  const {
    mutate: logout,
    isPending,
    isError,
  } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("Logout successful!");
      // Clear the user data from the cache when logging out
      queryClient.setQueryData(["user"], null);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to logout.");
    },
  });

  return {
    logout,
    isPending,
    isError,
  };
};

export default useLogout;
