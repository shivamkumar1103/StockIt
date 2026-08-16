import { ArrowUp, ArrowDown } from "lucide-react";

const StockCard = ({ name, ticker, value, change, averagePrice, color }) => {
  const getColors = () => {
    switch (color) {
      case "purple":
        return {
          bg: "bg-[#6425FE]/10",
          iconBg: "bg-[#6425FE]",
          iconText: "text-white",
        };
      case "mint":
        return {
          bg: "bg-[#A6F7E2]/40",
          iconBg: "bg-[#10B981]",
          iconText: "text-white",
        };
      case "yellow":
        return {
          bg: "bg-[#FFE5A5]/40",
          iconBg: "bg-[#F59E0B]",
          iconText: "text-white",
        };
      case "blue":
        return {
          bg: "bg-[#9EC6FA]/40",
          iconBg: "bg-[#3B82F6]",
          iconText: "text-white",
        };
      default:
        return {
          bg: "bg-gray-100",
          iconBg: "bg-gray-400",
          iconText: "text-white",
        };
    }
  };

  const colors = getColors();

  const current = value || 0;

  // Logic for owned stocks
  const isOwned = averagePrice !== undefined && averagePrice !== null;
  const percentChange =
    isOwned && averagePrice > 0
      ? ((current - averagePrice) / averagePrice) * 100
      : 0;

  // Choose which change to display (personal % change if owned, market change otherwise)
  const displayChange = isOwned ? percentChange : change || 0;
  const isPositive = displayChange >= 0;

  return (
    <div
      className={`min-w-55 ${colors.bg} rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-white/20`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full ${colors.iconBg} ${colors.iconText} flex items-center justify-center font-bold text-sm shadow-sm`}
          >
            {name ? name.charAt(0).toUpperCase() : "?"}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 leading-none">
              {ticker}
            </span>
            <span className="text-xs text-gray-500 font-medium mt-1 truncate max-w-25">
              {name}
            </span>
          </div>
        </div>
      </div>

      {isOwned ? (
        <div className="mt-5 flex flex-col gap-3">
          <div className="flex justify-between items-end gap-4">
            <div className="flex flex-col">
              <span className="text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-0.5">
                Avg Buy
              </span>
              <span className="text-md font-bold text-gray-700">
                ${averagePrice.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-0.5">
                Current
              </span>
              <span className="text-xl font-extrabold text-gray-900">
                ${current.toFixed(2)}
              </span>
            </div>
          </div>

          <div
            className={`flex items-center w-fit px-2 py-1 rounded-md text-sm font-bold ${
              isPositive
                ? "text-[#137333] bg-[#E6F4EA]"
                : "text-[#A50E0E] bg-[#FCE8E6]"
            }`}
          >
            {isPositive ? (
              <ArrowUp size={16} strokeWidth={3} className="mr-1" />
            ) : (
              <ArrowDown size={16} strokeWidth={3} className="mr-1" />
            )}
            {isPositive ? "+" : ""}
            {displayChange.toFixed(2)}%
          </div>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-2">
          <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
            ${current.toFixed(2)}
          </span>
          <div
            className={`flex items-center w-fit px-2 py-1 rounded-md text-sm font-bold ${
              isPositive
                ? "text-[#137333] bg-[#E6F4EA]"
                : "text-[#A50E0E] bg-[#FCE8E6]"
            }`}
          >
            {isPositive ? (
              <ArrowUp size={16} strokeWidth={3} className="mr-1" />
            ) : (
              <ArrowDown size={16} strokeWidth={3} className="mr-1" />
            )}
            {isPositive ? "+" : ""}
            {displayChange.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default StockCard;
