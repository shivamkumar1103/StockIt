import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MarketStockRow from "./MarketStockRow";

const MarketStockTable = ({ stocks, status = "live", isPending }) => {
  const isConnecting =
    (typeof isPending === "boolean" ? isPending : status === "connecting") &&
    stocks.length === 0;

  if (isConnecting) {
    return (
      <Card className="bg-card border-border overflow-hidden">
        <CardContent className="flex flex-col gap-3 py-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
          <p className="text-xs text-muted-foreground text-center mt-2">
            Connecting to live market feed…
          </p>
        </CardContent>
      </Card>
    );
  }

  if (stocks.length === 0) {
    const isLiveState = status === "live" || status === "reconnecting";
    return (
      <Card className="bg-card border-border">
        <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <p className="text-sm font-medium">
            {isLiveState ? "No live stocks right now" : "No stocks found"}
          </p>
          <p className="text-xs mt-1">
            {isLiveState
              ? "Waiting for live prices — try adjusting your search or filter."
              : "Try adjusting your search or filter criteria."}
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
            <TableHead className="w-70">Company</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Change</TableHead>
            <TableHead>Change %</TableHead>
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
