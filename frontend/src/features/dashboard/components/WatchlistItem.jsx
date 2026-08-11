import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

const WatchlistItem = ({ stock, onDeleteClick }) => {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
      {/* Clickable area — navigates to stock detail */}
      <Link
        to={`/stocks/${stock.symbol}`}
        className="flex items-center gap-3 flex-1 min-w-0 no-underline"
        draggable={false}
      >
        {/* Icon */}
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm shrink-0 ${stock.iconBg}`}
        >
          {stock.initial}
        </div>

        {/* Name + Symbol */}
        <div className="flex flex-col min-w-0">
          <span className="font-bold text-[#333333] group-hover:text-[#6425FE] transition-colors truncate max-w-40">
            {stock.symbol}
          </span>
          <span className="text-xs text-gray-400 font-medium mt-0.5">
            {stock.exchange || ""}
          </span>
        </div>
      </Link>

      {/* Delete button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDeleteClick(stock);
        }}
        className="p-2 rounded-lg text-gray-300 hover:text-[#EF4444] hover:bg-red-50 transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer shrink-0"
        title="Remove from watchlist"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default WatchlistItem;
