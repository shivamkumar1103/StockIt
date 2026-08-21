import MyStocks from "../components/MyStocks";
import PopularStocks from "../components/PopularStocks";
import BalanceCard from "../components/BalanceCard";
import Watchlist from "../components/Watchlist";
import TrendingNews from "../components/TrendingNews";
import { useHomeData } from "../hooks/useHomeData";
import usePortfolio from "../hooks/usePortfolio";
import useUser from "../../../hooks/useAuth";
import { Separator } from "@/components/ui/separator";

function DashBoard() {
  const {
    data: homeData,
    isPending: isHomePending,
    isError: isHomeError,
  } = useHomeData();
  const {
    data: portfolioData,
    isPending: isPortfolioPending,
    isError: isPortfolioError,
  } = usePortfolio();
  const { user } = useUser();
  const name = user.data?.name || "User";

  if (isHomePending || isPortfolioPending) {
    return (
      <div className="flex justify-center items-center h-full text-muted-foreground">
        Loading dashboard...
      </div>
    );
  }

  if (isHomeError || isPortfolioError) {
    return (
      <div className="flex justify-center items-center h-full text-red-600 dark:text-red-400">
        Failed to load dashboard data.
      </div>
    );
  }

  const data = homeData?.data || {};
  const portfolio = portfolioData?.data || {};
  const stocks = portfolio.holdings || [];

  const totalInvested = portfolio.totalInvestment || 0;

  // Find best stock based on unrealizedPnL
  let bestStock = null;
  if (stocks.length > 0) {
    bestStock = stocks.reduce((prev, current) => {
      return prev.unrealizedPnL > current.unrealizedPnL ? prev : current;
    });
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Greeting Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Hello {name},</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back! Here's your portfolio overview.
        </p>
      </div>

      {/* ── Popular Stocks ────────────────────────────── */}
      <section>
        <PopularStocks popularStocks={data.popular} />
      </section>

      {/* Divider */}
      <Separator />

      {/* ── My Stocks ─────────────────────────────────── */}
      <section>
        <MyStocks stocks={stocks} />
      </section>

      {/* Divider */}
      <Separator />

      {/* ── Balance + Watchlist side-by-side ───────────── */}
      <section className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-[60%] w-full">
          <BalanceCard
            walletBalance={portfolio.walletBalance || 0}
            currentValue={portfolio.currentValue || 0}
            totalInvested={totalInvested}
            bestStock={bestStock}
          />
        </div>
        <div className="lg:w-[40%] w-full">
          <Watchlist />
        </div>
      </section>

      {/* Divider */}
      <Separator />

      {/* ── Trending News ─────────────────────────────── */}
      <section>
        <TrendingNews news={data.news} />
      </section>
    </div>
  );
}

export default DashBoard;
