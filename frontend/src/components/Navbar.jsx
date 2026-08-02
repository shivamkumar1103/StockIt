import { Moon } from "lucide-react";
import SearchBar from "../features/search/components/SearchBar";

export default function Navbar() {
  return (
    <header className="h-18 bg-white border-b border-[#F3F0FA] flex items-center justify-between px-8 w-full shrink-0 z-10 shadow-sm">
      <div className="flex items-center gap-16">
        <span className="text-[20px] font-bold text-[#333333] tracking-tight">
          StockIt
        </span>
      </div>

      <div className="flex items-center gap-8">
        <SearchBar />

        <button className="text-gray-500 hover:text-[#6425FE] transition-colors flex items-center gap-2 font-medium text-sm">
          <Moon className="w-4.5 h-4.5" />
          <span>Dark</span>
        </button>

        <button className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 focus:ring-2 focus:ring-[#6425FE] focus:outline-none">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Matt"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
}
