import { ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function PortfolioBalance({
  currentValue,
  totalInvested,
  walletBalance,
}) {
  // Format numbers to USD currency
  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(val || 0);

  // Calculate percentage change for portfolio value vs invested
  const profitLossAmount = currentValue - totalInvested;
  const percentChange =
    totalInvested > 0 ? (profitLossAmount / totalInvested) * 100 : 0;

  const isPositive = percentChange >= 0;

  return (
    <Card className="h-full flex flex-col justify-center">
      <CardContent className="p-6 flex flex-col gap-6">
        {/* Wallet Balance Row */}
        <div className="flex justify-between items-center bg-muted p-4 rounded-xl border border-border">
          <p className="text-muted-foreground font-medium">Wallet Balance</p>
          <div className="text-foreground font-bold text-xl">
            {formatCurrency(walletBalance)}
          </div>
        </div>

        {/* Portfolio Value Row */}
        <div>
          <p className="text-muted-foreground text-sm font-medium mb-2 pl-2">
            Portfolio Value
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-primary text-primary-foreground font-bold text-2xl lg:text-3xl px-6 py-3 rounded-full shadow-sm">
              {formatCurrency(currentValue)}
            </div>
            <div
              className={`font-semibold px-3 py-1.5 rounded-full text-sm flex items-center gap-1 ${
                isPositive
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
              }`}
            >
              {isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
              <span>{percentChange.toFixed(2)}%</span>
            </div>
          </div>
        </div>

        {/* Invested Row */}
        <div>
          <p className="text-muted-foreground text-sm font-medium mb-2 pl-2">
            Invested
          </p>
          <div className="flex items-center gap-4">
            <div className="bg-secondary text-secondary-foreground font-semibold text-xl px-5 py-2.5 rounded-full">
              {formatCurrency(totalInvested)}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-4">
            Where your money is invested
          </h3>

          <Progress value={100} className="h-3 mb-5" />

          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                <span className="text-muted-foreground">Stocks</span>
                <span className="text-primary bg-primary/10 px-1.5 rounded text-xs">
                  100%
                </span>
              </div>
              <span className="text-foreground">{formatCurrency(currentValue)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
