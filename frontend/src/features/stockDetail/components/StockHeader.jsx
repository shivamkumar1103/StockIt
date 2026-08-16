import { ArrowUp, ArrowDown, Star, Loader2 } from "lucide-react";
import { useWatchlist } from "../../../hooks/useWatchlist";
import useAddToWatchlist from "../../../hooks/useAddToWatchlist";
import useRemoveFromWatchlist from "../../../hooks/useRemoveFromWatchlist";

const StockHeader = ({ symbol, meta, quoteResponse, isQuoteLoading }) => {
  const exchange = meta?.exchange || "—";
  const type = meta?.type || "";

  const quote = quoteResponse?.data || {};
  const currentPrice = quote?.currentPrice;
  const change = quote?.change;
  const percentChange = quote?.percentChange;
  const isProfit = quote?.isProfit;

  // Watchlist state
  const { data: watchlistResponse } = useWatchlist();
  const { addToWatchlist, isPending: isAdding } = useAddToWatchlist();
  const { removeFromWatchlist, isPending: isRemoving } =
    useRemoveFromWatchlist();

  const watchlistStocks = watchlistResponse?.data || [];
  const isInWatchlist = watchlistStocks.some(
    (s) => s.symbol?.toUpperCase() === symbol?.toUpperCase(),
  );
  const isWatchlistLoading = isAdding || isRemoving;

  const handleToggleWatchlist = () => {
    if (isWatchlistLoading) return;

    if (isInWatchlist) {
      removeFromWatchlist(symbol);
    } else {
      addToWatchlist({
        symbol: symbol,
        exchange: exchange,
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Left: Symbol + exchange */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#6425FE]/10 flex items-center justify-center text-[#6425FE] font-bold text-lg shadow-sm">
          {symbol?.charAt(0) || "?"}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#333333] tracking-tight">
              {symbol}
            </h1>
            <button
              onClick={handleToggleWatchlist}
              disabled={isWatchlistLoading}
              className={`transition-all duration-200 cursor-pointer disabled:cursor-wait ${
                isInWatchlist
                  ? "text-amber-400 hover:text-amber-500"
                  : "text-gray-300 hover:text-amber-400"
              }`}
              title={
                isInWatchlist ? "Remove from watchlist" : "Add to watchlist"
              }
            >
              {isWatchlistLoading ? (
                <Loader2 size={18} className="animate-spin text-gray-400" />
              ) : (
                <Star
                  size={18}
                  fill={isInWatchlist ? "currentColor" : "none"}
                  strokeWidth={isInWatchlist ? 0 : 2}
                />
              )}
            </button>
          </div>
          <span className="text-sm text-gray-400 font-medium">
            {type} · {exchange}
          </span>
        </div>
      </div>

      {/* Right: Price + change */}
      <div className="flex items-center gap-4">
        {isQuoteLoading ? (
          <div className="h-10 w-32 bg-gray-100 rounded-lg animate-pulse" />
        ) : currentPrice != null ? (
          <>
            <span className="text-3xl font-extrabold text-[#333333] tracking-tight">
              ${currentPrice.toFixed(2)}
            </span>
            <div
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-bold ${
                isProfit
                  ? "bg-[#E6F4EA] text-[#137333]"
                  : "bg-[#FCE8E6] text-[#A50E0E]"
              }`}
            >
              {isProfit ? (
                <ArrowUp size={14} strokeWidth={3} />
              ) : (
                <ArrowDown size={14} strokeWidth={3} />
              )}
              {change > 0 ? "+" : ""}
              {change?.toFixed(2)} ({percentChange?.toFixed(2)}%)
            </div>
          </>
        ) : (
          <span className="text-gray-400 text-sm">Quote unavailable</span>
        )}
      </div>
    </div>
  );
};

export default StockHeader;
