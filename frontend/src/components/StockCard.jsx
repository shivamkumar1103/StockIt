import { ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const StockCard = ({ name, ticker, value, averagePrice, quantity }) => {
  const current = value || 0;

  const percentChange =
    averagePrice > 0 ? ((current - averagePrice) / averagePrice) * 100 : 0;

  const displayChange = percentChange;
  const isPositive = displayChange >= 0;

  const totalReturn = quantity ? (current - averagePrice) * quantity : 0;

  const bgColors = [
    "bg-indigo-600",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-blue-500",
    "bg-pink-500",
  ];
  const logoBg = bgColors[(ticker?.charCodeAt(0) || 0) % bgColors.length];

  return (
    <Card className="min-w-72 cursor-pointer transition-colors hover:bg-accent/50 border-border bg-card">
      <CardHeader className="flex flex-row justify-between items-start pb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg ${logoBg} flex items-center justify-center text-white font-bold text-lg`}
          >
            {ticker?.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs uppercase mb-0.5">
              {name || ticker}
            </span>
            <span className="font-bold text-foreground text-base">
              {ticker}
            </span>
          </div>
        </div>
        <Badge
          variant={isPositive ? "outline" : "destructive"}
          className={`flex items-center px-2 py-1 text-xs font-semibold ${
            isPositive
              ? "text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20"
              : "text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20"
          }`}
        >
          {isPositive ? (
            <ArrowUp size={12} className="mr-1" />
          ) : (
            <ArrowDown size={12} className="mr-1" />
          )}
          {Math.abs(displayChange).toFixed(1)}%
        </Badge>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-1 mb-6">
          <span className="text-muted-foreground text-xs uppercase">
            Current Price
          </span>
          <span className="text-2xl font-bold text-foreground">
            ${current.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground text-[10px] uppercase">
              Avg Buy Price
            </span>
            <span className="text-sm font-semibold text-foreground">
              ${averagePrice?.toFixed(2) || "0.00"}{" "}
              <span className="text-muted-foreground font-normal">
                ({quantity || 0})
              </span>
            </span>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <span className="text-muted-foreground text-[10px] uppercase">
              Total Return
            </span>
            <span
              className={`text-sm font-semibold ${
                isPositive
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {isPositive ? "+" : "-"}$
              {Math.abs(totalReturn).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockCard;
