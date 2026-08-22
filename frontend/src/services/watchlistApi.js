import api from "./api";

export const getWatchlist = async () => {
  const response = await api.get("/watchlist");
  return response.data;
};

export const addToWatchlist = async ({ symbol, companyName, exchange }) => {
  const response = await api.post("/watchlist", {
    symbol,
    companyName,
    exchange,
  });
  return response.data;
};

export const removeFromWatchlist = async (symbol) => {
  const response = await api.delete("/watchlist", {
    data: { symbol },
  });
  return response.data;
};
