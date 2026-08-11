import { useQuery } from "@tanstack/react-query";
import { getWatchlist } from "../services/watchlistApi";

export const useWatchlist = () => {
  return useQuery({
    queryKey: ["watchlist"],
    queryFn: getWatchlist,
  });
};
