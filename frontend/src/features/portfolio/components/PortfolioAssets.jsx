import { useRef } from "react";
import { motion } from "framer-motion";
import StockCard from "../../../components/StockCard";

export default function PortfolioAssets({ stocks }) {
  const scrollRef = useRef(null);

  return (
    <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm h-full flex flex-col overflow-hidden">
      <h2 className="text-sm font-medium text-gray-500 mb-6 shrink-0">
        Stock Comparison
      </h2>

      <div className="relative group flex-1 min-h-0">
        <div
          ref={scrollRef}
          className="overflow-hidden w-full h-full cursor-grab active:cursor-grabbing"
        >
          <motion.div
            drag="x"
            dragConstraints={scrollRef}
            dragElastic={0.35}
            className="flex gap-4 h-full"
          >
            {stocks.length === 0 ? (
              <div className="w-full text-center text-gray-400 py-8">
                No stocks in your portfolio yet.
              </div>
            ) : (
              stocks.map((stock) => (
                <StockCard
                  key={stock.symbol}
                  name={stock.symbol}
                  ticker={stock.symbol}
                  value={stock.currentPrice || (stock.currentValue / (stock.quantity || 1)) || 0}
                  averagePrice={stock.averagePrice}
                  quantity={stock.quantity}
                />
              ))
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
