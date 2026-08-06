import { useRef } from "react";
import { Link } from "react-router-dom";
import StockCard from "@/components/StockCard";
import { motion } from "framer-motion";

const MyStocks = () => {
  const scrollRef = useRef(null);

  const stocks = [
    {
      id: 1,
      name: "Nvidia",
      ticker: "NVDA",
      change: 6.63,
      value: 203.65,
      color: "purple",
      sparklineData: [50, 52, 51, 55, 54, 58, 62],
    },
    {
      id: 2,
      name: "Meta",
      ticker: "META",
      change: -1.44,
      value: 151.54,
      color: "mint",
      sparklineData: [60, 58, 59, 56, 54, 55, 52],
    },
    {
      id: 3,
      name: "Tesla Inc",
      ticker: "TSLA",
      change: 17.63,
      value: 177.9,
      color: "yellow",
      sparklineData: [40, 45, 42, 50, 48, 55, 60],
    },
    {
      id: 4,
      name: "Apple Inc",
      ticker: "AAPL",
      change: 23.41,
      value: 145.93,
      color: "blue",
      sparklineData: [80, 82, 81, 85, 87, 86, 90],
    },
    {
      id: 5,
      name: "AMD",
      ticker: "AMD",
      change: -3.2,
      value: 75.4,
      color: "purple",
      sparklineData: [30, 28, 29, 25, 26, 22, 20],
    },
    {
      id: 6,
      name: "AMD",
      ticker: "AMD",
      change: -3.2,
      value: 75.4,
      color: "purple",
      sparklineData: [30, 28, 29, 25, 26, 22, 20],
    },
  ];

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
            {stocks.map((stock) => (
              <Link
                key={stock.ticker}
                to={`/stocks/${stock.ticker}`}
                className="snap-start shrink-0 no-underline"
                draggable={false}
              >
                <div key={stock.id} className="snap-start shrink-0">
                  <StockCard {...stock} />
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MyStocks;
