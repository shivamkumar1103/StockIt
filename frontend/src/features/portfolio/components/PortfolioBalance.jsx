import { ArrowDown, ArrowUp } from "lucide-react";

export default function PortfolioBalance({ currentValue, totalInvested }) {
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
    <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm h-full flex flex-col">
      <div className="flex flex-col gap-6">
        {/* Portfolio Value Row */}
        <div>
          <p className="text-[#333333]/60 text-sm font-medium mb-2 pl-2">
            Portfolio Value
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-gradient-to-r from-[#6425FE] to-[#804dfa] text-white font-bold text-2xl lg:text-3xl px-6 py-3 rounded-full shadow-md shadow-[#6425FE]/20">
              {formatCurrency(currentValue)}
            </div>
            <div
              className={`font-semibold px-3 py-1.5 rounded-full text-sm ${
                isPositive
                  ? "bg-[#A6F7E2] text-teal-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <div className="flex items-center gap-1">
                {isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                <span>{percentChange.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Invested Row */}
        <div>
          <p className="text-[#333333]/60 text-sm font-medium mb-2 pl-2">
            Invested
          </p>
          <div className="flex items-center gap-4">
            <div className="bg-[#333333] text-white font-semibold text-xl px-5 py-2.5 rounded-full">
              {formatCurrency(totalInvested)}
            </div>
          </div>
        </div>
      </div>
      
      <h3 className="text-sm font-medium text-gray-500 mb-4 mt-8">Where your money is invested</h3>
      
      {/* Progress Bar style distribution (Only Stocks per user request) */}
      <div className="flex h-3 rounded-full overflow-hidden mb-5 gap-1 bg-gray-100">
        <div className="bg-[#6425FE] h-full" style={{ width: "100%" }}></div>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6425FE]"></span>
            <span className="text-gray-600">Stocks</span>
            <span className="text-[#6425FE] bg-[#F3F0FA] px-1.5 rounded text-xs">100%</span>
          </div>
          <span className="text-[#333333]">
            {formatCurrency(currentValue)}
          </span>
        </div>
      </div>
    </div>
  );
}
