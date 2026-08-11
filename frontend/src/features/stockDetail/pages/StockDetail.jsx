import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useStockChart from "../hooks/useStockChart";
import StockHeader from "../components/StockHeader";
import IntervalTabs from "../components/IntervalTabs";
import StockChart from "../components/StockChart";
import StockStats from "../components/StockStats";

function StockDetail() {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const upperSymbol = symbol?.toUpperCase();

  const [interval, setInterval] = useState("1week");
  const [outputsize, setOutputsize] = useState(30);
  const [activeLabel, setActiveLabel] = useState("5D");

  const {
    data: chartResponse,
    isPending: isChartLoading,
    isError: isChartError,
  } = useStockChart(upperSymbol, interval, outputsize);
  console.log("chart", chartResponse);

  const chartData = chartResponse?.data || {};
  const meta = chartData.meta || {};
  const values = chartData.values || [];

  const handleIntervalChange = (newInterval, newOutputsize, label) => {
    setInterval(newInterval);
    setOutputsize(newOutputsize);
    setActiveLabel(label);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-[#6425FE] transition-colors w-fit group cursor-pointer"
      >
        <ArrowLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Stock Header */}
      <StockHeader symbol={upperSymbol} meta={meta} />

      {/* Divider */}
      <hr className="border-gray-100" />

      {/* Interval Tabs */}
      <IntervalTabs
        activeInterval={activeLabel}
        onIntervalChange={handleIntervalChange}
      />

      {/* Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        {isChartError ? (
          <div className="w-full h-80 flex items-center justify-center">
            <span className="text-red-500 text-sm font-medium">
              Failed to load chart data. Please try again.
            </span>
          </div>
        ) : (
          <StockChart
            values={values}
            isLoading={isChartLoading}
            isIntraday={activeLabel === "1D"}
          />
        )}
      </div>

      {/* Stats */}
      <StockStats values={values} />
    </div>
  );
}

export default StockDetail;
