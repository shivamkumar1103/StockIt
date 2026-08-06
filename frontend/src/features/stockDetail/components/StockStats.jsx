import { formatVolume, formatPrice } from "../utils/formatters";
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
} from "lucide-react";

const StatCard = ({ label, value, icon: Icon }) => (
  <div className="flex-1 min-w-[140px] bg-gray-50/80 rounded-xl p-4 border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
    <div className="flex items-center gap-2 mb-2">
      <Icon size={18} className="text-[#6425FE]" />
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {label}
      </span>
    </div>
    <span className="text-xl font-bold text-[#333333] tracking-tight">
      {value}
    </span>
  </div>
);

const StockStats = ({ values = [] }) => {
  // Use the most recent data point for OHLV
  const latest = values?.[0];

  const open = latest?.open;
  const high = latest?.high;
  const low = latest?.low;
  const volume = latest?.volume;

  const stats = [
    { label: "Open", value: formatPrice(open), icon: TrendingUp },
    { label: "High", value: formatPrice(high), icon: ArrowUpRight },
    { label: "Low", value: formatPrice(low), icon: ArrowDownRight },
    { label: "Volume", value: formatVolume(volume), icon: BarChart3 },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
};

export default StockStats;
