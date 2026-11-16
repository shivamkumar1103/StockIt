import * as stockRepository from "../repository/stockRepository.js";
import {
  FINNHUB_TTL_SECONDS,
  buildQuoteKey,
  buildProfileKey,
  buildSearchKey,
  buildNewsKey,
  getOrSet,
} from "./finnhubCacheService.js";

const checkMarket = (market) => {
  if (market === "IN") {
    throw new Error("Indian market is not supported yet");
  }
};

// Quote (Finnhub, Redis cached)
export const getQuote = async (symbol, market = "US") => {
  checkMarket(market);
  const cleanedSymbol = symbol.trim().toUpperCase();
  return getOrSet(
    buildQuoteKey(cleanedSymbol),
    FINNHUB_TTL_SECONDS.quote,
    async () => {
      const data = await stockRepository.fetchQuote(cleanedSymbol);

      return {
        symbol: cleanedSymbol,
        currentPrice: data.c,
        change: data.d,
        percentChange: data.dp,
        high: data.h,
        low: data.l,
        open: data.o,
        previousClose: data.pc,
        isProfit: data.d > 0,
        isLoss: data.d < 0,
      };
    },
  );
};

// Company Profile (Finnhub, Redis cached)
export const getCompanyProfile = async (symbol, market) => {
  checkMarket(market);
  const cleanedSymbol = symbol.trim().toUpperCase();
  return getOrSet(
    buildProfileKey(cleanedSymbol),
    FINNHUB_TTL_SECONDS.profile,
    () => stockRepository.fetchCompanyProfile(cleanedSymbol),
  );
};

// Search (Finnhub, Redis cached)
export const searchStocks = async (query, market) => {
  checkMarket(market);
  const cleanedQuery = query.trim();
  return getOrSet(
    buildSearchKey(cleanedQuery),
    FINNHUB_TTL_SECONDS.search,
    () => stockRepository.fetchSearchResults(cleanedQuery),
  );
};

// Market News (Finnhub, Redis cached)
export const getMarketNews = async (
  category = "general",
  market,
  minId = 0,
) => {
  checkMarket(market);
  return getOrSet(
    buildNewsKey(category, minId),
    FINNHUB_TTL_SECONDS.news,
    () => stockRepository.fetchNews(category, minId),
  );
};

// Historical Data (TwelveData — intentionally NOT Redis cached,
// only Finnhub calls use Redis per scope)
export const getHistoricalData = async (
  symbol,
  interval,
  market,
  outputsize = 30,
) => {
  checkMarket(market);

  const data = await stockRepository.fetchTimeSeries(
    symbol.trim().toUpperCase(),
    interval,
    outputsize,
  );

  if (!data || !data.values) {
    return data;
  }

  return {
    meta: data.meta,
    values: data.values.map((v) => {
      const open = parseFloat(v.open);
      const close = parseFloat(v.close);
      return {
        datetime: v.datetime,
        open,
        high: parseFloat(v.high),
        low: parseFloat(v.low),
        close,
        volume: parseInt(v.volume, 10),
        isProfit: close > open,
        isLoss: close < open,
      };
    }),
  };
};
