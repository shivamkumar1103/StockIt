import { useState } from "react";
import { useBuyStock, useSellStock } from "../hooks/useTrade";

const TradeWidget = ({ symbol, quoteResponse, isQuoteLoading }) => {
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
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Trade {symbol}
      </h3>

      {/* Trade Type Toggle */}
      <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
        <button
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
            tradeType === "buy"
              ? "bg-white text-[#6425FE] shadow-sm"
              : "text-gray-500 hover:text-gray-900"
          }`}
          onClick={() => setTradeType("buy")}
        >
          Buy
        </button>
        <button
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
            tradeType === "sell"
              ? "bg-white text-red-500 shadow-sm"
              : "text-gray-500 hover:text-gray-900"
          }`}
          onClick={() => setTradeType("sell")}
        >
          Sell
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 grow">
        {/* Order Type */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Order Type</span>
          <span className="font-medium text-gray-900">Market Order</span>
        </div>

        {/* Shares Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="quantity" className="text-sm text-gray-500">
            Shares
          </label>
          <div className="relative">
            <input
              id="quantity"
              type="text"
              value={quantity}
              onChange={handleQuantityChange}
              placeholder="0"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-right text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6425FE]/20 focus:border-[#6425FE] transition-all"
            />
          </div>
        </div>

        {/* Current Price */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Market Price</span>
          <span className="font-medium text-gray-900">
            ${currentPrice.toFixed(2)}
          </span>
        </div>

        <hr className="border-gray-100" />

        {/* Estimated Total */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-900">
            Estimated Total
          </span>
          <span className="text-lg font-bold text-gray-900">
            ${estimatedTotal}
          </span>
        </div>

        <div className="mt-auto pt-4">
          <button
            type="submit"
            disabled={isPending || !quantity || parseInt(quantity) <= 0}
            className={`w-full py-3.5 rounded-xl text-white font-medium transition-all ${
              tradeType === "buy"
                ? "bg-[#6425FE] hover:bg-[#6425FE]/90"
                : "bg-red-500 hover:bg-red-600"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isPending
              ? "Processing..."
              : `${tradeType === "buy" ? "Buy" : "Sell"} ${symbol}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TradeWidget;
