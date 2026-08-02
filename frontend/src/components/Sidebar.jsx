import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  PieChart,
  Newspaper,
  User,
  LifeBuoy,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Portfolio", path: "/portfolio", icon: PieChart },
  { name: "News", path: "/showcase", icon: Newspaper },
  { name: "Account", path: "/account", icon: User },
  { name: "Support", path: "/support", icon: LifeBuoy },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-70 h-full bg-white border-r border-[#F3F0FA] text-[#333333] flex flex-col justify-center font-sans tracking-wide shrink-0 z-0">
      <nav className="flex flex-col gap-6 w-fit mx-auto self-center">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center group transition-colors duration-300 ${
                isActive
                  ? "text-[#6425FE]"
                  : "hover:text-[#6425FE] text-gray-500"
              }`}
            >
              {/* Line indicator */}
              <div
                className={`h-px transition-all duration-300 mr-5 ${
                  isActive
                    ? "bg-[#6425FE] w-12"
                    : "bg-gray-300 w-8 group-hover:w-12 group-hover:bg-[#6425FE]"
                }`}
              />

              {/* Icon instead of ID */}
              <div
                className={`mr-4 transition-opacity ${isActive ? "opacity-100 text-[#6425FE]" : "opacity-60 text-gray-400 group-hover:text-[#6425FE]"}`}
              >
                <Icon size={20} />
              </div>

              {/* Label */}
              <span className="text-[17px] font-medium tracking-wide">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
