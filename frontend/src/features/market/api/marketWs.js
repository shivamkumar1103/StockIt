/**
 * Resolve the market WebSocket URL.
 *
 * Priority:
 *  1. `VITE_WS_URL` when explicitly set (e.g. wss://api.stockit.com/ws/market)
 *  2. Derived from `VITE_API_URL` by swapping http->ws and replacing the
 *     `/api/v1` suffix with `/ws/market`.
 *  3. Fallback to local backend default.
 */
export const MARKET_WS_PATH = "/ws/market";

export function getMarketWsUrl() {
  const explicit = import.meta.env.VITE_WS_URL;
  if (explicit) return explicit;

  const apiUrl = import.meta.env.VITE_API_URL;
  if (apiUrl) {
    try {
      const url = new URL(apiUrl);
      url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
      url.pathname = MARKET_WS_PATH;
      url.search = "";
      url.hash = "";
      return url.toString();
    } catch {
      // fall through to default
    }
  }

  return `ws://localhost:3000${MARKET_WS_PATH}`;
}
