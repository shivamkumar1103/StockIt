// Public facade for the market live layer.
// server.js talks only to this file — transport details live in
// finnhubClient.js (upstream) and marketGateway.js (downstream).

export { MARKET_WS_PATH } from "./constants.js";
export { getSnapshot, getStoreSize } from "./finnhubClient.js";
export { initMarketGateway as initMarketWebSocket } from "./marketGateway.js";

import { closeFinnhub } from "./finnhubClient.js";
import { closeMarketGateway } from "./marketGateway.js";

/**
 * Gracefully shut down the market WS layer:
 * 1. Stop upstream reconnects + close Finnhub socket (no auto-reconnect).
 * 2. Stop broadcast/heartbeat timers.
 * 3. Close all downstream clients, then close the WebSocketServer.
 * Safe to call multiple times or when never initialized.
 */
export function closeMarketWebSocket() {
  closeFinnhub();
  return closeMarketGateway();
}
