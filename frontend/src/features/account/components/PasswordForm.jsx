import { useState } from "react";
import { useUpdatePassword } from "../hooks/useUpdatePassword";
import { Key, Eye, EyeOff, Loader2, Lock } from "lucide-react";
import toast from "react-hot-toast";

export default function PasswordForm() {
  const { changePassword, isPending: isUpdatingPassword } = useUpdatePassword();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !newPasswordConfirm) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      toast.error("New passwords do not match");
      return;
    }

    changePassword(
      { currentPassword, newPassword, newPasswordConfirm },
      {
        onSuccess: () => {
          setCurrentPassword("");
          setNewPassword("");
          setNewPasswordConfirm("");
        },
      }
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 flex flex-col gap-6 shadow-sm">
      <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
        <div className="p-2.5 rounded-xl bg-[#F3F0FA] text-[#6425FE]">
          <Lock size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#333333]">Change Password</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Ensure your account is using a strong, unique password
          </p>
        </div>
      </div>

      <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          {/* Current Password */}
          <div>
            <label
              htmlFor="current-password"
              className="block text-xs font-semibold uppercase tracking-wider text-[#333333]/70 mb-2"
            >
              Current Password
            </label>
            <div className="relative">
              <input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                required
                className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl py-3 pl-4 pr-11 text-[#333333] placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#6425FE]/20 focus:border-[#6425FE] focus:bg-white transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
              >
                {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* New Password & Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="new-password"
                className="block text-xs font-semibold uppercase tracking-wider text-[#333333]/70 mb-2"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  required
                  minLength={8}
                  className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl py-3 pl-4 pr-11 text-[#333333] placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#6425FE]/20 focus:border-[#6425FE] focus:bg-white transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-xs font-semibold uppercase tracking-wider text-[#333333]/70 mb-2"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={newPasswordConfirm}
                  onChange={(e) => setNewPasswordConfirm(e.target.value)}
                  placeholder="Repeat new password"
                  required
                  minLength={8}
                  className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl py-3 pl-4 pr-11 text-[#333333] placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#6425FE]/20 focus:border-[#6425FE] focus:bg-white transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Action */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isUpdatingPassword}
            className="bg-[#333333] hover:bg-[#222222] text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdatingPassword ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Updating...</span>
              </>
            ) : (
              <>
                <Key className="w-4 h-4" />
                <span>Update Password</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
