import { useState } from "react";
import { useWatchlist } from "../../../hooks/useWatchlist";
import useRemoveFromWatchlist from "../../../hooks/useRemoveFromWatchlist";
import WatchlistItem from "./WatchlistItem";
import WatchlistSkeleton from "./WatchlistSkeleton";
import DeleteConfirmModal from "./DeleteConfirmModal";

const ICON_COLORS = [
  "bg-gray-900",
  "bg-[#EF4444]",
  "bg-blue-600",
  "bg-teal-500",
  "bg-amber-700",
  "bg-[#6425FE]",
  "bg-emerald-600",
  "bg-pink-600",
  "bg-indigo-600",
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
      <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col h-full gap-4 shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-[#333333]">Watchlist</h2>
          <span className="text-xs text-gray-400 font-medium">
            {watchlistData.length > 0 ? `${watchlistData.length} stocks` : ""}
          </span>
        </div>

        {/* Content */}
        {isLoading ? (
          <WatchlistSkeleton />
        ) : isError ? (
          <div className="flex items-center justify-center py-8 text-red-400 text-sm font-medium">
            Failed to load watchlist
          </div>
        ) : watchlistData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-2 flex-1">
            <span className="text-3xl">⭐</span>
            <span className="text-gray-400 text-sm font-medium">
              No stocks in watchlist
            </span>
            <span className="text-gray-300 text-xs">
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
      </div>

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
