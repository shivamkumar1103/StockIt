import { useUser } from "../../auth/hooks/useUser";
import ProfileFormInner from "./ProfileFormInner";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfileForm() {
  const { user, isPending } = useUser();
  const userData = user?.data || user || {};

  if (isPending) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center py-16 text-muted-foreground gap-2 font-medium">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <span>Loading profile details...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <ProfileFormInner
      key={userData?._id || userData?.email || "profile-form"}
      userData={userData}
    />
  );
}
