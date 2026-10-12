import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMarketWsUrl } from "../api/marketWs";
import { createMarketSocket } from "../api/marketSocket";

/**
 * - Before the first snapshot: `liveQuotes` is an empty Map and `isPending`
 *   is true.
 * - Every snapshot/update bumps `dataUpdatedAt`, which is exposed as
 *   `lastUpdated`.
 * - Connection status ("connecting" | "live" | "reconnecting") is mirrored
 *   into a second cache entry so badges read it via `useQuery` too.
 */

export const MARKET_QUOTES_QUERY_KEY = ["market", "live-quotes"];
export const MARKET_STATUS_QUERY_KEY = ["market", "connection-status"];

const applyQuotesUpdate = (prev, quotes) => {
  const base = prev instanceof Map ? prev : new Map();
  const next = new Map(base);
  for (const quote of quotes ?? []) {
    if (quote?.symbol) next.set(quote.symbol, quote);
  }
  return next;
};

let sharedSocket = null;
let subscriberCount = 0;

const ensureMarketSubscription = (queryClient) => {
  subscriberCount += 1;

  if (!sharedSocket) {
    sharedSocket = createMarketSocket({
      url: getMarketWsUrl(),
      onStatus: (next) => {
        queryClient.setQueryData(MARKET_STATUS_QUERY_KEY, next);
      },
      onSnapshot: (next) => {
        queryClient.setQueryData(MARKET_QUOTES_QUERY_KEY, next);
      },
      onUpdate: (quotes) => {
        queryClient.setQueryData(MARKET_QUOTES_QUERY_KEY, (prev) =>
          applyQuotesUpdate(prev, quotes),
        );
      },
    });
  }

  return () => {
    subscriberCount -= 1;
    if (subscriberCount <= 0) {
      subscriberCount = 0;
      try {
        sharedSocket?.close();
      } catch {
        // ignore cleanup errors
      }
      sharedSocket = null;
    }
  };
};

const useMarketQuotes = () => {
  const queryClient = useQueryClient();

  useEffect(() => ensureMarketSubscription(queryClient), [queryClient]);

  const quotesQuery = useQuery({
    queryKey: MARKET_QUOTES_QUERY_KEY,
    queryFn: () =>
      queryClient.getQueryData(MARKET_QUOTES_QUERY_KEY) ?? new Map(),
    enabled: false,
  });

  const statusQuery = useQuery({
    queryKey: MARKET_STATUS_QUERY_KEY,
    queryFn: () =>
      queryClient.getQueryData(MARKET_STATUS_QUERY_KEY) ?? "connecting",
    enabled: false,
  });

  return {
    liveQuotes: quotesQuery.data ?? new Map(),
    connectionStatus: statusQuery.data ?? "connecting",
    lastUpdated: quotesQuery.dataUpdatedAt || null,
    isPending: quotesQuery.isPending,
    isError: quotesQuery.isError,
    error: quotesQuery.error,
  };
};

export default useMarketQuotes;
