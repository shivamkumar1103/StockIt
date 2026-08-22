import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import StockCard from "@/components/StockCard";
import { motion } from "framer-motion";

const colors = ["blue", "mint", "yellow", "purple"];

const MyStocks = ({ stocks }) => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  if (!stocks || stocks.length === 0) {
    return <div className="text-muted-foreground text-sm">No stocks available.</div>;
  }
  return (
    <div className="w-full select-none">
      <h2 className="font-semibold text-lg text-foreground mb-4">My Stocks</h2>
      <div className="relative group">
        <div
          ref={scrollRef}
          className="overflow-hidden w-full cursor-grab active:cursor-grabbing pb-2"
        >
          <motion.div
            drag="x"
            dragConstraints={scrollRef}
            dragElastic={0.35}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setTimeout(() => setIsDragging(false), 50)}
            className="flex gap-4 w-max pr-6"
          >
            {stocks.map((stock, idx) => (
              <Link
                key={stock.symbol}
                to={`/stocks/${stock.symbol}`}
                state={{ companyName: stock.companyName }}
                className="snap-start shrink-0 no-underline"
                draggable={false}
                onClick={(e) => {
                  if (isDragging) {
                    e.preventDefault();
                  }
                }}
              >
                <StockCard
                  key={stock.symbol}
                  name={stock.companyName || stock.symbol}
                  ticker={stock.symbol}
                  value={stock.currentPrice}
                  quantity={stock.quantity}
                  averagePrice={stock.averagePrice}
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
