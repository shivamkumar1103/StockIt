import ProfileForm from "../components/ProfileForm";
import PasswordForm from "../components/PasswordForm";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  return (
    <div className="w-full flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Account Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your personal information, profile photo, and password security.
        </p>
      </div>

      <Separator />

      <div className="max-w-4xl flex flex-col gap-8">
        <ProfileForm />
        <PasswordForm />
      </div>
    </div>
  );
}
