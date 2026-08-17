import { useQuery } from "@tanstack/react-query";
import { getNewsByCategory } from "../api/newsApi";

export const useNewsData = (category, market = "US") => {
  return useQuery({
    queryKey: ["news", category, market],
    queryFn: () => getNewsByCategory(category, market),
  });
};
