import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "../api/authApi";

const useResetPassword = () => {
  const {
    mutate: resetPassword,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: ({ token, password, passwordConfirm }) =>
      resetPasswordApi(token, password, passwordConfirm),
  });

  return {
    resetPassword,
    isPending,
    isError,
    error: error?.response?.data,
    isSuccess,
  };
};

export default useResetPassword;
