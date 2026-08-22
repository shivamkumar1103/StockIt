import { ArrowUp, ArrowDown, Star, Loader2 } from "lucide-react";
import { useWatchlist } from "../../../hooks/useWatchlist";
import useAddToWatchlist from "../../../hooks/useAddToWatchlist";
import useRemoveFromWatchlist from "../../../hooks/useRemoveFromWatchlist";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const StockHeader = ({
  symbol,
  companyName,
  meta,
  quoteResponse,
  isQuoteLoading,
  currentHolding,
}) => {
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
      addToWatchlist({ symbol: symbol, companyName: companyName, exchange: exchange });
    }
  };

  return (
    <div className="w-full flex flex-col xl:flex-row xl:items-start justify-between gap-8">
      {/* Left: Symbol + exchange + Watchlist */}
      <div className="flex items-start gap-6">
        <Avatar className="w-20 h-20 rounded-xl">
          <AvatarFallback className="bg-primary/10 text-primary text-3xl font-bold border border-primary/20">
            {symbol?.charAt(0) || "?"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold text-foreground uppercase tracking-tight">
              {symbol}
            </h1>
            <Button
              variant={isInWatchlist ? "secondary" : "outline"}
              size="icon"
              onClick={handleToggleWatchlist}
              disabled={isWatchlistLoading}
              title={
                isInWatchlist ? "Remove from watchlist" : "Add to watchlist"
              }
              className="rounded-xl"
            >
              {isWatchlistLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Star
                  size={20}
                  fill={isInWatchlist ? "currentColor" : "none"}
                  className={
                    isInWatchlist ? "text-primary" : "text-muted-foreground"
                  }
                />
              )}
            </Button>
          </div>
          {companyName && (
            <span className="text-foreground text-lg mt-1 font-medium truncate max-w-md">
              {companyName}
            </span>
          )}
          <span className="text-muted-foreground text-sm uppercase mt-1 block font-medium">
            {type} <span className="mx-2 text-border">•</span> {exchange}
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-end md:items-center gap-8">
        {/* Current Holding Banner */}
        {currentHolding && (
          <div className="flex flex-col items-end border-r border-border pr-8">
            <span className="text-muted-foreground text-xs uppercase mb-1 font-semibold">
              Your Holding
            </span>
            <span className="text-primary font-bold text-2xl tracking-tight">
              $
              {(currentPrice * currentHolding.quantity).toLocaleString(
                "en-US",
                { minimumFractionDigits: 2, maximumFractionDigits: 2 },
              )}
            </span>
            <span className="text-muted-foreground text-sm font-medium mt-1">
              {currentHolding.quantity} SHARES
            </span>
          </div>
        )}

        {/* Right: Price + change */}
        <div className="flex flex-col items-end">
          {isQuoteLoading ? (
            <div className="h-12 w-48 bg-muted rounded-xl animate-pulse" />
          ) : currentPrice != null ? (
            <>
              <span className="text-5xl font-bold text-foreground tracking-tight">
                ${currentPrice.toFixed(2)}
              </span>
              <div
                className={`flex items-center gap-1.5 px-3 py-1 mt-2 rounded-lg text-sm font-bold border ${
                  isProfit
                    ? "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800"
                    : "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
                }`}
              >
                {isProfit ? (
                  <ArrowUp size={16} strokeWidth={2.5} />
                ) : (
                  <ArrowDown size={16} strokeWidth={2.5} />
                )}
                {change > 0 ? "+" : ""}
                {change?.toFixed(2)} ({percentChange?.toFixed(2)}%)
              </div>
            </>
          ) : (
            <span className="text-muted-foreground text-sm font-medium uppercase">
              Quote unavailable
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockHeader;
