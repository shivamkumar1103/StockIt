import { useState } from "react";
import { useWatchlist } from "../../../hooks/useWatchlist";
import useRemoveFromWatchlist from "../../../hooks/useRemoveFromWatchlist";
import WatchlistItem from "./WatchlistItem";
import WatchlistSkeleton from "./WatchlistSkeleton";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ICON_COLORS = [
  "bg-slate-800",
  "bg-red-500",
  "bg-blue-600",
  "bg-teal-500",
  "bg-amber-600",
  "bg-indigo-600",
  "bg-emerald-600",
  "bg-pink-600",
  "bg-violet-600",
  "bg-orange-500",
];

const getIconBg = (index) => ICON_COLORS[index % ICON_COLORS.length];

const Watchlist = () => {
  const { data: watchlistResponse, isLoading, isError } = useWatchlist();
  const { removeFromWatchlist, isPending: isRemoving } =
    useRemoveFromWatchlist();

  const [stockToDelete, setStockToDelete] = useState(null);

  const watchlistData = (watchlistResponse?.data || []).map((stock, index) => ({
    ...stock,
    iconBg: getIconBg(index),
    initial: (stock.symbol || "?").charAt(0).toUpperCase(),
  }));

  const handleDeleteClick = (stock) => {
    setStockToDelete(stock);
  };

  const handleConfirmDelete = (symbol) => {
    removeFromWatchlist(symbol, {
      onSettled: () => setStockToDelete(null),
    });
  };

  const handleCancelDelete = () => {
    setStockToDelete(null);
  };

  return (
    <>
      <Card className="flex flex-col h-full shadow-sm bg-card border-border">
        {/* Header */}
        <CardHeader className="flex flex-row justify-between items-center pb-2">
          <CardTitle className="text-lg font-semibold text-foreground">Watchlist</CardTitle>
          <span className="text-xs text-muted-foreground font-medium">
            {watchlistData.length > 0 ? `${watchlistData.length} stocks` : ""}
          </span>
        </CardHeader>

        {/* Content */}
        <CardContent className="flex-1 flex flex-col pt-0">
          {isLoading ? (
            <WatchlistSkeleton />
          ) : isError ? (
            <div className="flex items-center justify-center py-8 text-red-600 dark:text-red-400 text-sm font-medium">
              Failed to load watchlist
            </div>
          ) : watchlistData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 gap-2 flex-1">
              <span className="text-3xl text-muted-foreground/50">⭐</span>
              <span className="text-muted-foreground text-sm font-medium">
                No stocks in watchlist
              </span>
              <span className="text-muted-foreground/70 text-xs">
                Search for a stock and tap the star to add it
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-0.5 overflow-y-auto pr-2 -mr-2 flex-1">
              {watchlistData.map((stock) => (
                <WatchlistItem
                  key={stock.symbol}
                  stock={stock}
                  onDeleteClick={handleDeleteClick}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      {stockToDelete && (
        <DeleteConfirmModal
          stock={stockToDelete}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          isDeleting={isRemoving}
        />
      )}
    </>
  );
};

export default Watchlist;
