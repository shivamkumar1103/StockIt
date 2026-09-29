/**
 * Vanilla market WebSocket client (no React).
 * Owns connection + exponential-backoff reconnect + frame parsing so
 * `useMarketQuotes` subscribes and writes into the TanStack query cache,
 * keeping this transport framework-free and testable.
 */

export const MARKET_SNAPSHOT_TYPE = "Market-Snapshot";
export const MARKET_UPDATE_TYPE = "Market-Update";

const INITIAL_RECONNECT_DELAY = 1000;
const MAX_RECONNECT_DELAY = 10000;

const getReconnectDelay = (attempt) =>
  Math.min(INITIAL_RECONNECT_DELAY * 2 ** Math.min(attempt - 1, 4), MAX_RECONNECT_DELAY);

const collectQuotes = (data, target) => {
  for (const quote of data) {
    if (quote?.symbol) target.set(quote.symbol, quote);
  }
};

export function createMarketSocket({ url, onSnapshot, onUpdate, onStatus }) {
  let ws = null;
  let reconnectTimer = null;
  let attempts = 0;
  let closed = false;

  const scheduleReconnect = () => {
    if (closed) return;
    attempts += 1;
    onStatus?.("reconnecting");
    clearTimeout(reconnectTimer);
    reconnectTimer = setTimeout(connect, getReconnectDelay(attempts));
  };

  function connect() {
    if (closed) return;
    onStatus?.(attempts === 0 ? "connecting" : "reconnecting");

    try {
      ws = new WebSocket(url);
    } catch {
      scheduleReconnect();
      return;
    }

    ws.onopen = () => {
      attempts = 0;
      onStatus?.("live");
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (!message || !Array.isArray(message.data)) return;

        if (message.type === MARKET_SNAPSHOT_TYPE) {
          const next = new Map();
          collectQuotes(message.data, next);
          onSnapshot?.(next);
          onStatus?.("live");
        } else if (message.type === MARKET_UPDATE_TYPE) {
          onUpdate?.(message.data);
        }
      } catch {
        // Ignore malformed frames — next batch corrects state.
      }
    };

    ws.onerror = () => {
      try {
        ws.close();
      } catch {
        // onclose drives the reconnect
      }
    };

    ws.onclose = () => {
      ws = null;
      if (!closed) scheduleReconnect();
    };
  }

  connect();

  return {
    close() {
      closed = true;
      clearTimeout(reconnectTimer);
      try {
        ws?.close(1000, "unmount");
      } catch {
        // ignore cleanup errors
      }
      ws = null;
    },
  };
}
