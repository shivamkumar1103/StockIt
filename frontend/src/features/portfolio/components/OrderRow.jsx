import { ShoppingBag, ArrowLeftRight } from "lucide-react";
import { formatCurrency } from "./formatters";
import { TableCell, TableRow } from "@/components/ui/table";

const statusStyles = {
  pending:
    "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400",
  executed:
    "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400",
  cancelled: "bg-muted text-muted-foreground hover:bg-muted",
  rejected:
    "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400",
  completed:
    "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400",
};

export function OrderRow({ order }) {
  const isBuy = order.side === "buy";
  const displayPrice = order.executedPrice ?? order.price ?? 0;

  return (
    <TableRow className="hover:bg-muted/50 transition-colors">
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground shrink-0">
            {isBuy ? <ShoppingBag size={18} /> : <ArrowLeftRight size={18} />}
          </div>
          <div>
            <div className="font-semibold text-foreground">{order.symbol}</div>
            <div className="text-muted-foreground text-xs capitalize">
              {order.type} order
            </div>
          </div>
        </div>
      </TableCell>

      <TableCell
        className={`text-right font-medium text-sm capitalize ${
          isBuy
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-red-600 dark:text-red-400"
        }`}
      >
        {order.side}
      </TableCell>

      <TableCell className="text-right hidden md:table-cell text-sm font-medium text-foreground">
        {displayPrice ? formatCurrency(displayPrice) : "—"}
      </TableCell>

      <TableCell className="text-right hidden md:table-cell text-sm text-muted-foreground">
        {order.quantity}
      </TableCell>

      <TableCell className="text-right">
        <span
          className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold capitalize ${statusStyles[order.status] || "bg-muted text-muted-foreground"}`}
        >
          {order.status}
        </span>
      </TableCell>
    </TableRow>
  );
}
