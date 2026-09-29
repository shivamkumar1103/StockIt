import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MarketToolbar = ({
  searchQuery,
  onSearchChange,
  activeSector,
  onSectorChange,
  sectors = [],
}) => {
  const allSectors = ["All", ...sectors];

  return (
    <div className="flex flex-col gap-4">
      {/* Search + count row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or symbol..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Sector tabs */}
      <Tabs value={activeSector} onValueChange={onSectorChange}>
        <TabsList className="flex-wrap h-auto gap-1">
          {allSectors.map((sector) => (
            <TabsTrigger key={sector} value={sector} className="text-xs">
              {sector}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default MarketToolbar;
