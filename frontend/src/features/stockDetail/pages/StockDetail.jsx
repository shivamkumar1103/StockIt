import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useStockChart from "../hooks/useStockChart";
import StockHeader from "../components/StockHeader";
import IntervalTabs from "../components/IntervalTabs";
import StockChart from "../components/StockChart";
import StockStats from "../components/StockStats";
import TradeWidget from "../components/TradeWidget";
import useStockQuote from "../hooks/useStockQuote";
import usePortfolio from "../../dashboard/hooks/usePortfolio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function StockDetail() {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const upperSymbol = symbol?.toUpperCase();

  const [interval, setInterval] = useState("30min");
  const [outputsize, setOutputsize] = useState(65); // Default to 5D
  const [activeLabel, setActiveLabel] = useState("5D");

  const { data: quoteResponse, isPending: isQuoteLoading } =
    useStockQuote(symbol);

  const { data: portfolioResponse } = usePortfolio();
  const holdings = portfolioResponse?.data?.holdings || [];
  const currentHolding = holdings.find((h) => h.symbol.toUpperCase() === upperSymbol);

  const {
    data: chartResponse,
    isPending: isChartLoading,
    isError: isChartError,
  } = useStockChart(upperSymbol, interval, outputsize);

  const chartData = chartResponse?.data || {};
  const meta = chartData.meta || {};
  const values = chartData.values || [];

  const handleIntervalChange = (newInterval, newOutputsize, label) => {
    setInterval(newInterval);
    setOutputsize(newOutputsize);
    setActiveLabel(label);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="w-fit flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group px-0 hover:bg-transparent"
      >
        <ArrowLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="text-sm font-medium">Back</span>
      </Button>

      {/* Stock Header */}
      <StockHeader
        symbol={upperSymbol}
        meta={meta}
        quoteResponse={quoteResponse}
        isQuoteLoading={isQuoteLoading}
        currentHolding={currentHolding}
      />

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Interval Tabs */}
          <IntervalTabs
            activeInterval={activeLabel}
            onIntervalChange={handleIntervalChange}
          />

          {/* Chart */}
          <Card>
            <CardContent className="p-6">
              {isChartError ? (
                <div className="w-full h-80 flex items-center justify-center text-red-500">
                  <span className="text-sm font-medium">
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
            </CardContent>
          </Card>

          {/* Stats */}
          <StockStats values={values} />
        </div>

        {/* Trade Widget */}
        <div className="lg:col-span-1">
          <TradeWidget
            symbol={upperSymbol}
            quoteResponse={quoteResponse}
            isQuoteLoading={isQuoteLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default StockDetail;
