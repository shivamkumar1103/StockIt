import ProfileForm from "./ProfileForm";
import PasswordForm from "./PasswordForm";

export default function AccountForm() {
  return (
    <div className="w-full flex flex-col gap-8">
      <ProfileForm />
      <PasswordForm />
    </div>
  );
}

export { ProfileForm, PasswordForm };
