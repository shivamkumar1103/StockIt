import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const INTERVALS = [
  { label: "1D", interval: "5min", outputsize: 78 }, // ~6.5 market hours × 12 per hour
  { label: "5D", interval: "30min", outputsize: 65 }, // 5 days × 13 per day
  { label: "1M", interval: "1day", outputsize: 22 }, // ~22 trading days
  { label: "6M", interval: "1day", outputsize: 130 }, // ~130 trading days
  { label: "1Y", interval: "1week", outputsize: 52 }, // 52 weeks
];

const IntervalTabs = ({ activeInterval, onIntervalChange }) => {
  return (
    <Tabs value={activeInterval} onValueChange={(val) => {
      const match = INTERVALS.find((i) => i.label === val);
      if (match) onIntervalChange(match.interval, match.outputsize, match.label);
    }}>
      <TabsList className="grid w-full grid-cols-5 md:w-fit">
        {INTERVALS.map(({ label }) => (
          <TabsTrigger key={label} value={label}>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export { INTERVALS };
export default IntervalTabs;
