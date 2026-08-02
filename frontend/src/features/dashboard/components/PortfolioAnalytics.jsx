import { useState } from "react";
const PortfolioAnalytics = () => {
  const [activeTab, setActiveTab] = useState("1D");
  const tabs = ["1D", "5D", "1M", "6M", "1Y", "5Y", "Max"];

  const yLabels = ["$15,000", "$12,000", "$9,000", "$6,000", "$3,000", "$0"];
  const xLabels = ["10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm"];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 w-full shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-xl font-bold text-[#333333]">
          Portfolio Analytics
        </h2>
        <div className="flex items-center space-x-1 sm:space-x-2 bg-gray-50/50 p-1.5 rounded-xl border border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                activeTab === tab
                  ? "bg-[#6425FE] text-white shadow-md"
                  : "text-gray-500 hover:text-[#6425FE] hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative w-full h-80 flex">
        {/* Main Chart Area */}
        <div className="relative grow h-full pr-4">
          {/* Tooltip */}
          <div className="absolute top-7.5 left-[77%] -translate-x-1/2 flex flex-col items-center z-10 transition-transform hover:scale-105 cursor-pointer">
            <div className="bg-[#6425FE] text-white rounded-xl px-4 py-2.5 text-sm shadow-xl flex flex-col items-center">
              <span className="font-bold tracking-wide">$14,032.56</span>
              <span className="text-[11px] text-white/80 mt-0.5 font-medium tracking-wider">
                Jan 30, 01:12:16 AM
              </span>
            </div>
            {/* Tooltip Triangle */}
            <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-[#6425FE] -mt-px"></div>

            {/* Vertical Reference Line */}
            <div className="w-px h-40 bg-linear-to-b from-[#6425FE]/50 to-transparent mt-1"></div>
          </div>

          <svg
            className="w-full h-full"
            viewBox="0 0 900 300"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="portfolioChartGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#6425FE" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#6425FE" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {yLabels.map((_, i) => {
              const y = i * 50 + 20;
              return (
                <line
                  key={i}
                  x1="0"
                  y1={y}
                  x2="900"
                  y2={y}
                  stroke="#F3F4F6"
                  strokeWidth="1.5"
                />
              );
            })}

            {/* Dashed line for current portfolio value */}
            <line
              x1="0"
              y1="60"
              x2="900"
              y2="60"
              stroke="#6425FE"
              strokeWidth="2"
              strokeDasharray="8 6"
              opacity="0.4"
            />

            {/* Area Fill */}
            <path
              d="M0,170 C100,170 150,190 200,180 C300,160 350,120 450,130 C550,140 600,70 700,60 C800,50 850,60 900,60 L900,270 L0,270 Z"
              fill="url(#portfolioChartGradient)"
            />

            {/* Line Stroke */}
            <path
              d="M0,170 C100,170 150,190 200,180 C300,160 350,120 450,130 C550,140 600,70 700,60 C800,50 850,60 900,60"
              fill="none"
              stroke="#6425FE"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-md"
            />

            {/* Pulsing Dot at current value */}
            <circle
              cx="700"
              cy="60"
              r="6"
              fill="#6425FE"
              stroke="white"
              strokeWidth="2"
              className="animate-pulse"
            />
          </svg>

          {/* X Axis Labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 font-medium translate-y-6">
            {xLabels.map((label, index) => (
              <span key={index}>{label}</span>
            ))}
          </div>
        </div>

        {/* Y Axis Labels */}
        <div className="w-15 h-75 flex flex-col justify-between items-end text-xs text-gray-400 font-medium">
          {yLabels.map((label, index) => (
            <div key={index} className="transform -translate-y-1/2 mt-5">
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioAnalytics;
