import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";

const bgColors = [
  "bg-indigo-600",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-blue-500",
  "bg-pink-500",
];

const MarketStockRow = ({ stock }) => {
  const price = typeof stock.price === "number" ? stock.price : 0;
  const change = typeof stock.change === "number" ? stock.change : 0;
  const changePercent =
    typeof stock.changePercent === "number" ? stock.changePercent : 0;
  const isPositive = change >= 0;
  const logoBg = bgColors[(stock.symbol.charCodeAt(0) || 0) % bgColors.length];

  // Flash price cell green/red on live ticks
  const prevPriceRef = useRef(price);
  const [flash, setFlash] = useState(null);
  useEffect(() => {
    if (!stock.isLive) return;
    const prev = prevPriceRef.current;
    if (price > prev) {
      setFlash("up");
      const t = setTimeout(() => setFlash(null), 700);
      prevPriceRef.current = price;
      return () => clearTimeout(t);
    }
    if (price < prev) {
      setFlash("down");
      const t = setTimeout(() => setFlash(null), 700);
      prevPriceRef.current = price;
      return () => clearTimeout(t);
    }
    prevPriceRef.current = price;
  }, [price, stock.isLive]);

  const priceClass =
    flash === "up"
      ? "text-emerald-500"
      : flash === "down"
        ? "text-red-500"
        : "text-foreground";

  return (
    <TableRow className="group cursor-pointer transition-colors hover:bg-accent/50">
      <TableCell className="p-0">
        <Link
          to={`/stocks/${stock.symbol}`}
          className="flex items-center gap-3 px-4 py-3 no-underline"
        >
          {/* Avatar */}
          <div
            className={`w-9 h-9 rounded-lg ${logoBg} flex items-center justify-center text-white font-bold text-sm shrink-0`}
          >
            {stock.symbol.charAt(0).toUpperCase()}
          </div>

          {/* Symbol + Name */}
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-foreground text-sm flex items-center gap-1.5">
              {stock.symbol}
              {stock.isLive && (
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
                  title="Live price"
                />
              )}
            </span>
            <span className="text-xs text-muted-foreground truncate max-w-40">
              {stock.name}
            </span>
          </div>
        </Link>
      </TableCell>

      <TableCell className={`font-medium transition-colors ${priceClass}`}>
        ${price.toFixed(2)}
      </TableCell>

      <TableCell>
        <span
          className={`font-medium ${
            isPositive
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {isPositive ? "+" : ""}
          {change.toFixed(2)}
        </span>
      </TableCell>

      <TableCell>
        <Badge
          variant={isPositive ? "outline" : "destructive"}
          className={`flex items-center w-fit px-2 py-0.5 text-xs font-semibold ${
            isPositive
              ? "text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20"
              : "text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20"
          }`}
        >
          {isPositive ? (
            <ArrowUp size={12} className="mr-0.5" />
          ) : (
            <ArrowDown size={12} className="mr-0.5" />
          )}
          {Math.abs(changePercent).toFixed(2)}%
        </Badge>
      </TableCell>
    </TableRow>
  );
};

export default MarketStockRow;
