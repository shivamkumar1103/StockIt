import { useState, useMemo } from "react";
import marketData from "../data/marketData";

/**
 * Custom hook that manages market page filtering state.
 * Provides search + sector filtering and computes top gainer / loser.
 */
const useMarketFilters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSector, setActiveSector] = useState("All");

  const filteredStocks = useMemo(() => {
    let stocks = marketData;

    // Filter by sector
    if (activeSector !== "All") {
      stocks = stocks.filter((s) => s.sector === activeSector);
    }

    // Filter by search query (symbol or name)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      stocks = stocks.filter(
        (s) =>
          s.symbol.toLowerCase().includes(query) ||
          s.name.toLowerCase().includes(query),
      );
    }

    return stocks;
  }, [searchQuery, activeSector]);

  const topGainer = useMemo(() => {
    if (filteredStocks.length === 0) return null;
    return filteredStocks.reduce((best, stock) =>
      stock.changePercent > best.changePercent ? stock : best,
    );
  }, [filteredStocks]);

  const topLoser = useMemo(() => {
    if (filteredStocks.length === 0) return null;
    return filteredStocks.reduce((worst, stock) =>
      stock.changePercent < worst.changePercent ? stock : worst,
    );
  }, [filteredStocks]);

  return {
    searchQuery,
    setSearchQuery,
    activeSector,
    setActiveSector,
    filteredStocks,
    topGainer,
    topLoser,
  };
};

export default useMarketFilters;
