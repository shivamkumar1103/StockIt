import { useQuery } from "@tanstack/react-query";
import { getMyStocks } from "../api/dashboardApi";

const useMyStocks = () => {
  return useQuery({
    queryKey: ["myStocks"],
    queryFn: getMyStocks,
  });
};

export default useMyStocks;
