import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MarketStockRow from "./MarketStockRow";

const MarketStockTable = ({ stocks }) => {
  if (stocks.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <p className="text-sm font-medium">No stocks found</p>
          <p className="text-xs mt-1">
            Try adjusting your search or filter criteria.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[280px]">Company</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Change</TableHead>
            <TableHead>Change %</TableHead>
            <TableHead>Market Cap</TableHead>
            <TableHead>Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((stock) => (
            <MarketStockRow key={stock.symbol} stock={stock} />
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default MarketStockTable;
