import { Wallet, ShoppingBag, ArrowLeftRight } from "lucide-react";
import { formatCurrency } from "./formatters";
import { TableCell, TableRow } from "@/components/ui/table";

export function TransactionRow({ tx }) {
  const iconMap = {
    deposit: <Wallet size={18} />,
    buy: <ShoppingBag size={18} />,
    sell: <ArrowLeftRight size={18} />,
  };
  const colorMap = {
    deposit: "text-primary",
    buy: "text-emerald-600 dark:text-emerald-400",
    sell: "text-red-600 dark:text-red-400",
  };
  const type = (tx.type || "").toLowerCase();

  return (
    <TableRow className="hover:bg-muted/50 transition-colors">
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground shrink-0">
            {iconMap[type] || <Wallet size={18} />}
          </div>
          <div>
            <div className="font-semibold text-foreground capitalize">
              {tx.type}
            </div>
            <div className="text-muted-foreground text-xs truncate max-w-45">
              {tx.description || new Date(tx.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      </TableCell>

      <TableCell
        className={`text-right font-medium text-sm capitalize ${colorMap[type] || "text-muted-foreground"}`}
      >
        {tx.type}
      </TableCell>

      <TableCell className="text-right hidden md:table-cell text-sm font-medium text-foreground">
        {formatCurrency(tx.amount)}
      </TableCell>

      <TableCell className="text-right hidden md:table-cell text-sm text-muted-foreground">
        {formatCurrency(tx.balanceBefore)}
      </TableCell>

      <TableCell className="text-right text-sm font-semibold text-foreground">
        {formatCurrency(tx.balanceAfter)}
      </TableCell>
    </TableRow>
  );
}
