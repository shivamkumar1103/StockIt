import { Search } from "lucide-react";
import useDebounced from "../../../hooks/useDebounced";
import useStockSearch from "../hooks/useStockSearch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchDropdown from "./SearchDropdown";
import { Input } from "@/components/ui/input";

function SearchBar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounced(query, 500);
  const navigate = useNavigate();

  const { data, isPending, error, isOpen, setIsOpen, searchContainerRef } =
    useStockSearch(debouncedQuery);

  const handleSelect = (stock) => {
    navigate(`/stocks/${stock.symbol}`);
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={searchContainerRef}>
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-4 h-4 text-muted-foreground z-10 pointer-events-none" />
        <Input
          type="text"
          placeholder="Search for stocks and more"
          value={query}
          onChange={(e) => {
            const val = e.target.value;
            setQuery(val);
            if (val.length < 2) setIsOpen(false);
          }}
          onFocus={() => {
            if (query.length >= 2) setIsOpen(true);
          }}
          className="pl-9 pr-14 w-[320px] bg-muted border-transparent focus-visible:ring-1 focus-visible:ring-ring focus-visible:bg-background rounded-full transition-colors"
        />
        <kbd className="pointer-events-none absolute right-3 hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
          ⌘K
        </kbd>
      </div>

      {isOpen && (
        <SearchDropdown
          results={data?.data}
          loading={isPending}
          error={error}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
}

export default SearchBar;
