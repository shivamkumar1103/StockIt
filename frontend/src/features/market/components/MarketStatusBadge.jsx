import { Badge } from "@/components/ui/badge";

const STATUS_META = {
  live: {
    label: "Live",
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800",
    dot: "bg-emerald-500 animate-pulse",
  },
  connecting: {
    label: "Connecting…",
    className: "bg-muted text-muted-foreground border-border",
    dot: "bg-muted-foreground animate-pulse",
  },
  reconnecting: {
    label: "Reconnecting…",
    className:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
    dot: "bg-amber-500 animate-pulse",
  },
};

const MarketStatusBadge = ({ status, liveCount, lastUpdated }) => {
  const meta = STATUS_META[status] ?? STATUS_META.connecting;
  const updatedLabel = lastUpdated
    ? `Updated ${new Date(lastUpdated).toLocaleTimeString()}`
    : "Waiting for live feed…";

  return (
    <div className="flex flex-col items-end gap-1.5">
      <Badge
        variant="outline"
        className={`flex items-center gap-1.5 ${meta.className}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
        {meta.label}
        {status === "live" && liveCount > 0 ? ` · ${liveCount} symbols` : ""}
      </Badge>
      <span className="text-xs text-muted-foreground">{updatedLabel}</span>
    </div>
  );
};

export default MarketStatusBadge;
