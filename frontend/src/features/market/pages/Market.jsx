import MarketSummaryCards from "../components/MarketSummaryCards";
import MarketToolbar from "../components/MarketToolbar";
import MarketStockTable from "../components/MarketStockTable";
import MarketStatusBadge from "../components/MarketStatusBadge";
import useMarketData from "../hooks/useMarketData";
import useMarketFilters from "../hooks/useMarketFilters";
import { Separator } from "@/components/ui/separator";

const Market = () => {
  const { allStocks, connectionStatus, lastUpdated, isPending } =
    useMarketData();
  const {
    searchQuery,
    setSearchQuery,
    activeSector,
    setActiveSector,
    filteredStocks,
    topGainer,
    topLoser,
    liveCount,
    sectors,
  } = useMarketFilters(allStocks);

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Market</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Live stocks streaming now across all sectors.
          </p>
        </div>
        <MarketStatusBadge
          status={connectionStatus}
          liveCount={liveCount}
          lastUpdated={lastUpdated}
        />
      </div>

      {connectionStatus === "reconnecting" && (
        <p className="text-xs text-amber-600 dark:text-amber-400 -mt-4">
          Live feed interrupted — showing last live prices while reconnecting.
        </p>
      )}

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
          sectors={sectors}
        />
      </section>

      {/* Stock Table */}
      <section>
        <MarketStockTable
          stocks={filteredStocks}
          status={connectionStatus}
          isPending={isPending}
        />
      </section>
    </div>
  );
};

export default Market;
