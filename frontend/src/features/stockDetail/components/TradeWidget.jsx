import { useState } from "react";
import { useBuyStock, useSellStock } from "../hooks/useTrade";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const TradeWidget = ({ symbol, companyName, quoteResponse, isQuoteLoading }) => {
  const currentPrice = quoteResponse?.data?.currentPrice || 0;

  const [tradeType, setTradeType] = useState("buy"); // 'buy' or 'sell'
  const [quantity, setQuantity] = useState("");

  const { mutate: buyStock, isPending: isBuying } = useBuyStock();
  const { mutate: sellStock, isPending: isSelling } = useSellStock();

  const handleQuantityChange = (e) => {
    const val = e.target.value;
    // Only allow positive integers
    if (val === "" || /^[1-9]\d*$/.test(val)) {
      setQuantity(val);
    }
  };

  const estimatedTotal = (parseInt(quantity || 0) * currentPrice).toFixed(2);
  const isPending = isBuying || isSelling || isQuoteLoading;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quantity || parseInt(quantity) <= 0) return;

    const tradeData = {
      symbol,
      companyName,
      quantity: parseInt(quantity),
      price: currentPrice,
    };

    if (tradeType === "buy") {
      buyStock(tradeData, {
        onSuccess: () => setQuantity(""),
      });
    } else {
      sellStock(tradeData, {
        onSuccess: () => setQuantity(""),
      });
    }
  };

  return (
    <Card className="flex flex-col h-full shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Trade {symbol}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col grow">
        <Tabs value={tradeType} onValueChange={setTradeType} className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy">Buy</TabsTrigger>
            <TabsTrigger value="sell">Sell</TabsTrigger>
          </TabsList>
        </Tabs>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 grow">
          {/* Order Type */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Order Type</span>
            <span className="font-medium text-foreground">Market Order</span>
          </div>

          {/* Shares Input */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="quantity" className="text-muted-foreground">
              Shares
            </Label>
            <Input
              id="quantity"
              type="text"
              value={quantity}
              onChange={handleQuantityChange}
              placeholder="0"
              className="text-right text-lg font-medium"
            />
          </div>

          {/* Current Price */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Market Price</span>
            <span className="font-medium text-foreground">
              ${currentPrice.toFixed(2)}
            </span>
          </div>

          <Separator />

          {/* Estimated Total */}
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Estimated Total
            </span>
            <span className="text-xl font-bold text-foreground">
              ${estimatedTotal}
            </span>
          </div>

          <div className="mt-auto pt-6">
            <Button
              type="submit"
              disabled={isPending || !quantity || parseInt(quantity) <= 0}
              className={`w-full py-6 text-lg font-bold transition-all ${
                tradeType === "buy"
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                  : "bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-800"
              }`}
            >
              {isPending
                ? "Processing..."
                : `${tradeType === "buy" ? "Buy" : "Sell"} ${symbol}`}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TradeWidget;
