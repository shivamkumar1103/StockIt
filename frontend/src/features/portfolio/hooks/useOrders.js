import { useQuery } from "@tanstack/react-query";
import { getOrderHistory } from "../api/portfolioApi";

export const useOrders = (enabled = true) => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrderHistory,
    enabled,
  });
};
