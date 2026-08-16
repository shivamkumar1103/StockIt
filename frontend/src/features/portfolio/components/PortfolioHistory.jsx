import { ShoppingBag, ArrowLeftRight } from "lucide-react";

export default function PortfolioHistory({ transactions }) {
  return (
    <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
      {/* Tabs */}
      <div className="flex border-b border-gray-100 mb-6 gap-2">
        <button className="px-4 py-3 text-sm text-[#6425FE] border-b-2 border-[#6425FE] font-medium focus:outline-none">
          Orders
        </button>
        <button className="px-4 py-3 text-sm text-gray-500 hover:text-[#333333] focus:outline-none transition-colors">
          Trades
        </button>
        <button className="px-4 py-3 text-sm text-gray-500 hover:text-[#333333] focus:outline-none transition-colors">
          Transactions
        </button>
      </div>

      {/* List Header */}
      <div className="grid grid-cols-4 md:grid-cols-6 gap-4 pb-3 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        <div className="col-span-2 md:col-span-2">Asset</div>
        <div className="text-right">Type</div>
        <div className="text-right hidden md:block">Price</div>
        <div className="text-right hidden md:block">Amount</div>
        <div className="text-right">Status</div>
      </div>

      {/* List Items */}
      <div className="flex flex-col mt-2">
        {transactions.map((tx) => (
          <div key={tx.id} className="grid grid-cols-4 md:grid-cols-6 gap-4 py-4 items-center border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors px-2 -mx-2 rounded-lg cursor-pointer">
            <div className="col-span-2 md:col-span-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400">
                {tx.type === "Buy" ? <ShoppingBag size={18} /> : <ArrowLeftRight size={18} />}
              </div>
              <div>
                <div className="font-semibold text-[#333333]">{tx.symbol}</div>
                <div className="text-gray-400 text-xs">{tx.name}</div>
              </div>
            </div>
            
            <div className={`text-right font-medium text-sm ${
              tx.type === "Buy" ? "text-green-600" : "text-red-600"
            }`}>
              {tx.type}
            </div>
            
            <div className="text-right hidden md:block text-sm font-medium text-[#333333]">
              ${tx.price.toFixed(2)}
            </div>
            
            <div className="text-right hidden md:block text-sm text-gray-500">
              {tx.amount.toFixed(2)}
            </div>
            
            <div className="text-right flex justify-end">
              <span className={`px-2.5 py-1 text-xs rounded-md font-medium ${
                tx.status === "Filled" 
                  ? "bg-green-50 text-green-700" 
                  : "bg-yellow-50 text-yellow-700"
              }`}>
                {tx.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
