import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden font-sans bg-[#F3F0FA]">
      {/* Navbar - Full Width Top */}
      <Navbar />

      {/* Bottom Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Fixed Left */}
        <Sidebar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-white p-8 scroll-smooth m-4 rounded-2xl shadow-sm border border-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
