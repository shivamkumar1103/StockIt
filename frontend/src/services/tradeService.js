import api from "./api";

export const buyStock = async (tradeData) => {
  const response = await api.post("/trade/buy", tradeData);
  return response.data;
};

export const sellStock = async (tradeData) => {
  const response = await api.post("/trade/sell", tradeData);
  return response.data;
};
