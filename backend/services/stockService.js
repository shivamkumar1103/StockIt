import * as stockRepository from "../repository/stockRepository.js";

const checkMarket = (market) => {
  if (market === "IN") {
    throw new Error("Indian market is not supported yet");
  }
};

// Quote
export const getQuote = async (symbol, market = "US") => {
  checkMarket(market);
  const cleanedSymbol = symbol.trim().toUpperCase();
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
};

// Company Profile
export const getCompanyProfile = async (symbol, market) => {
  checkMarket(market);
  return await stockRepository.fetchCompanyProfile(symbol.trim().toUpperCase());
};

// Search
export const searchStocks = async (query, market) => {
  checkMarket(market);
  return await stockRepository.fetchSearchResults(query.trim());
};

// Market News
export const getMarketNews = async (
  category = "general",
  market,
  minId = 0,
) => {
  checkMarket(market);
  return await stockRepository.fetchNews(category, minId);
};

// Historical Data
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
