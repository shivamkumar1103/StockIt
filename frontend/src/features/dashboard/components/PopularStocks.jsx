import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PopularStocks = ({ popularStocks = [] }) => {
  const scrollRef = useRef(null);

  return (
    <div className="w-full select-none">
      <h2 className="font-semibold text-lg text-[#333333] mb-4">
        Popular Stocks
      </h2>
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
            {popularStocks.map((stock) => {
              const bgColors = ["bg-[#6425FE]", "bg-[#10B981]", "bg-[#F59E0B]", "bg-[#3B82F6]", "bg-[#EC4899]"];
              const logoBg = bgColors[(stock.symbol?.charCodeAt(0) || 0) % bgColors.length];
              
              return (
              <Link
                key={stock.symbol}
                to={`/stocks/${stock.symbol}`}
                className="snap-start shrink-0 no-underline"
                draggable={false}
              >
                <div className="flex justify-between items-center bg-[#1E1E1E] rounded-2xl p-4 min-w-[280px] border border-gray-800 hover:border-gray-700 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full ${logoBg} flex items-center justify-center text-white font-bold text-xl`}>
                      {stock.symbol?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-bold text-white text-lg tracking-wide uppercase">
                      {stock.symbol}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-white font-medium text-lg">
                      ${stock.currentPrice?.toFixed(2) || "0.00"}
                    </span>
                    <span
                      className={`text-sm font-semibold tracking-wide ${
                        stock.change >= 0 ? "text-[#4ADE80]" : "text-[#F87171]"
                      }`}
                    >
                      {stock.change >= 0 ? "+" : ""}
                      {stock.change}%
                    </span>
                  </div>
                </div>
              </Link>
            )})}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PopularStocks;
