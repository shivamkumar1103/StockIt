import { WebSocket } from "ws";
import { getQuote } from "./services/stockService.js";

// set up upstream websocket server
const finnhubKey = process.env.FINNHUB_API_KEY;
const TOP_25_STOCKS = [
  "AAPL",
  "MSFT",
  "NVDA",
  "AMZN",
  "GOOGL",
  "META",
  "TSLA",
  "AVGO",
  "JPM",
  "LLY",
  "V",
  "UNH",
  "XOM",
  "MA",
  "JNJ",
  "PG",
  "HD",
  "COST",
  "ABBV",
  "MRK",
  "BAC",
  "CRM",
  "NFLX",
  "AMD",
  "WMT",
];

// stores the latest stock prices for each symbol
const stockStore = new Map();

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

let finnhubSocket = null;
const pendingUpdates = new Map(); // Store pending updates for each symbol

const connectFinnhubWebSocket = () => {
  finnhubSocket = new WebSocket(`wss://ws.finnhub.io?token=${finnhubKey}`);

  finnhubSocket.on("open", () => {
    console.log(
      "Connected to Finnhub WebSocket , subscribing to top 25 stocks...",
    );
    // Subscribe to top 25 stocks
    TOP_25_STOCKS.forEach((symbol) => {
      finnhubSocket.send(JSON.stringify({ type: "subscribe", symbol }));
    });
  });

  finnhubSocket.on("message", (data) => {
    try {
      const message = JSON.parse(data);
      if (message.type === "trade" && Array.isArray(message.data)) {
        for (const trade of message.data) {
          const { s: symbol, p: price } = trade;
          // Update the stockStore with the latest price
          const current = stockStore.get(symbol);
          if (!current) continue; // Skip if the symbol is not in the store

          // Safe fallback for previousClose
          const previousClose = current.previousClose || price;
          const currentPrice = Number(price.toFixed(2));

          const rawChange = currentPrice - previousClose;
          const change = Number(rawChange.toFixed(2));

          const percentChange =
            previousClose !== 0
              ? Number(((rawChange / previousClose) * 100).toFixed(2))
              : 0;

          const high = current.high
            ? Math.max(current.high, currentPrice)
            : currentPrice;
          const low = current.low
            ? Math.min(current.low, currentPrice)
            : currentPrice;

          const updatedQuote = {
            ...current,
            currentPrice,
            change,
            percentChange,
            high,
            low,
            previousClose,
            isProfit: change > 0,
            isLoss: change < 0,
            lastUpdated: trade.t || Date.now(),
          };

          stockStore.set(symbol, updatedQuote);
          pendingUpdates.set(symbol, updatedQuote); // Store the update in pendingUpdates for broadcasting
        }
      }
    } catch (error) {
      console.error("Error processing Finnhub WebSocket message:", error);
    }
  });

  // Handle WebSocket close and error events to attempt reconnection
  finnhubSocket.on("close", () => {
    console.log("Finnhub WebSocket connection closed. Reconnecting...");
    setTimeout(connectFinnhubWebSocket, 5000); // Reconnect after 5 seconds
  });

  // Handle finnhub WebSocket error events
  finnhubSocket.on("error", (error) => {
    console.error("Finnhub WebSocket error:", error);
  });
};

async function start() {
  await fetchInitialStockPrices();
  connectFinnhubWebSocket();
}

start();

// set up downstream websocket server
