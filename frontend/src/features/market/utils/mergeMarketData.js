/**
 * Merge static stock metadata (symbol, name, sector) with
 * live backend quotes ({ currentPrice, change, percentChange, ... }).
 * Only stocks with a live quote are returned (isLive=true).
 * Price fields always come from the backend — numeric fallbacks (0)
 * apply when a quote field is missing.
 */

export const mergeWithLive = (staticStock, liveQuote) => {
  if (!liveQuote) return { ...staticStock, isLive: false };
  return {
    ...staticStock,
    price:
      typeof liveQuote.currentPrice === "number"
        ? liveQuote.currentPrice
        : 0,
    change: typeof liveQuote.change === "number" ? liveQuote.change : 0,
    changePercent:
      typeof liveQuote.percentChange === "number"
        ? liveQuote.percentChange
        : 0,
    high: liveQuote.high ?? null,
    low: liveQuote.low ?? null,
    open: liveQuote.open ?? null,
    previousClose: liveQuote.previousClose ?? null,
    isLive: true,
    lastUpdated: liveQuote.lastUpdated ?? null,
  };
};

const toLiveOnlyStock = (symbol, quote) => ({
  symbol,
  name: symbol,
  sector: "Other",
  price: quote.currentPrice ?? 0,
  change: quote.change ?? 0,
  changePercent: quote.percentChange ?? 0,
  high: quote.high,
  low: quote.low,
  open: quote.open,
  previousClose: quote.previousClose,
  isLive: true,
  lastUpdated: quote.lastUpdated ?? null,
});

export const mergeMarketStocks = (staticStocks, liveQuotes) => {
  if (!liveQuotes || liveQuotes.size === 0) return [];

  const merged = staticStocks
    .map((stock) => mergeWithLive(stock, liveQuotes.get(stock.symbol)))
    .filter((stock) => stock.isLive);

  // Include live-only symbols that have no static entry yet.
  for (const [symbol, quote] of liveQuotes) {
    if (!merged.some((s) => s.symbol === symbol)) {
      merged.push(toLiveOnlyStock(symbol, quote));
    }
  }

  return merged;
};
