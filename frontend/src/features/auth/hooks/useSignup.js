import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const useSignup = () => {
  const navigate = useNavigate();
  const {
    mutate: signup,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (userData) => signupApi(userData),
    onSuccess: () => {
      toast.success(
        "Signup successful! Please check your email to verify your account.",
      );
      navigate("/auth/login"); // Redirect to login after successful signup
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to signup.");
    },
  });

  return {
    signup,
    isPending,
    isError,
    error: error?.response?.data,
  };
};

export default useSignup;
