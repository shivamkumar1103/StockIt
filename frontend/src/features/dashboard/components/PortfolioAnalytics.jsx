import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PortfolioAnalytics = () => {
  const [activeTab, setActiveTab] = useState("1D");
  const tabs = ["1D", "5D", "1M", "6M", "1Y", "5Y", "Max"];

  const yLabels = ["$15,000", "$12,000", "$9,000", "$6,000", "$3,000", "$0"];
  const xLabels = ["10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm"];

  return (
    <Card className="w-full shadow-sm bg-card border-border">
      {/* Header */}
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6">
        <CardTitle className="text-xl font-bold text-foreground">
          Portfolio Analytics
        </CardTitle>
        <div className="flex items-center space-x-1 sm:space-x-2 bg-muted p-1 rounded-lg border border-border">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab)}
              className={`h-7 px-3 text-xs font-semibold rounded-md transition-all ${
                activeTab !== tab ? "text-muted-foreground hover:text-foreground" : ""
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>
      </CardHeader>

      {/* Chart Container */}
      <CardContent>
        <div className="relative w-full h-80 flex">
          {/* Main Chart Area */}
          <div className="relative grow h-full pr-4">
            {/* Tooltip */}
            <div className="absolute top-7.5 left-[77%] -translate-x-1/2 flex flex-col items-center z-10 transition-transform hover:scale-105 cursor-pointer">
              <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 text-sm shadow-md flex flex-col items-center">
                <span className="font-bold tracking-wide">$14,032.56</span>
                <span className="text-[10px] text-primary-foreground/80 mt-0.5 font-medium tracking-wider">
                  Jan 30, 01:12:16 AM
                </span>
              </div>
              {/* Tooltip Triangle */}
              <div className="w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-t-6 border-t-primary -mt-px"></div>

              {/* Vertical Reference Line */}
              <div className="w-px h-40 bg-gradient-to-b from-primary/50 to-transparent mt-1"></div>
            </div>

            <svg
              className="w-full h-full"
              viewBox="0 0 900 300"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="portfolioChartGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {yLabels.map((_, i) => {
                const y = i * 50 + 20;
                return (
                  <line
                    key={i}
                    x1="0"
                    y1={y}
                    x2="900"
                    y2={y}
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                );
              })}

              {/* Dashed line for current portfolio value */}
              <line
                x1="0"
                y1="60"
                x2="900"
                y2="60"
                stroke="hsl(var(--primary))"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                opacity="0.5"
              />

              {/* Area Fill */}
              <path
                d="M0,170 C100,170 150,190 200,180 C300,160 350,120 450,130 C550,140 600,70 700,60 C800,50 850,60 900,60 L900,270 L0,270 Z"
                fill="url(#portfolioChartGradient)"
              />

              {/* Line Stroke */}
              <path
                d="M0,170 C100,170 150,190 200,180 C300,160 350,120 450,130 C550,140 600,70 700,60 C800,50 850,60 900,60"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Pulsing Dot at current value */}
              <circle
                cx="700"
                cy="60"
                r="5"
                fill="hsl(var(--primary))"
                stroke="hsl(var(--background))"
                strokeWidth="2"
                className="animate-pulse"
              />
            </svg>

            {/* X Axis Labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground font-medium translate-y-6">
              {xLabels.map((label, index) => (
                <span key={index}>{label}</span>
              ))}
            </div>
          </div>

          {/* Y Axis Labels */}
          <div className="w-16 h-75 flex flex-col justify-between items-end text-xs text-muted-foreground font-medium">
            {yLabels.map((label, index) => (
              <div key={index} className="transform -translate-y-1/2 mt-5">
                {label}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioAnalytics;
