import api from "../../../services/api";

export const searchStocks = async (query, market = "US") => {
  const res = await api.get(`/stocks/search?q=${query}&market=${market}`);
  console.log("searchStocks res", res);
  return res.data;
};
