import { useMemo } from "react";
import marketData from "../data/marketData";
import { mergeMarketStocks } from "../utils/mergeMarketData";
import useMarketLive from "./useMarketLive";

/**
 * Composition hook: live WS quotes + static metadata merged into one list.
 * Only live stocks are returned — static fallbacks are excluded.
 * Filtering lives in useMarketFilters(allStocks); stats in utils/marketStats.
 */
const useMarketData = () => {
  const { liveQuotes, status, lastUpdated, isPending } = useMarketLive();

  const allStocks = useMemo(
    () => mergeMarketStocks(marketData, liveQuotes),
    [liveQuotes],
  );

  return {
    allStocks,
    liveQuotes,
    connectionStatus: status,
    lastUpdated,
    isPending,
  };
};

export default useMarketData;
