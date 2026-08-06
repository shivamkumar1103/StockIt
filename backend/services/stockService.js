import api from "../utils/stockApi.js";
import TwelveDataApi from "../utils/twelveDataApi.js";

const checkMarket = (market) => {
  if (market === "IN") {
    throw new Error("Indian market is not supported yet");
  }
};

// Quote
export const getQuote = async (symbol, market) => {
  checkMarket(market);

  const { data } = await api.get("/quote", {
    params: {
      symbol: symbol.trim().toUpperCase(),
    },
  });

  return {
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

  const { data } = await api.get("/stock/profile2", {
    params: {
      symbol: symbol.trim().toUpperCase(),
    },
  });

  return data;
};

// Search
export const searchStocks = async (query, market) => {
  checkMarket(market);

  const { data } = await api.get("/search", {
    params: {
      q: query.trim(),
    },
  });

  return data;
};

// Market New
export const getMarketNews = async (
  category = "general",
  market,
  minId = 0,
) => {
  checkMarket(market);

  const { data } = await api.get("/news", {
    params: {
      category,
      minId,
    },
  });

  return data;
};

export const getHistoricalData = async (symbol, interval, market, outputsize = 30) => {
  checkMarket(market);

  const { data } = await TwelveDataApi.get("/time_series", {
    params: {
      symbol: symbol.trim().toUpperCase(),
      interval: interval,
      outputsize: outputsize,
    },
  });

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
