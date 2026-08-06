import { useQuery } from "@tanstack/react-query";
import { getStockChart } from "../api/stockDetailApi";

const useStockChart = (symbol, interval = "1week", outputsize = 30) => {
  return useQuery({
    queryKey: ["stockChart", symbol, interval, outputsize],
    queryFn: () => getStockChart(symbol, interval, outputsize),
    enabled: !!symbol,
  });
};

export default useStockChart;
