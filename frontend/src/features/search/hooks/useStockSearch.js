import { searchStocks } from "../api/searchApi";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";

const useStockSearch = (debouncedQuery) => {
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef(null);

  const { data, isPending, error } = useQuery({
    queryKey: ["searchStocks", debouncedQuery],
    queryFn: () => searchStocks(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
  });

  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      // eslint-disable-next-line
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return { data, isPending, error, isOpen, setIsOpen, searchContainerRef };
};

export default useStockSearch;
