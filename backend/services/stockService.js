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

  return data;
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

export const getHistoricalData = async (symbol, interval, market) => {
  checkMarket(market);

  const { data } = await TwelveDataApi.get("/time_series", {
    params: {
      symbol: symbol.trim().toUpperCase(),
      interval: interval,
    },
  });

  return data;
};
