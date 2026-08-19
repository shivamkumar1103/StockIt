import ProfileForm from "../components/ProfileForm";
import PasswordForm from "../components/PasswordForm";

export default function Settings() {
  return (
    <div className="w-full flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#333333]">Account Settings</h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage your personal information, profile photo, and password security.
        </p>
      </div>

      {/* Divider */}
      <hr className="border-gray-100" />

      {/* Account Forms */}
      <div className="max-w-4xl flex flex-col gap-8">
        <ProfileForm />
        <PasswordForm />
      </div>
    </div>
  );
}
