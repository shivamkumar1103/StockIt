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

const MarketSummaryCards = ({ totalCount, topGainer, topLoser }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Total Stocks */}
      <SummaryCard
        icon={BarChart3}
        label="Total Stocks"
        value={totalCount}
        subtext="Companies listed"
        colorClass="bg-blue-600"
      />

      {/* Top Gainer */}
      <SummaryCard
        icon={TrendingUp}
        label="Top Gainer"
        value={topGainer ? topGainer.symbol : "—"}
        subtext={
          topGainer
            ? `+${topGainer.changePercent.toFixed(2)}% · $${topGainer.price.toFixed(2)}`
            : null
        }
        colorClass="bg-emerald-600"
      />

      {/* Top Loser */}
      <SummaryCard
        icon={TrendingDown}
        label="Top Loser"
        value={topLoser ? topLoser.symbol : "—"}
        subtext={
          topLoser
            ? `${topLoser.changePercent.toFixed(2)}% · $${topLoser.price.toFixed(2)}`
            : null
        }
        colorClass="bg-red-600"
      />
    </div>
  );
};

export default MarketSummaryCards;
