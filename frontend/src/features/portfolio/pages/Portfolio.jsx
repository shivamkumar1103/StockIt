import usePortfolio from "../../dashboard/hooks/usePortfolio";
import PortfolioBalance from "../components/PortfolioBalance";
import PortfolioAssets from "../components/PortfolioAssets";
import PortfolioHistory from "../components/PortfolioHistory";

export default function Portfolio() {
  const { data: portfolioData, isPending, isError } = usePortfolio();

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-full">
        Loading portfolio...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-full text-red-500">
        Failed to load portfolio data.
      </div>
    );
  }

  const portfolio = portfolioData?.data || {};
  const stocks = portfolio.holdings || [];
  const currentValue = portfolio.currentValue || 0;
  const totalInvested = portfolio.totalInvestment || 0;
  const walletBalance = portfolio.walletBalance ?? 0;

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-[#333333]">Portfolio</h1>
        <p className="text-sm text-gray-400 mt-1">
          Detailed breakdown of your assets and history.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Balance Section */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <PortfolioBalance
            currentValue={currentValue}
            totalInvested={totalInvested}
            walletBalance={walletBalance}
          />
        </div>

        {/* My Assets Section */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <PortfolioAssets stocks={stocks} />
        </div>

        {/* History Section */}
        <div className="lg:col-span-12">
          <PortfolioHistory />
        </div>
      </div>
    </div>
  );
}
