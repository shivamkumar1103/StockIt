import { useState, useRef } from "react";
import { useUpdateAccount } from "../hooks/useUpdateAccount";
import { Camera, Save, User, Upload, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const getPhotoUrl = (photoName) => {
  if (!photoName) return null;
  if (
    photoName.startsWith("http") ||
    photoName.startsWith("blob:") ||
    photoName.startsWith("data:")
  ) {
    return photoName;
  }
  const baseUrl = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace("/api/v1", "")
    : "http://localhost:3000";
  return `${baseUrl}/img/users/avatars/${photoName}`;
};

function ProfileFormInner({ userData }) {
  const { updateUser, isPending: isUpdatingUser } = useUpdateAccount();

  const [name, setName] = useState(userData.name || "");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(
    userData.photo ? getPhotoUrl(userData.photo) : null,
  );
  const [imgError, setImgError] = useState(false);
  const fileInputRef = useRef(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      setPhoto(file);
      setImgError(false);
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    if (photo) {
      formData.append("photo", photo);
    }
    updateUser(formData);
  };

  const userInitial = (name || userData.name || "U").charAt(0).toUpperCase();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 flex flex-col gap-6 shadow-sm">
      <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
        <div className="p-2.5 rounded-xl bg-[#F3F0FA] text-[#6425FE]">
          <User size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#333333]">
            Profile Information
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Update your photo and personal details
          </p>
        </div>
      </div>

      <form onSubmit={handleProfileSubmit} className="flex flex-col gap-6">
        {/* Avatar Upload Area */}
        <div className="flex flex-col sm:flex-row items-center gap-6 bg-[#F8F9FA] p-5 rounded-2xl border border-gray-100">
          <div
            className="relative group cursor-pointer shrink-0"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-3 border-white shadow-md bg-linear-to-br from-[#6425FE]/20 to-[#804dfa]/20 flex items-center justify-center">
              {photoPreview && !imgError ? (
                <img
                  src={photoPreview}
                  alt={name || "User Avatar"}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-[#6425FE]">
                  {userInitial}
                </span>
              )}
            </div>
            <div className="absolute inset-0 bg-[#333333]/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
              <Camera size={20} />
              <span className="text-[10px] font-medium mt-1">Change</span>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div className="flex flex-col gap-2 items-center sm:items-start text-center sm:text-left">
            <h4 className="text-sm font-semibold text-[#333333]">
              Profile Photo
            </h4>
            <p className="text-xs text-gray-400">
              Click on the avatar or upload button to select a new image (JPG,
              PNG, max 5MB).
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-1 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-gray-200 text-xs font-semibold text-[#333333] hover:text-[#6425FE] hover:border-[#6425FE]/40 transition-colors shadow-2xs cursor-pointer"
            >
              <Upload size={14} />
              <span>Upload Photo</span>
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="account-name"
              className="block text-xs font-semibold uppercase tracking-wider text-[#333333]/70 mb-2"
            >
              Full Name
            </label>
            <input
              id="account-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl py-3 px-4 text-[#333333] placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#6425FE]/20 focus:border-[#6425FE] focus:bg-white transition-all text-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="account-email"
                className="block text-xs font-semibold uppercase tracking-wider text-[#333333]/70"
              >
                Email Address
              </label>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                Read-only
              </span>
            </div>
            <input
              id="account-email"
              type="email"
              value={userData.email || ""}
              disabled
              className="w-full bg-gray-100/70 border border-gray-200 rounded-xl py-3 px-4 text-gray-500 font-medium cursor-not-allowed text-sm"
            />
          </div>
        </div>

        {/* Submit Action */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isUpdatingUser}
            className="bg-[#6425FE] hover:bg-[#6425FE]/90 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-sm hover:shadow-md hover:shadow-[#6425FE]/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdatingUser ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileFormInner;
