/*
  Format large volume numbers into human-readable strings.
  e.g. 1500000 → "1.5M", 2300 → "2.3K"
 */
export const formatVolume = (vol) => {
  if (vol == null) return "—";
  if (vol >= 1_000_000_000) return `${(vol / 1_000_000_000).toFixed(2)}B`;
  if (vol >= 1_000_000) return `${(vol / 1_000_000).toFixed(1)}M`;
  if (vol >= 1_000) return `${(vol / 1_000).toFixed(1)}K`;
  return vol.toString();
};

/*
  Format a datetime string for chart axis labels.
  Shows time (e.g. "10:30 AM") for intraday, date (e.g. "Aug 4") otherwise.
*/
export const formatDateLabel = (dateStr, isIntraday) => {
  const d = new Date(dateStr);
  if (isIntraday) {
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

/*
  Format a datetime string for tooltip display.
  Shows time for intraday, full date for other intervals.
*/
export const formatTooltipDate = (dateStr, isIntraday) => {
  const d = new Date(dateStr);
  if (isIntraday) {
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/*
  Calculate the Y-axis domain (min/max) from chart data with padding.
  Returns [min, max] suitable for Recharts YAxis domain.
*/
export const calculateChartDomain = (chartData) => {
  const allLows = chartData.map((d) => d.low);
  const allHighs = chartData.map((d) => d.high);
  const allCloses = chartData.map((d) => d.close);
  const minVal = Math.min(...allLows, ...allCloses);
  const maxVal = Math.max(...allHighs, ...allCloses);
  const padding = (maxVal - minVal) * 0.1;
  return [minVal - padding, maxVal + padding];
};

/*
  Determine the overall trend of chart data.
  Compares first close to last close.
  Returns { isOverallProfit, strokeColor }
*/
export const getChartTrend = (chartData) => {
  const firstClose = chartData[0]?.close;
  const lastClose = chartData[chartData.length - 1]?.close;
  const isOverallProfit = lastClose >= firstClose;
  return {
    isOverallProfit,
    strokeColor: isOverallProfit ? "#22C55E" : "#EF4444",
  };
};

/*
  Format a price value as a dollar string.
  e.g. 305.01 → "$305.01"
*/
export const formatPrice = (val) => {
  if (val == null) return "—";
  return `$${val.toFixed(2)}`;
};
