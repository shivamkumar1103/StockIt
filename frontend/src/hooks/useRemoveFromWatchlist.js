import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromWatchlist as removeFromWatchlistApi } from "../services/watchlistApi";
import { toast } from "react-hot-toast";

const useRemoveFromWatchlist = () => {
  const queryClient = useQueryClient();

  const {
    mutate: removeFromWatchlist,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (symbol) => removeFromWatchlistApi(symbol),
    onSuccess: (data) => {
      toast.success(data?.message || "Removed from watchlist!");
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to remove from watchlist.",
      );
    },
  });

  return { removeFromWatchlist, isPending, isError, error };
};

export default useRemoveFromWatchlist;
