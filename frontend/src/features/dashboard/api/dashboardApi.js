import api from "../../../services/api";

export const getHomeData = async (market = "US") => {
  const response = await api.get(`/stocks/home?market=${market}`);
  return response.data;
};

export const getPortfolio = async () => {
  const response = await api.get("/trading/portfolio");
  return response.data;
};
