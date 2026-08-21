import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useOrders } from "../hooks/useOrders";
import { useTrades } from "../hooks/useTrades";
import { useTransactions } from "../hooks/useTransactions";
import { OrderRow } from "./OrderRow";
import { TradeRow } from "./TradeRow";
import { TransactionRow } from "./TransactionRow";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import renderTableHeaders from "./renderTableHeaders";

const tabs = ["Orders", "Trades", "Transactions"];

export default function PortfolioHistory() {
  const [activeTab, setActiveTab] = useState("Orders");

  const ordersQ = useOrders(activeTab === "Orders");
  const tradesQ = useTrades(activeTab === "Trades");
  const transactionsQ = useTransactions(activeTab === "Transactions");

  const isPending =
    (activeTab === "Orders" && ordersQ.isPending) ||
    (activeTab === "Trades" && tradesQ.isPending) ||
    (activeTab === "Transactions" && transactionsQ.isPending);

  const isError =
    (activeTab === "Orders" && ordersQ.isError) ||
    (activeTab === "Trades" && tradesQ.isError) ||
    (activeTab === "Transactions" && transactionsQ.isError);

  const itemsMap = {
    Orders: ordersQ.data?.data || [],
    Trades: tradesQ.data?.data || [],
    Transactions: transactionsQ.data?.data || [],
  };
  const items = itemsMap[activeTab] || [];

  return (
    <Card>
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-3 lg:w-100">
            {tabs.map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="border rounded-md">
            <Table>
              <TableHeader>{renderTableHeaders(activeTab)}</TableHeader>
              <TableBody>
                {isPending ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Loader2 size={16} className="animate-spin" />
                        <span>Loading {activeTab.toLowerCase()}...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : isError ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-red-500"
                    >
                      Failed to load {activeTab.toLowerCase()}.
                    </TableCell>
                  </TableRow>
                ) : items.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No {activeTab.toLowerCase()} yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((item) => {
                    if (activeTab === "Orders")
                      return <OrderRow key={item._id} order={item} />;
                    if (activeTab === "Trades")
                      return <TradeRow key={item._id} trade={item} />;
                    return <TransactionRow key={item._id} tx={item} />;
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
