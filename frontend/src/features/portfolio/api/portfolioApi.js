import api from "../../../services/api";

export const getWallet = async () => {
  const response = await api.get("/trading/wallet");
  return response.data;
};

export const getOrderHistory = async () => {
  const response = await api.get("/trading/orders");
  return response.data;
};

export const getTradeHistory = async () => {
  const response = await api.get("/trading/trades");
  return response.data;
};

export const getTransactionHistory = async () => {
  const response = await api.get("/trading/transactions");
  return response.data;
};
