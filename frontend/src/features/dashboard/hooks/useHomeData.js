import { useQuery } from "@tanstack/react-query";
import { getHomeData } from "../api/dashboardApi";

export const useHomeData = (market = "US") => {
  return useQuery({
    queryKey: ["homeData", market],
    queryFn: () => getHomeData(market),
  });
};
