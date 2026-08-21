import { useLocation } from "react-router-dom";
import { CircleHelp, LayoutGrid } from "lucide-react";
import SearchBar from "../features/search/components/SearchBar";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const location = useLocation();
  
  const getPageTitle = (pathname) => {
    if (pathname.startsWith('/portfolio')) return 'Portfolio';
    if (pathname.startsWith('/stocks')) return 'Stock Detail';
    if (pathname.startsWith('/news')) return 'News';
    if (pathname.startsWith('/account')) return 'Settings';
    if (pathname.startsWith('/support')) return 'Support';
    return 'Dashboard';
  };

  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-6 bg-background shrink-0">
      {/* Left side */}
      <div className="flex items-center gap-2">
        <LayoutGrid className="h-5 w-5 text-muted-foreground" />
        <h1 className="text-lg font-semibold">{getPageTitle(location.pathname)}</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <SearchBar />
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
          <CircleHelp className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
