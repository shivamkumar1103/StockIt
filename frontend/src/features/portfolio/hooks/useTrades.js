import { useQuery } from "@tanstack/react-query";
import { getTradeHistory } from "../api/portfolioApi";

export const useTrades = (enabled = true) => {
  return useQuery({
    queryKey: ["trades"],
    queryFn: getTradeHistory,
    enabled,
  });
};
