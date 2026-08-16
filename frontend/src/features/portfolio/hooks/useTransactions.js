import { useQuery } from "@tanstack/react-query";
import { getTransactionHistory } from "../api/portfolioApi";

export const useTransactions = (enabled = true) => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactionHistory,
    enabled,
  });
};
