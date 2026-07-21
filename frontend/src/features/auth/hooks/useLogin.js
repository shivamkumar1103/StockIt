import { useQueryClient, useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: login,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (userData) => loginApi(userData),
    onSuccess: (data) => {
      toast.success("Login successful!");
      // Update the user data in the cache when logging in
      queryClient.setQueryData(["user"], data.data);
      navigate("/dashboard"); // Redirect to dashboard after successful login
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to login.");
    },
  });

  return {
    login,
    isPending,
    isError,
    error: error?.response?.data,
  };
};
export default useLogin;
