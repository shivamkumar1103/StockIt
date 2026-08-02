import api from "../../../services/api";

export const getHomeData = async (market = "US") => {
  const response = await api.get(`/stocks/home?market=${market}`);
  return response.data;
};
