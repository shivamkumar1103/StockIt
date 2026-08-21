import SearchItem from "./SearchItem";
import SearchLoader from "./SearchLoader";
import { Card } from "@/components/ui/card";

const SearchDropdown = ({ results, loading, error, onSelect }) => {
  const renderContent = () => {
    if (loading) {
      return <SearchLoader />;
    }

    if (error) {
      return (
        <div className="px-4 py-6 text-center text-sm text-destructive font-medium">
          Failed to fetch results. Please try again.
        </div>
      );
    }

    if (!results?.result || results.result.length === 0) {
      return (
        <div className="px-4 py-6 text-center text-sm text-muted-foreground">
          No results found for your query.
        </div>
      );
    }

    return (
      <ul className="max-h-96 overflow-y-auto py-1">
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
    <Card className="absolute top-full left-0 mt-2 w-full min-w-[320px] shadow-md border-border overflow-hidden z-50">
      {renderContent()}
    </Card>
  );
};

export default SearchDropdown;
