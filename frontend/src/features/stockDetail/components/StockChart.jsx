import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  formatVolume,
  formatDateLabel,
  formatTooltipDate,
  calculateChartDomain,
  getChartTrend,
} from "../utils/formatters";

const CustomTooltip = ({ active, payload, isIntraday }) => {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  const dateDisplay = formatTooltipDate(data.datetime, isIntraday);

  return (
    <div className="bg-[#1a1a2e] text-white rounded-xl px-4 py-3 shadow-2xl border border-white/10 text-sm min-w-45">
      <p className="font-bold text-white/90 mb-2 text-xs tracking-wider uppercase">
        {dateDisplay}
      </p>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
        <span className="text-white/50">Open</span>
        <span className="font-semibold text-right">
          ${data.open?.toFixed(2)}
        </span>
        <span className="text-white/50">Close</span>
        <span className="font-semibold text-right">
          ${data.close?.toFixed(2)}
        </span>
        <span className="text-white/50">High</span>
        <span className="font-semibold text-right">
          ${data.high?.toFixed(2)}
        </span>
        <span className="text-white/50">Low</span>
        <span className="font-semibold text-right">
          ${data.low?.toFixed(2)}
        </span>
        <span className="text-white/50">Volume</span>
        <span className="font-semibold text-right">
          {formatVolume(data.volume)}
        </span>
      </div>
    </div>
  );
};

const StockChart = ({ values = [], isLoading, isIntraday = false }) => {
  if (isLoading) {
    return (
      <div className="w-full h-80 bg-gray-50 rounded-2xl animate-pulse flex items-center justify-center">
        <span className="text-gray-400 text-sm font-medium">
          Loading chart...
        </span>
      </div>
    );
  }

  if (!values.length) {
    return (
      <div className="w-full h-80 bg-gray-50 rounded-2xl flex items-center justify-center">
        <span className="text-gray-400 text-sm font-medium">
          No chart data available
        </span>
      </div>
    );
  }

  // Reverse so oldest is first (left) and newest is last (right)
  const chartData = [...values].reverse();

  const { strokeColor } = getChartTrend(chartData);
  const [domainMin, domainMax] = calculateChartDomain(chartData);
  const gradientId = "stockChartGradient";

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity={0.3} />
              <stop offset="100%" stopColor={strokeColor} stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#F3F4F6"
            vertical={false}
          />

          <XAxis
            dataKey="datetime"
            tickFormatter={(val) => formatDateLabel(val, isIntraday)}
            tick={{ fontSize: 12, fill: "#9CA3AF", fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            dy={10}
            interval="preserveStartEnd"
            minTickGap={50}
          />

          <YAxis
            domain={[domainMin, domainMax]}
            tickFormatter={(val) => `$${val.toFixed(0)}`}
            tick={{ fontSize: 12, fill: "#9CA3AF", fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            dx={-5}
            width={60}
          />

          <Tooltip
            content={<CustomTooltip isIntraday={isIntraday} />}
            cursor={{
              stroke: "#6425FE",
              strokeWidth: 1,
              strokeDasharray: "4 4",
            }}
          />

          <Area
            type="monotone"
            dataKey="close"
            stroke={strokeColor}
            strokeWidth={2.5}
            fill={`url(#${gradientId})`}
            dot={false}
            activeDot={{
              r: 5,
              fill: strokeColor,
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
