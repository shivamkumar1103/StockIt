import { ShoppingBag, ArrowLeftRight } from "lucide-react";
import { formatCurrency } from "./formatters";

const statusStyles = {
  pending: "bg-yellow-50 text-yellow-700",
  executed: "bg-green-50 text-green-700",
  cancelled: "bg-gray-100 text-gray-600",
  rejected: "bg-red-50 text-red-700",
  completed: "bg-green-50 text-green-700",
};

export function OrderRow({ order }) {
  const isBuy = order.side === "buy";
  const displayPrice = order.executedPrice ?? order.price ?? 0;

  return (
    <div className="grid grid-cols-4 md:grid-cols-6 gap-4 py-4 items-center border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors px-2 -mx-2 rounded-lg">
      <div className="col-span-2 md:col-span-2 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400">
          {isBuy ? <ShoppingBag size={18} /> : <ArrowLeftRight size={18} />}
        </div>
        <div>
          <div className="font-semibold text-[#333333]">{order.symbol}</div>
          <div className="text-gray-400 text-xs capitalize">
            {order.type} order
          </div>
        </div>
      </div>

      <div
        className={`text-right font-medium text-sm capitalize ${
          isBuy ? "text-green-600" : "text-red-600"
        }`}
      >
        {order.side}
      </div>

      <div className="text-right hidden md:block text-sm font-medium text-[#333333]">
        {displayPrice ? formatCurrency(displayPrice) : "—"}
      </div>

      <div className="text-right hidden md:block text-sm text-gray-500">
        {order.quantity}
      </div>

      <div className="text-right flex justify-end">
        <span
          className={`px-2.5 py-1 text-xs rounded-md font-medium capitalize ${
            statusStyles[order.status] || "bg-gray-100 text-gray-600"
          }`}
        >
          {order.status}
        </span>
      </div>
    </div>
  );
}
