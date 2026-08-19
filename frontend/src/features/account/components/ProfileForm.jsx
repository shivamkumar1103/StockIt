import { useUser } from "../../auth/hooks/useUser";
import ProfileFormInner from "./ProfileFormInner";
import { Loader2 } from "lucide-react";

export default function ProfileForm() {
  const { user, isPending } = useUser();
  const userData = user?.data || user || {};

  if (isPending) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-8 flex justify-center items-center py-16 text-gray-400 gap-2 font-medium shadow-sm">
        <Loader2 className="w-5 h-5 animate-spin text-[#6425FE]" />
        <span>Loading profile details...</span>
      </div>
    );
  }

  return (
    <ProfileFormInner
      key={userData?._id || userData?.email || "profile-form"}
      userData={userData}
    />
  );
}
