import { TrendingUp } from "lucide-react";

const SearchItem = ({ companyName, ticker, type, onSelect }) => {
  return (
    <li
      onClick={onSelect}
      className="flex items-center gap-3 px-4 py-3 hover:bg-[#F3F0FA] cursor-pointer transition-all duration-150 border-b border-gray-100/80 last:border-b-0 group"
    >
      {/* Icon */}
      <div className="w-9 h-9 rounded-lg bg-linear-to-br from-[#6425FE]/10 to-[#6425FE]/5 flex items-center justify-center shrink-0 group-hover:from-[#6425FE]/20 group-hover:to-[#6425FE]/10 transition-all">
        <TrendingUp className="w-4 h-4 text-[#6425FE]" />
      </div>

      {/* Info */}
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-[13px] font-semibold text-gray-900 leading-tight">
          {companyName}
        </span>
        <span className="text-xs text-gray-400 mt-0.5">{ticker}</span>
      </div>

      {/* Type badge */}
      {type && (
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6425FE]/70 bg-[#6425FE]/8 px-2 py-0.5 rounded-full shrink-0">
          {type}
        </span>
      )}
    </li>
  );
};

export default SearchItem;
