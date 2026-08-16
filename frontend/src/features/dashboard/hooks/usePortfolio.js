import { useQuery } from "@tanstack/react-query";
import { getPortfolio } from "../api/dashboardApi";

const usePortfolio = () => {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: getPortfolio,
  });
};

export default usePortfolio;
