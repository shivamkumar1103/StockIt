import { Link } from "react-router-dom";
import { Moon, User as UserIcon } from "lucide-react";
import SearchBar from "../features/search/components/SearchBar";
import { useUser } from "../features/auth/hooks/useUser";

export default function Navbar() {
  const { user } = useUser();
  const userData = user?.data || user || {};

  const photoUrl = userData.photo
    ? `http://localhost:3000/img/users/avatars/${userData.photo}`
    : null;

  return (
    <header className="h-18 bg-white border-b border-[#F3F0FA] flex items-center justify-between px-8 w-full shrink-0 z-10 shadow-sm">
      <div className="flex items-center gap-16">
        <Link to="/dashboard" className="text-[20px] font-bold text-[#333333] tracking-tight hover:text-[#6425FE] transition-colors">
          StockIt
        </Link>
      </div>

      <div className="flex items-center gap-8">
        <SearchBar />

        <button className="text-gray-500 hover:text-[#6425FE] transition-colors flex items-center gap-2 font-medium text-sm cursor-pointer">
          <Moon className="w-4.5 h-4.5" />
          <span>Dark</span>
        </button>

        <Link
          to="/account"
          title="Account Settings"
          className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 hover:border-[#6425FE] focus:ring-2 focus:ring-[#6425FE] focus:outline-none transition-all flex items-center justify-center bg-[#F3F0FA] text-[#6425FE]"
        >
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={userData.name || "User"}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              className="w-full h-full object-cover"
            />
          ) : (
            <UserIcon size={20} />
          )}
        </Link>
      </div>
    </header>
  );
}
