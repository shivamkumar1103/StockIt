import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SearchItem = ({ companyName, ticker, type, onSelect }) => {
  return (
    <li
      onClick={onSelect}
      className="flex items-center gap-3 px-4 py-3 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors border-b border-border last:border-0 group"
    >
      <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center shrink-0 group-hover:bg-background transition-colors">
        <TrendingUp className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
      </div>

      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-sm font-semibold text-foreground leading-tight truncate">
          {companyName}
        </span>
        <span className="text-xs text-muted-foreground mt-0.5">{ticker}</span>
      </div>

      {type && (
        <Badge variant="secondary" className="text-[10px] uppercase tracking-wider shrink-0">
          {type}
        </Badge>
      )}
    </li>
  );
};

export default SearchItem;
