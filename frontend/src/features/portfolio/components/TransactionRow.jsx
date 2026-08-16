import { Wallet, ShoppingBag, ArrowLeftRight } from "lucide-react";
import { formatCurrency } from "./formatters";

export function TransactionRow({ tx }) {
  const iconMap = {
    deposit: <Wallet size={18} />,
    buy: <ShoppingBag size={18} />,
    sell: <ArrowLeftRight size={18} />,
  };
  const colorMap = {
    deposit: "text-[#6425FE]",
    buy: "text-green-600",
    sell: "text-red-600",
  };
  const type = (tx.type || "").toLowerCase();

  return (
    <div className="grid grid-cols-4 md:grid-cols-6 gap-4 py-4 items-center border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors px-2 -mx-2 rounded-lg">
      <div className="col-span-2 md:col-span-2 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400">
          {iconMap[type] || <Wallet size={18} />}
        </div>
        <div>
          <div className="font-semibold text-[#333333] capitalize">
            {tx.type}
          </div>
          <div className="text-gray-400 text-xs truncate max-w-[180px]">
            {tx.description || new Date(tx.createdAt).toLocaleString()}
          </div>
        </div>
      </div>

      <div className={`text-right font-medium text-sm capitalize ${colorMap[type] || "text-gray-700"}`}>
        {tx.type}
      </div>

      <div className="text-right hidden md:block text-sm font-medium text-[#333333]">
        {formatCurrency(tx.amount)}
      </div>

      <div className="text-right hidden md:block text-sm text-gray-500">
        {formatCurrency(tx.balanceBefore)}
      </div>

      <div className="text-right flex justify-end">
        <span className="text-sm font-semibold text-[#333333]">
          {formatCurrency(tx.balanceAfter)}
        </span>
      </div>
    </div>
  );
}
