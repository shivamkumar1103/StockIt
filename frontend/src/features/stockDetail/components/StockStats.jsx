import { formatVolume, formatPrice } from "../utils/formatters";
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const StatCard = ({ label, value, icon: Icon }) => (
  <Card className="flex-1 min-w-35 hover:shadow-md transition-shadow">
    <CardContent className="p-4 flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={18} className="text-primary" />
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
      </div>
      <span className="text-xl font-bold text-foreground tracking-tight">
        {value}
      </span>
    </CardContent>
  </Card>
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
