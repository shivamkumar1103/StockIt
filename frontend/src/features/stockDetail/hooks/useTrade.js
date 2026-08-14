import { useMutation, useQueryClient } from "@tanstack/react-query";
import { buyStock, sellStock } from "../../../services/tradeService";
import toast from "react-hot-toast";

export const useBuyStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tradeData) => buyStock(tradeData),
    onSuccess: (data) => {
      toast.success(data.message || "Stock purchased successfully!");
      // Invalidate queries that might be affected by the trade
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to buy stock. Please try again."
      );
    },
  });
};

export const useSellStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tradeData) => sellStock(tradeData),
    onSuccess: (data) => {
      toast.success(data.message || "Stock sold successfully!");
      // Invalidate queries that might be affected by the trade
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to sell stock. Please try again."
      );
    },
  });
};
