import { useMutation } from "@tanstack/react-query";
import { verifyEmail as verifyEmailApi } from "../api/authApi";

const useVerifyEmail = () => {
  const {
    mutate: verifyEmail,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (token) => verifyEmailApi(token),
  });

  return {
    verifyEmail,
    isPending,
    isError,
    error: error?.response?.data,
    isSuccess,
  };
};

export default useVerifyEmail;
