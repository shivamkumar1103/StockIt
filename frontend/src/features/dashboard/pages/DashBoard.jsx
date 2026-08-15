import MyStocks from "../components/MyStocks";
import PopularStocks from "../components/PopularStocks";
import BalanceCard from "../components/BalanceCard";
import Watchlist from "../components/Watchlist";
import TrendingNews from "../components/TrendingNews";
import { useHomeData } from "../hooks/useHomeData";

function DashBoard() {
  const { data: homeData, isPending, isError } = useHomeData();

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-full">
        Loading dashboard...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-full text-red-500">
        Failed to load dashboard data.
      </div>
    );
  }

  const data = homeData?.data || {};

  return (
    <div className="flex flex-col gap-8">
      {/* Greeting Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#333333]">Hello Matt,</h1>
        <p className="text-sm text-gray-400 mt-1">
          Welcome back! Here's your portfolio overview.
        </p>
      </div>

      {/* ── My Stocks ─────────────────────────────────── */}
      <section>
        <MyStocks />
      </section>

      {/* Divider */}
      <hr className="border-gray-100" />

      {/* ── Popular Stocks ────────────────────────────── */}
      <section>
        <PopularStocks popularStocks={data.popular} />
      </section>

      {/* Divider */}
      <hr className="border-gray-100" />

      {/* ── Balance + Watchlist side-by-side ───────────── */}
      <section className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-[60%] w-full">
          <BalanceCard />
        </div>
        <div className="lg:w-[40%] w-full">
          <Watchlist />
        </div>
      </section>

      {/* Divider */}
      <hr className="border-gray-100" />

      {/* ── Trending News ─────────────────────────────── */}
      <section>
        <TrendingNews news={data.news} />
      </section>
    </div>
  );
}

export default DashBoard;
