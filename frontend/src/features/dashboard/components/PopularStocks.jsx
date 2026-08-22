import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const PopularStocks = ({ popularStocks = [] }) => {
  return (
    <div className="w-full select-none">
      <h2 className="font-semibold text-lg text-foreground mb-4">
        Popular Stocks
      </h2>
      <div className="relative group">
        <div className="overflow-hidden w-full pb-2 flex">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
            className="flex w-max"
          >
            {[0, 1].map((groupIndex) => (
              <div key={groupIndex} className="flex gap-4 pr-4">
                {popularStocks.map((stock) => {
                  const bgColors = [
                    "bg-blue-600",
                    "bg-emerald-500",
                    "bg-amber-500",
                    "bg-indigo-500",
                    "bg-pink-500",
                  ];
                  const logoBg =
                    bgColors[(stock.symbol?.charCodeAt(0) || 0) % bgColors.length];

                  return (
                    <Link
                      key={`${stock.symbol}-${groupIndex}`}
                      to={`/stocks/${stock.symbol}`}
                      className="snap-start shrink-0 no-underline"
                      draggable={false}
                    >
                      <Card className="flex justify-between items-center bg-card border-border rounded-lg p-4 min-w-72 transition-colors hover:bg-accent/50">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-10 h-10 rounded-full ${logoBg} flex items-center justify-center text-white font-bold text-lg`}
                          >
                            {stock.symbol?.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-bold text-foreground text-base tracking-wide uppercase">
                            {stock.symbol}
                          </span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-foreground font-medium text-base">
                            ${stock.currentPrice?.toFixed(2) || "0.00"}
                          </span>
                          <span
                            className={`text-sm font-semibold tracking-wide ${
                              stock.change >= 0
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {stock.change >= 0 ? "+" : ""}
                            {stock.change}
                          </span>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PopularStocks;
