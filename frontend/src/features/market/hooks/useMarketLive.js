import useMarketQuotes from "./useMarketQuotes";

/**
 * Connect to the backend market WebSocket (`/ws/market`) for live quotes.
 *
 * Backend Quote shape:
 *  { symbol, currentPrice, change, percentChange, high, low, open,
 *    previousClose, isProfit, isLoss, lastUpdated }
 *
 * Thin backwards-compatible wrapper over `useMarketQuotes`: loading and
 * freshness state now come from TanStack Query (`isPending` /
 * `dataUpdatedAt`) instead of manual `useState` flags.
 */
const useMarketLive = () => {
  const { liveQuotes, connectionStatus, lastUpdated, isPending } =
    useMarketQuotes();

  return { liveQuotes, status: connectionStatus, lastUpdated, isPending };
};

export default useMarketLive;
