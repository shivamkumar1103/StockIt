import api from "../../../services/api";

export const getNewsByCategory = async (category, market = "US") => {
  const response = await api.get(`/stocks/news?category=${category}&market=${market}`);
  return response.data;
};
