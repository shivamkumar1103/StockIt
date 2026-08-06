import api from "../../../services/api";

export const getStockChart = async (symbol, interval, outputsize = 30, market = "US") => {
  const response = await api.get(
    `/stocks/chart/${symbol}?interval=${interval}&outputsize=${outputsize}&market=${market}`,
  );
  return response.data;
};

export const getStockQuote = async (symbol, market = "US") => {
  const response = await api.get(
    `/stocks/quote/${symbol}?market=${market}`,
  );
  return response.data;
};
