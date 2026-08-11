import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToWatchlist as addToWatchlistApi } from "../services/watchlistApi";
import { toast } from "react-hot-toast";

const useAddToWatchlist = () => {
  const queryClient = useQueryClient();

  const {
    mutate: addToWatchlist,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (stockData) => addToWatchlistApi(stockData),
    onSuccess: () => {
      toast.success("Added to watchlist!");
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to add to watchlist.",
      );
    },
  });

  return { addToWatchlist, isPending, isError, error };
};

export default useAddToWatchlist;
