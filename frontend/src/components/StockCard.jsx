import { ArrowUp, ArrowDown } from "lucide-react";

const StockCard = ({ name, ticker, value, averagePrice, quantity }) => {
  const current = value || 0;

  const percentChange =
    averagePrice > 0 ? ((current - averagePrice) / averagePrice) * 100 : 0;

  const displayChange = percentChange;
  const isPositive = displayChange >= 0;

  const totalReturn = quantity ? (current - averagePrice) * quantity : 0;

  const bgColors = [
    "bg-[#6425FE]",
    "bg-[#10B981]",
    "bg-[#F59E0B]",
    "bg-[#3B82F6]",
    "bg-[#EC4899]",
  ];
  const logoBg = bgColors[(ticker?.charCodeAt(0) || 0) % bgColors.length];

  return (
    <div className="min-w-64 bg-[#1E1E1E] rounded-xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-800">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-full ${logoBg} flex items-center justify-center text-white shadow-sm font-bold text-xl`}
          >
            {ticker?.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 font-medium text-sm leading-tight uppercase">
              {name || ticker}
            </span>
            <span className="font-bold text-white tracking-wide mt-0.5">
              {ticker}
            </span>
          </div>
        </div>
        <div
          className={`flex items-center px-2 py-1 rounded text-sm font-medium ${
            isPositive
              ? "bg-[#137333]/20 text-[#4ADE80]"
              : "bg-[#A50E0E]/20 text-[#F87171]"
          }`}
        >
          {isPositive ? (
            <ArrowUp size={14} strokeWidth={2.5} className="mr-1" />
          ) : (
            <ArrowDown size={14} strokeWidth={2.5} className="mr-1" />
          )}
          {Math.abs(displayChange).toFixed(1)}%
        </div>
      </div>

      <div className="flex flex-col gap-1 mb-4">
        <span className="text-gray-400 text-sm">Current Price</span>
        <span className="text-3xl font-bold text-white tracking-tight">
          ${current.toFixed(2)}
        </span>
      </div>

      <hr className="border-gray-800 my-4" />

      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <span className="text-gray-400 text-sm">Avg Buy Price</span>
          <span className="text-lg font-medium text-white">
            ${averagePrice?.toFixed(2) || "0.00"}
          </span>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <span className="text-gray-400 text-sm">Total Return</span>
          <span
            className={`text-lg font-medium ${
              isPositive ? "text-[#4ADE80]" : "text-[#F87171]"
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
    </div>
  );
};

export default StockCard;
