import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../api/accountApi";
import toast from "react-hot-toast";

export const useUpdatePassword = () => {
  const {
    mutate: changePassword,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success("Password updated successfully");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update password");
    },
  });

  return { changePassword, isPending, isError, error };
};
