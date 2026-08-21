import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PortfolioAssets({ stocks }) {
  // Format numbers to USD currency
  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(val || 0);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Stock Comparison
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {stocks.length === 0 ? (
          <div className="w-full text-center text-muted-foreground py-8">
            No stocks in your portfolio yet.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Avg Price</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Total Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stocks.map((stock) => {
                const price = stock.currentPrice || (stock.currentValue / (stock.quantity || 1)) || 0;
                return (
                  <TableRow key={stock.symbol}>
                    <TableCell className="font-medium text-foreground">{stock.symbol}</TableCell>
                    <TableCell className="text-right">{formatCurrency(price)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(stock.averagePrice)}</TableCell>
                    <TableCell className="text-right">{stock.quantity}</TableCell>
                    <TableCell className="text-right font-medium text-foreground">
                      {formatCurrency(price * stock.quantity)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
