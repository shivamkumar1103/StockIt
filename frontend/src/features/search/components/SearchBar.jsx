import { Search } from "lucide-react";
import useDebounced from "../../../hooks/useDebounced";
import useStockSearch from "../hooks/useStockSearch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchDropdown from "./SearchDropdown";

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
      <div className="relative flex items-center group">
        <Search className="absolute left-3.5 w-4 h-4 text-gray-400 group-focus-within:text-[#6425FE] transition-colors z-10 pointer-events-none" />
        <input
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
          className="pl-10 pr-4 py-2 bg-[#F3F0FA] focus:bg-white focus:ring-1 focus:ring-[#6425FE] border border-transparent rounded-full text-sm w-[320px] outline-none transition-all placeholder:text-gray-400 text-gray-700 shadow-sm"
        />
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
