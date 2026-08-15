import { useRef } from "react";
import { Link } from "react-router-dom";
import StockCard from "@/components/StockCard";
import { motion } from "framer-motion";
import useMyStocks from "../hooks/useMyStocks";

const colors = ["blue", "mint", "yellow", "purple"];

const MyStocks = () => {
  const scrollRef = useRef(null);
  const { data: myStocks, isPending, isError } = useMyStocks();
  const stocks = myStocks?.data || [];

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading stocks.</div>;
  }
  if (!stocks || stocks.length === 0) {
    return <div>No stocks available.</div>;
  }
  return (
    <div className="w-full select-none">
      <h2 className="font-semibold text-lg text-[#333333] mb-4">My Stocks</h2>
      <div className="relative group">
        <div
          ref={scrollRef}
          className="overflow-hidden w-full cursor-grab active:cursor-grabbing"
        >
          <motion.div
            drag="x"
            dragConstraints={scrollRef}
            dragElastic={0.35}
            className="flex gap-4"
          >
            {stocks.map((stock, idx) => (
              <Link
                key={stock.symbol}
                to={`/stocks/${stock.symbol}`}
                className="snap-start shrink-0 no-underline"
                draggable={false}
              >
                <StockCard
                  name={stock.symbol}
                  ticker={stock.symbol}
                  change={stock.change}
                  value={stock.currentPrice}
                  color={colors[idx % colors.length]}
                />
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MyStocks;
