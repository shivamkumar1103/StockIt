import MarketSummaryCards from "../components/MarketSummaryCards";
import MarketToolbar from "../components/MarketToolbar";
import MarketStockTable from "../components/MarketStockTable";
import useMarketFilters from "../hooks/useMarketFilters";
import { Separator } from "@/components/ui/separator";

const Market = () => {
  const {
    searchQuery,
    setSearchQuery,
    activeSector,
    setActiveSector,
    filteredStocks,
    topGainer,
    topLoser,
  } = useMarketFilters();

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Market</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Browse and explore 50 popular stocks across all sectors.
        </p>
      </div>

      {/* Summary Cards */}
      <section>
        <MarketSummaryCards
          totalCount={filteredStocks.length}
          topGainer={topGainer}
          topLoser={topLoser}
        />
      </section>

      <Separator />

      {/* Toolbar — Search + Sector Tabs */}
      <section>
        <MarketToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeSector={activeSector}
          onSectorChange={setActiveSector}
        />
      </section>

      {/* Stock Table */}
      <section>
        <MarketStockTable stocks={filteredStocks} />
      </section>
    </div>
  );
};

export default Market;
