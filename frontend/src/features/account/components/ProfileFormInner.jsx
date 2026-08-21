import { useState, useRef } from "react";
import { useUpdateAccount } from "../hooks/useUpdateAccount";
import { Camera, Save, User, Upload, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-6 border-b border-border">
        <div className="p-2.5 rounded-xl bg-muted text-primary">
          <User className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg">Profile Information</CardTitle>
          <CardDescription>Update your photo and personal details</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleProfileSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 bg-muted/50 p-5 rounded-lg border border-border">
            <div
              className="relative group cursor-pointer shrink-0"
              onClick={() => fileInputRef.current?.click()}
            >
              <Avatar className="w-24 h-24 border-4 border-background shadow-sm">
                {!imgError && photoPreview ? (
                  <AvatarImage src={photoPreview} alt={name || "User Avatar"} onError={() => setImgError(true)} />
                ) : null}
                <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">{userInitial}</AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
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
              <h4 className="text-sm font-semibold text-foreground">Profile Photo</h4>
              <p className="text-xs text-muted-foreground">
                Click on the avatar or upload button to select a new image (JPG, PNG, max 5MB).
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="mt-1 flex items-center gap-1.5"
              >
                <Upload size={14} />
                <span>Upload Photo</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="account-name">Full Name</Label>
              <Input
                id="account-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="account-email">Email Address</Label>
                <span className="text-[10px] uppercase font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  Read-only
                </span>
              </div>
              <Input
                id="account-email"
                type="email"
                value={userData.email || ""}
                disabled
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={isUpdatingUser} className="gap-2">
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
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default ProfileFormInner;
