import { Link } from "react-router-dom";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";

const bgColors = [
  "bg-indigo-600",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-blue-500",
  "bg-pink-500",
];

const MarketStockRow = ({ stock }) => {
  const isPositive = stock.change >= 0;
  const logoBg = bgColors[(stock.symbol.charCodeAt(0) || 0) % bgColors.length];

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
            <span className="font-semibold text-foreground text-sm">
              {stock.symbol}
            </span>
            <span className="text-xs text-muted-foreground truncate max-w-40">
              {stock.name}
            </span>
          </div>
        </Link>
      </TableCell>

      <TableCell className="font-medium text-foreground">
        ${stock.price.toFixed(2)}
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
          {stock.change.toFixed(2)}
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
          {Math.abs(stock.changePercent).toFixed(2)}%
        </Badge>
      </TableCell>

      <TableCell className="text-muted-foreground">{stock.marketCap}</TableCell>

      <TableCell className="text-muted-foreground">{stock.volume}</TableCell>
    </TableRow>
  );
};

export default MarketStockRow;
