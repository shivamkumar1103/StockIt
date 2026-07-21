import { useMutation } from "@tanstack/react-query";
import { forgotPassword as forgotPasswordApi } from "../api/authApi";
import { toast } from "react-hot-toast";

const useForgotPassword = () => {
  const {
    mutate: forgotPassword,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (email) => forgotPasswordApi(email),
    onSuccess: () => {
      toast.success("Password reset link sent successfully to your email!");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to send password reset link.",
      );
    },
  });

  return { forgotPassword, isPending, isError, error, isSuccess };
};

export default useForgotPassword;
