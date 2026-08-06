const INTERVALS = [
  { label: "1D", interval: "5min", outputsize: 78 }, // ~6.5 market hours × 12 per hour
  { label: "5D", interval: "30min", outputsize: 65 }, // 5 days × 13 per day
  { label: "1M", interval: "1day", outputsize: 22 }, // ~22 trading days
  { label: "6M", interval: "1day", outputsize: 130 }, // ~130 trading days
  { label: "1Y", interval: "1week", outputsize: 52 }, // 52 weeks
];

const IntervalTabs = ({ activeInterval, onIntervalChange }) => {
  return (
    <div className="flex items-center gap-1 bg-gray-50/80 p-1.5 rounded-xl border border-gray-100 w-fit">
      {INTERVALS.map(({ label, interval, outputsize }) => (
        <button
          key={label}
          onClick={() => onIntervalChange(interval, outputsize, label)}
          className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
            activeInterval === label
              ? "bg-[#6425FE] text-white shadow-md"
              : "text-gray-500 hover:text-[#6425FE] hover:bg-gray-100"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export { INTERVALS };
export default IntervalTabs;
