import { ShoppingBag, ArrowLeftRight } from "lucide-react";
import { formatCurrency } from "./formatters";

export function TradeRow({ trade }) {
  const isBuy = trade.side === "buy";

  return (
    <div className="grid grid-cols-4 md:grid-cols-6 gap-4 py-4 items-center border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors px-2 -mx-2 rounded-lg">
      <div className="col-span-2 md:col-span-2 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400">
          {isBuy ? <ShoppingBag size={18} /> : <ArrowLeftRight size={18} />}
        </div>
        <div>
          <div className="font-semibold text-[#333333]">{trade.symbol}</div>
          <div className="text-gray-400 text-xs">
            {trade.executedAt
              ? new Date(trade.executedAt).toLocaleString()
              : new Date(trade.createdAt).toLocaleString()}
          </div>
        </div>
      </div>

      <div
        className={`text-right font-medium text-sm capitalize ${
          isBuy ? "text-green-600" : "text-red-600"
        }`}
      >
        {trade.side}
      </div>

      <div className="text-right hidden md:block text-sm font-medium text-[#333333]">
        {formatCurrency(trade.price)}
      </div>

      <div className="text-right hidden md:block text-sm text-gray-500">
        {trade.quantity}
      </div>

      <div className="text-right flex justify-end">
        <span className="text-sm font-semibold text-[#333333]">
          {formatCurrency(trade.totalAmount)}
        </span>
      </div>
    </div>
  );
}
