import api from "../utils/stockApi.js";
import TwelveDataApi from "../utils/TwelveDataApi.js";

export const fetchQuote = async (symbol) => {
  const { data } = await api.get("/quote", {
    params: { symbol },
  });
  return data;
};

export const fetchCompanyProfile = async (symbol) => {
  const { data } = await api.get("/stock/profile2", {
    params: { symbol },
  });
  return data;
};

export const fetchSearchResults = async (query) => {
  const { data } = await api.get("/search", {
    params: { q: query },
  });
  return data;
};

export const fetchNews = async (category, minId) => {
  const { data } = await api.get("/news", {
    params: { category, minId },
  });
  return data;
};

export const fetchTimeSeries = async (symbol, interval, outputsize) => {
  const { data } = await TwelveDataApi.get("/time_series", {
    params: { symbol, interval, outputsize },
  });
  return data;
};
