import SearchItem from "./SearchItem";
import SearchLoader from "./SearchLoader";

const SearchDropdown = ({ results, loading, error, onSelect }) => {
  const renderContent = () => {
    if (loading) {
      return <SearchLoader />;
    }

    if (error) {
      return (
        <div className="px-4 py-6 text-center text-sm text-red-500 font-medium">
          Failed to fetch results. Please try again.
        </div>
      );
    }

    if (!results?.result || results.result.length === 0) {
      return (
        <div className="px-4 py-6 text-center text-sm text-gray-500">
          No results found for your query.
        </div>
      );
    }

    return (
      <ul className="max-h-100 overflow-y-auto">
        {results.result.map((stock) => (
          <SearchItem
            key={stock.symbol}
            ticker={stock.displaySymbol}
            companyName={stock.description}
            type={stock.type}
            onSelect={() => onSelect(stock)}
          />
        ))}
      </ul>
    );
  };

  return (
    <div className="absolute top-full left-0 mt-2 w-95 bg-white rounded-xl shadow-xl border border-gray-200/60 overflow-hidden z-50">
      {renderContent()}
    </div>
  );
};

export default SearchDropdown;
