import { BarChart3, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SummaryCard = ({ icon: Icon, label, value, subtext, colorClass }) => (
  <Card className="bg-card border-border">
    <CardContent className="flex items-center gap-4 py-1">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}
      >
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-xs text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
        <span className="text-lg font-bold text-foreground truncate">
          {value}
        </span>
        {subtext && (
          <span className="text-xs text-muted-foreground truncate">
            {subtext}
          </span>
        )}
      </div>
    </CardContent>
  </Card>
);

const formatCardSubtext = (stock, { signed = false } = {}) => {
  if (!stock) return null;
  const changePercent =
    typeof stock.changePercent === "number" ? stock.changePercent : 0;
  const price = typeof stock.price === "number" ? stock.price : 0;
  const sign = signed && changePercent >= 0 ? "+" : "";
  return `${sign}${changePercent.toFixed(2)}% · $${price.toFixed(2)}${stock.isLive ? " · Live" : ""}`;
};

const MarketSummaryCards = ({ totalCount, topGainer, topLoser }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Live Stocks */}
      <SummaryCard
        icon={BarChart3}
        label="Live Stocks"
        value={totalCount}
        subtext="Streaming now"
        colorClass="bg-blue-600"
      />

      {/* Top Gainer */}
      <SummaryCard
        icon={TrendingUp}
        label="Top Gainer"
        value={topGainer ? topGainer.symbol : "—"}
        subtext={formatCardSubtext(topGainer, { signed: true })}
        colorClass="bg-emerald-600"
      />

      {/* Top Loser */}
      <SummaryCard
        icon={TrendingDown}
        label="Top Loser"
        value={topLoser ? topLoser.symbol : "—"}
        subtext={formatCardSubtext(topLoser)}
        colorClass="bg-red-600"
      />
    </div>
  );
};

export default MarketSummaryCards;
