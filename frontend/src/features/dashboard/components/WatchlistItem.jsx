import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

const WatchlistItem = ({ stock, onDeleteClick }) => {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-accent transition-colors group cursor-pointer">
      {/* Clickable area — navigates to stock detail */}
      <Link
        to={`/stocks/${stock.symbol}`}
        className="flex items-center gap-3 flex-1 min-w-0 no-underline"
        draggable={false}
      >
        {/* Icon */}
        <div
          className={`w-9 h-9 rounded-md flex items-center justify-center text-white font-bold text-sm shrink-0 ${stock.iconBg}`}
        >
          {stock.initial}
        </div>

        {/* Name + Symbol */}
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-foreground transition-colors truncate max-w-40 text-sm">
            {stock.symbol}
          </span>
          <span className="text-[11px] text-muted-foreground font-medium mt-0.5">
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
        className="p-1.5 rounded-md text-muted-foreground hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer shrink-0"
        title="Remove from watchlist"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default WatchlistItem;
