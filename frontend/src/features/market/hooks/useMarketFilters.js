import { useState, useMemo } from "react";
import {
  filterBySectorAndQuery,
  getLiveCount,
  getSectors,
  getTopGainer,
  getTopLoser,
} from "../utils/marketStats";

/**
 * Pure filtering hook: takes an already-merged stock list and manages
 * search + sector state with derived top gainer / loser / sectors.
 * Data fetching/merging lives in useMarketData — pass its allStocks in.
 */
const useMarketFilters = (allStocks = []) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSector, setActiveSector] = useState("All");

  const filteredStocks = useMemo(
    () => filterBySectorAndQuery(allStocks, activeSector, searchQuery),
    [allStocks, searchQuery, activeSector],
  );

  const topGainer = useMemo(() => getTopGainer(filteredStocks), [filteredStocks]);
  const topLoser = useMemo(() => getTopLoser(filteredStocks), [filteredStocks]);
  const liveCount = useMemo(() => getLiveCount(allStocks), [allStocks]);
  const sectors = useMemo(() => getSectors(allStocks), [allStocks]);

  return {
    searchQuery,
    setSearchQuery,
    activeSector,
    setActiveSector,
    filteredStocks,
    topGainer,
    topLoser,
    liveCount,
    sectors,
  };
};

export default useMarketFilters;
