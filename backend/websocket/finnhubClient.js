import { WebSocket } from "ws";
import { getQuote } from "../services/stockService.js";
import {
  FINNHUB_RECONNECT_DELAY_MS,
  FINNHUB_WS_URL,
  TOP_25_STOCKS,
} from "./constants.js";
import { applyTradeToQuote } from "./quoteMapper.js";

// In-memory live quotes, owned here alongside the upstream that mutates them.
// stockStore:    latest quote per symbol (REST seed + Finnhub trade patches).
// pendingUpdates: changed quotes awaiting the next broadcast tick.
// Quote shape (from stockService.getQuote + live fields):
// { symbol, currentPrice, change, percentChange, high, low, open,
//   previousClose, isProfit, isLoss, lastUpdated? }
const stockStore = new Map();
const pendingUpdates = new Map();

export const getSnapshot = () => Array.from(stockStore.values());

export const getStoreSize = () => stockStore.size;

export const hasPendingUpdates = () => pendingUpdates.size > 0;

export const drainUpdates = () => {
  if (pendingUpdates.size === 0) return [];
  const batch = Array.from(pendingUpdates.values());
  pendingUpdates.clear();
  return batch;
};

let finnhubSocket = null;
let upstreamStarted = false;
let shuttingDown = false;
let reconnectTimer = null;

const finnhubKey = process.env.FINNHUB_API_KEY;

async function fetchInitialStockPrices() {
  const promises = TOP_25_STOCKS.map(async (symbol) => {
    try {
      const quote = await getQuote(symbol);
      stockStore.set(symbol, quote);
    } catch (error) {
      console.error(`Error fetching initial price for ${symbol}:`, error);
    }
  });
  await Promise.allSettled(promises);
}

function handleFinnhubMessage(data) {
  try {
    const message = JSON.parse(data);
    if (message.type === "trade" && Array.isArray(message.data)) {
      for (const trade of message.data) {
        const current = stockStore.get(trade.s);
        if (!current) continue;
        const updated = applyTradeToQuote(current, trade);
        if (!updated) continue;
        stockStore.set(trade.s, updated);
        pendingUpdates.set(trade.s, updated);
      }
    }
  } catch (error) {
    console.error("Error processing Finnhub WebSocket message:", error);
  }
}

export function connectFinnhub() {
  if (shuttingDown) return;
  if (!finnhubKey) {
    console.warn(
      "FINNHUB_API_KEY is missing — skipping Finnhub WS. Snapshot will serve REST quotes only.",
    );
    return;
  }
  if (
    finnhubSocket &&
    (finnhubSocket.readyState === WebSocket.OPEN ||
      finnhubSocket.readyState === WebSocket.CONNECTING)
  ) {
    return;
  }

  finnhubSocket = new WebSocket(`${FINNHUB_WS_URL}?token=${finnhubKey}`);

  finnhubSocket.on("open", () => {
    console.log("Connected to Finnhub WebSocket, subscribing to top 25 stocks...");
    TOP_25_STOCKS.forEach((symbol) => {
      finnhubSocket.send(JSON.stringify({ type: "subscribe", symbol }));
    });
  });

  finnhubSocket.on("message", handleFinnhubMessage);

  finnhubSocket.on("close", () => {
    console.log("Finnhub WebSocket connection closed. Reconnecting...");
    finnhubSocket = null;
    if (shuttingDown) return;
    clearTimeout(reconnectTimer);
    reconnectTimer = setTimeout(connectFinnhub, FINNHUB_RECONNECT_DELAY_MS);
  });

  finnhubSocket.on("error", (error) => {
    console.error("Finnhub WebSocket error:", error);
  });
}

export async function ensureUpstream() {
  if (upstreamStarted) return;
  upstreamStarted = true;
  if (shuttingDown) return;
  await fetchInitialStockPrices();
  if (shuttingDown) return;
  connectFinnhub();
}

export function closeFinnhub() {
  shuttingDown = true;
  clearTimeout(reconnectTimer);
  reconnectTimer = null;

  if (finnhubSocket) {
    try {
      finnhubSocket.removeAllListeners("close");
      finnhubSocket.removeAllListeners("error");
      finnhubSocket.close(1000, "server shutdown");
    } catch {
      // ignore close errors during shutdown
    }
    finnhubSocket = null;
  }
}
