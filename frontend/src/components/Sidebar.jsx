import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  PieChart,
  Newspaper,
  User,
  LifeBuoy,
  Settings,
  LogOut,
  Briefcase,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const { user, logout, isLoggingOut } = useAuth() || {};
  const userData = user?.data || {};
  const navigate = useNavigate();

  const navGroups = [
    {
      label: "Main",
      items: [
        { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { name: "Portfolio", path: "/portfolio", icon: PieChart },
      ],
    },
    {
      label: "Market",
      items: [{ name: "News", path: "/news", icon: Newspaper }],
    },
    {
      label: "Account",
      items: [
        { name: "Settings", path: "/account", icon: User },
        { name: "Support", path: "/support", icon: LifeBuoy },
      ],
    },
  ];

  return (
    <aside className="w-64 flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      {/* Top Header */}
      <div className="h-14 flex items-center px-6 border-b border-sidebar-border shrink-0">
        <div className="flex items-center gap-2 font-bold text-lg">
          <Briefcase className="h-5 w-5" />
          <div className="flex flex-col">
            <span className="leading-tight">StockIt</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider leading-tight">
              Portfolio
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navGroups.map((group, idx) => (
          <div key={idx}>
            <h3 className="px-3 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-2">
              {group.label}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Separator className="bg-sidebar-border" />

      {/* Bottom User Section */}
      <div className="p-4">
        {userData.name ? (
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-9 w-9">
              {userData.photo ? (
                <AvatarImage
                  src={`http://localhost:3000/img/users/avatars/${userData.photo}`}
                  alt={userData.name}
                />
              ) : null}
              <AvatarFallback>{userData.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-medium truncate">
                {userData.name}
              </span>
              <span className="text-xs text-sidebar-foreground/70 truncate">
                {userData.email}
              </span>
            </div>
            <Button
              onClick={() => navigate("/account")}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-sidebar-foreground/70 shrink-0"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        ) : null}

        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
          onClick={logout}
          disabled={isLoggingOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          {isLoggingOut ? "Logging out..." : "Log out"}
        </Button>
      </div>
    </aside>
  );
}
