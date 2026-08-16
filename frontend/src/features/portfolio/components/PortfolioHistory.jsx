import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useOrders } from "../hooks/useOrders";
import { useTrades } from "../hooks/useTrades";
import { useTransactions } from "../hooks/useTransactions";
import { OrderRow } from "./OrderRow";
import { TradeRow } from "./TradeRow";
import { TransactionRow } from "./TransactionRow";

const tabs = ["Orders", "Trades", "Transactions"];

// ── Main Component ──────────────────────────────────────────────────
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

  // Headers are tab-specific so they match what's actually shown
  const headers = {
    Orders: ["Asset", "Side", "Price", "Quantity", "Status"],
    Trades: ["Asset", "Side", "Price", "Quantity", "Total"],
    Transactions: ["Type", "Kind", "Amount", "Before", "After"],
  };

  return (
    <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
      {/* Tabs */}
      <div className="flex border-b border-gray-100 mb-6 gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium focus:outline-none transition-colors border-b-2 ${
              activeTab === tab
                ? "text-[#6425FE] border-[#6425FE]"
                : "text-gray-500 border-transparent hover:text-[#333333]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List Header */}
      <div className="grid grid-cols-4 md:grid-cols-6 gap-4 pb-3 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        <div className="col-span-2 md:col-span-2">{headers[activeTab][0]}</div>
        <div className="text-right">{headers[activeTab][1]}</div>
        <div className="text-right hidden md:block">{headers[activeTab][2]}</div>
        <div className="text-right hidden md:block">{headers[activeTab][3]}</div>
        <div className="text-right">{headers[activeTab][4]}</div>
      </div>

      {/* List Items */}
      <div className="flex flex-col mt-2">
        {isPending ? (
          <div className="flex items-center justify-center gap-2 text-gray-400 py-8">
            <Loader2 size={16} className="animate-spin" />
            <span>Loading {activeTab.toLowerCase()}...</span>
          </div>
        ) : isError ? (
          <div className="text-center text-red-500 py-8">
            Failed to load {activeTab.toLowerCase()}.
          </div>
        ) : items.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            No {activeTab.toLowerCase()} yet.
          </div>
        ) : (
          items.map((item) => {
            if (activeTab === "Orders") return <OrderRow key={item._id} order={item} />;
            if (activeTab === "Trades") return <TradeRow key={item._id} trade={item} />;
            return <TransactionRow key={item._id} tx={item} />;
          })
        )}
      </div>
    </div>
  );
}
