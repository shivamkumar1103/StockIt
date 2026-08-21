import { ArrowRight, TrendingDown, TrendingUp, Wallet, PieChart, DollarSign, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const BalanceCard = ({ walletBalance, currentValue, totalInvested, bestStock }) => {
  // Format numbers to USD currency
  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(val || 0);

  // Calculate percentage change for portfolio value vs invested
  const profitLossAmount = currentValue - totalInvested;
  const percentChange = totalInvested > 0 ? (profitLossAmount / totalInvested) * 100 : 0;
  
  const isPositive = percentChange >= 0;

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Top Row Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Wallet Balance */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Wallet Balance
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{formatCurrency(walletBalance)}</div>
          </CardContent>
        </Card>

        {/* Portfolio Value */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Portfolio Value
            </CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground flex items-center justify-between">
              {formatCurrency(currentValue)}
            </div>
            <p className={`text-xs mt-1 font-medium ${isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
              {isPositive ? "+" : ""}{percentChange.toFixed(2)}%
            </p>
          </CardContent>
        </Card>

        {/* Total Invested */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Invested
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="text-2xl font-bold text-foreground">{formatCurrency(totalInvested)}</div>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Top Performer */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            Top Performer
          </CardTitle>
        </CardHeader>
        <CardContent>
          {bestStock ? (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${bestStock.unrealizedPnL >= 0 ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"}`}>
                  {bestStock.unrealizedPnL >= 0 ? (
                    <TrendingUp className="h-6 w-6" />
                  ) : (
                    <TrendingDown className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-xl uppercase text-foreground">{bestStock.symbol}</h4>
                  <span className="text-xs text-muted-foreground uppercase">Asset</span>
                </div>
              </div>

              <div className="flex gap-6 items-center">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground uppercase mb-1">Invested</span>
                  <span className="font-medium text-foreground">{formatCurrency(bestStock.investmentValue)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground uppercase mb-1">Current</span>
                  <span className="font-medium text-foreground">{formatCurrency(bestStock.currentValue)}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-muted-foreground uppercase mb-1">P/L</span>
                  <Badge variant={bestStock.unrealizedPnL >= 0 ? "default" : "destructive"} className={bestStock.unrealizedPnL >= 0 ? "bg-emerald-500 hover:bg-emerald-600" : ""}>
                    {bestStock.unrealizedPnL >= 0 ? "+" : ""}{formatCurrency(bestStock.unrealizedPnL)}
                  </Badge>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-6 text-sm text-muted-foreground border-2 border-dashed border-border rounded-lg">
              No holdings
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BalanceCard;
