import { useQuery } from "@tanstack/react-query";
import { getStockQuote } from "../api/stockDetailApi";

const useStockQuote = (symbol) => {
  return useQuery({
    queryKey: ["stockQuote", symbol],
    queryFn: () => getStockQuote(symbol),
    enabled: !!symbol,
    refetchInterval: 20 * 1000, // Refetch every 20 seconds
  });
};

export default useStockQuote;
