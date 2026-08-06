import { ArrowUp, ArrowDown, Star } from "lucide-react";
import useStockQuote from "../hooks/useStockQuote";

const StockHeader = ({ symbol, meta }) => {
  const exchange = meta?.exchange || "—";
  const type = meta?.type || "";

  const { data: quoteResponse, isPending: isQuoteLoading } =
    useStockQuote(symbol);

  const quote = quoteResponse?.data || {};
  const currentPrice = quote?.currentPrice;
  const change = quote?.change;
  const percentChange = quote?.percentChange;
  const isProfit = quote?.isProfit;

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
            <button className="text-amber-400 hover:text-amber-500 transition-colors">
              <Star size={18} fill="currentColor" />
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
