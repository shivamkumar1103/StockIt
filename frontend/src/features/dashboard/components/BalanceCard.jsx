import { ArrowRight, TrendingDown } from "lucide-react";

const BalanceCard = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-8 w-full shadow-sm">
      {/* Top Half */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 justify-between">
        {/* Balance & Invested */}
        <div className="flex flex-col gap-6 flex-1">
          {/* Balance Row */}
          <div>
            <p className="text-[#333333]/60 text-sm font-medium mb-2 pl-2">
              Current Balance
            </p>
            <div className="flex items-center gap-3">
              <div className="bg-linear-to-r from-[#6425FE] to-[#804dfa] text-white font-bold text-2xl lg:text-3xl px-6 py-3 rounded-full shadow-md shadow-[#6425FE]/20">
                $14,032.56
              </div>
              <div className="bg-[#A6F7E2] text-teal-800 font-semibold px-3 py-1.5 rounded-full text-sm">
                +5.63%
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
                $7,532.21
              </div>
              <button className="bg-[#F3F0FA] text-[#6425FE] p-3 rounded-full hover:bg-[#6425FE] hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6425FE] focus:ring-offset-2">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Top Stock */}
        <div className="flex flex-col justify-between flex-1 relative border-l border-gray-100 pl-6 md:pl-12">
          <div>
            <p className="text-[#333333]/60 text-sm font-medium mb-3">
              Top Stock
            </p>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="bg-red-50 text-red-500 p-2 rounded-full">
                  <TrendingDown size={20} />
                </div>
                <div>
                  <h4 className="text-[#333333] font-bold text-lg leading-tight">
                    Tesla Inc
                  </h4>
                  <span className="text-[#333333]/40 text-sm">TSLA</span>
                </div>
              </div>
              <div className="text-red-500 font-semibold bg-red-50 px-3 py-1 rounded-lg text-sm">
                -1.03
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div>
                <span className="text-[#333333]/40 block text-xs mb-0.5">
                  Invested Value
                </span>
                <span className="text-[#333333] font-semibold">$29.34</span>
              </div>
              <div>
                <span className="text-[#333333]/40 block text-xs mb-0.5">
                  Current Value
                </span>
                <span className="text-[#333333] font-semibold">$177.90</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
