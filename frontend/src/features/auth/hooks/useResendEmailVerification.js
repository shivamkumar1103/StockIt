import { useMutation } from "@tanstack/react-query";
import { resendVerificationEmail as resendVerificationEmailApi } from "../api/authApi";
import { toast } from "react-hot-toast";

const useResendEmailVerification = () => {
  const { mutate: resendVerificationEmail, isPending } = useMutation({
    mutationFn: (email) => resendVerificationEmailApi(email),
    onSuccess: (data) => {
      toast.success(data.message || "Verification email resent successfully!");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to resend verification email.",
      );
    },
  });
  return { resendVerificationEmail, isPending };
};

export default useResendEmailVerification;
