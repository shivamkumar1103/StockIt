import http from "http";
import { initMarketWebSocket, closeMarketWebSocket } from "./index.js";
import { getStoreSize } from "./finnhubClient.js";

// Standalone mode: `tsx --env-file=config.env backend/websocket/standalone.js`
// Useful for isolated WS debugging without the Express app.
const wsPort = Number(process.env.WS_PORT) || 3001;
const standaloneServer = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", symbols: getStoreSize() }));
    return;
  }
  res.writeHead(404);
  res.end();
});

initMarketWebSocket(standaloneServer);
standaloneServer.listen(wsPort, () => {
  console.log(`Standalone Market WebSocket listening on port ${wsPort}`);
});

const shutdownStandalone = async () => {
  await closeMarketWebSocket();
  await new Promise((resolve) => standaloneServer.close(() => resolve()));
  process.exit(0);
};
process.on("SIGTERM", shutdownStandalone);
process.on("SIGINT", shutdownStandalone);
