// Pure quote math: fold a Finnhub trade tick into the stored quote.
// Kept side-effect free so it can be unit-tested without sockets.

export function applyTradeToQuote(current, trade) {
  if (!current) return null;
  const { p: price, t: tradeTime } = trade;
  if (typeof price !== "number" || Number.isNaN(price)) return null;

  const previousClose = current.previousClose || price;
  const currentPrice = Number(price.toFixed(2));

  const rawChange = currentPrice - previousClose;
  const change = Number(rawChange.toFixed(2));
  const percentChange =
    previousClose !== 0
      ? Number(((rawChange / previousClose) * 100).toFixed(2))
      : 0;

  const high = current.high ? Math.max(current.high, currentPrice) : currentPrice;
  const low = current.low ? Math.min(current.low, currentPrice) : currentPrice;

  return {
    ...current,
    symbol: trade.s,
    currentPrice,
    change,
    percentChange,
    high,
    low,
    previousClose,
    isProfit: change > 0,
    isLoss: change < 0,
    lastUpdated: tradeTime || Date.now(),
  };
}
