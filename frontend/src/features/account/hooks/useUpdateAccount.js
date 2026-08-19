import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAccount } from "../api/accountApi";
import toast from "react-hot-toast";

export const useUpdateAccount = () => {
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: updateAccount,
    onSuccess: () => {
      toast.success("Account updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update account");
    },
  });

  return { updateUser, isPending, isError, error };
};
