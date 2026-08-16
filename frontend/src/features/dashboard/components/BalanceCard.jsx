import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react";

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
    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-8 w-full shadow-sm">
      {/* Top Half */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 justify-between">
        {/* Balances & Invested */}
        <div className="flex flex-col gap-4 flex-1">
          {/* Wallet Balance Row */}
          <div className="flex justify-between items-center bg-[#F8F9FA] p-4 rounded-xl border border-gray-100">
            <p className="text-[#333333]/70 font-medium">Wallet Balance</p>
            <div className="text-[#333333] font-bold text-xl">
              {formatCurrency(walletBalance)}
            </div>
          </div>

          {/* Portfolio Value Row */}
          <div>
            <p className="text-[#333333]/60 text-sm font-medium mb-2 pl-2">
              Portfolio Value
            </p>
            <div className="flex items-center gap-3">
              <div className="bg-linear-to-r from-[#6425FE] to-[#804dfa] text-white font-bold text-2xl lg:text-3xl px-6 py-3 rounded-full shadow-md shadow-[#6425FE]/20">
                {formatCurrency(currentValue)}
              </div>
              <div
                className={`font-semibold px-3 py-1.5 rounded-full text-sm ${
                  isPositive
                    ? "bg-[#A6F7E2] text-teal-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {isPositive ? "+" : ""}
                {percentChange.toFixed(2)}%
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
              <button className="bg-[#F3F0FA] text-[#6425FE] p-3 rounded-full hover:bg-[#6425FE] hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6425FE] focus:ring-offset-2">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Top Stock */}
        <div className="flex flex-col justify-between flex-1 relative border-l border-gray-100 pl-6 md:pl-12">
          {bestStock ? (
            <div>
              <p className="text-[#333333]/60 text-sm font-medium mb-3">
                Top Stock
              </p>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      bestStock.unrealizedPnL >= 0
                        ? "bg-green-50 text-green-500"
                        : "bg-red-50 text-red-500"
                    }`}
                  >
                    {bestStock.unrealizedPnL >= 0 ? (
                      <TrendingUp size={20} />
                    ) : (
                      <TrendingDown size={20} />
                    )}
                  </div>
                  <div>
                    <h4 className="text-[#333333] font-bold text-lg leading-tight uppercase">
                      {bestStock.symbol}
                    </h4>
                    <span className="text-[#333333]/40 text-sm uppercase">
                      {bestStock.symbol}
                    </span>
                  </div>
                </div>
                <div
                  className={`font-semibold px-3 py-1 rounded-lg text-sm ${
                    bestStock.unrealizedPnL >= 0
                      ? "text-green-600 bg-green-50"
                      : "text-red-500 bg-red-50"
                  }`}
                >
                  {bestStock.unrealizedPnL >= 0 ? "+" : ""}
                  {formatCurrency(bestStock.unrealizedPnL)}
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div>
                  <span className="text-[#333333]/40 block text-xs mb-0.5">
                    Invested Value
                  </span>
                  <span className="text-[#333333] font-semibold">
                    {formatCurrency(bestStock.investmentValue)}
                  </span>
                </div>
                <div>
                  <span className="text-[#333333]/40 block text-xs mb-0.5">
                    Current Value
                  </span>
                  <span className="text-[#333333] font-semibold">
                    {formatCurrency(bestStock.currentValue)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-[#333333]/40">
              <p>No stocks in portfolio</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
