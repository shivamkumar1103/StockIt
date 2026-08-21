import { ShoppingBag, ArrowLeftRight } from "lucide-react";
import { formatCurrency } from "./formatters";
import { TableCell, TableRow } from "@/components/ui/table";

export function TradeRow({ trade }) {
  const isBuy = trade.side === "buy";

  return (
    <TableRow className="hover:bg-muted/50 transition-colors">
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground shrink-0">
            {isBuy ? <ShoppingBag size={18} /> : <ArrowLeftRight size={18} />}
          </div>
          <div>
            <div className="font-semibold text-foreground">{trade.symbol}</div>
            <div className="text-muted-foreground text-xs">
              {trade.executedAt
                ? new Date(trade.executedAt).toLocaleString()
                : new Date(trade.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      </TableCell>

      <TableCell className={`text-right font-medium text-sm capitalize ${
        isBuy ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
      }`}>
        {trade.side}
      </TableCell>

      <TableCell className="text-right hidden md:table-cell text-sm font-medium text-foreground">
        {formatCurrency(trade.price)}
      </TableCell>

      <TableCell className="text-right hidden md:table-cell text-sm text-muted-foreground">
        {trade.quantity}
      </TableCell>

      <TableCell className="text-right text-sm font-semibold text-foreground">
        {formatCurrency(trade.totalAmount)}
      </TableCell>
    </TableRow>
  );
}
