import { Search, Moon } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-18 bg-white border-b border-[#F3F0FA] flex items-center justify-between px-8 w-full shrink-0 z-10 shadow-sm">
      <div className="flex items-center gap-16">
        <span className="text-[20px] font-bold text-[#333333] tracking-tight">
          StockIt
        </span>
      </div>

      <div className="flex items-center gap-8">
        {/* Search Input */}
        <div className="relative flex items-center group">
          <Search className="absolute left-3.5 w-4 h-4 text-gray-400 group-focus-within:text-[#6425FE] transition-colors" />
          <input
            type="text"
            placeholder="Search for stocks and more"
            className="pl-10 pr-4 py-2 bg-[#F3F0FA] focus:bg-white focus:ring-1 focus:ring-[#6425FE] border border-transparent rounded-full text-sm w-[320px] outline-none transition-all placeholder:text-gray-400 text-gray-700"
          />
        </div>

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
