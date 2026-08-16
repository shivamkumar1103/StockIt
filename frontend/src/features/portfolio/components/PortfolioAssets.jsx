import { ArrowDown, ArrowUp } from "lucide-react";

export default function PortfolioAssets({ stocks }) {
  return (
    <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm h-full">
      <h2 className="text-sm font-medium text-gray-500 mb-6">Stock Comparison</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {stocks.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-8">
            No stocks in your portfolio yet.
          </div>
        ) : (
          stocks.map((stock) => {
            // Fallback values if API doesn't provide them
            const pnl = stock.unrealizedPnL || 0;
            const value = stock.currentValue || (stock.shares * stock.averagePrice) || 0;
            const isPos = pnl >= 0;
            
            return (
              <div key={stock.symbol} className="bg-gray-50 border border-gray-100 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-[#333333] text-xs">
                      {stock.symbol.substring(0, 2)}
                    </div>
                    <span className="font-semibold text-[#333333]">{stock.symbol}</span>
                  </div>
                  <span className={`text-sm font-medium flex items-center gap-0.5 ${
                    isPos ? "text-green-600" : "text-red-600"
                  }`}>
                    {isPos ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                    ${Math.abs(pnl).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="text-xl font-bold text-[#333333]">
                  ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {stock.shares} shares @ ${stock.averagePrice?.toFixed(2)}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
