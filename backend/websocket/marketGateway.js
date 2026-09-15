import { WebSocket, WebSocketServer } from "ws";
import {
  BROADCAST_INTERVAL_MS,
  HEARTBEAT_INTERVAL_MS,
  MARKET_WS_PATH,
} from "./constants.js";
import { drainUpdates, ensureUpstream, getSnapshot, hasPendingUpdates } from "./finnhubClient.js";

let marketWss = null;
let broadcastTimer = null;
let heartbeatTimer = null;

function sendSafe(socket, payload) {
  if (socket.readyState !== WebSocket.OPEN) return;
  try {
    socket.send(payload);
  } catch (error) {
    console.error("Error sending WS message to client:", error);
  }
}

function startBroadcastLoop(websocketServer) {
  broadcastTimer = setInterval(() => {
    if (!hasPendingUpdates() || websocketServer.clients.size === 0) return;

    const batch = drainUpdates();
    const payload = JSON.stringify({ type: "Market-Update", data: batch });
    for (const clientSocket of websocketServer.clients) {
      sendSafe(clientSocket, payload);
    }
  }, BROADCAST_INTERVAL_MS);
  broadcastTimer.unref?.();
}

function startHeartbeatLoop(websocketServer) {
  heartbeatTimer = setInterval(() => {
    for (const clientSocket of websocketServer.clients) {
      if (clientSocket.isAlive === false) {
        try {
          clientSocket.terminate();
        } catch {
          // ignore terminate errors
        }
        continue;
      }
      clientSocket.isAlive = false;
      try {
        clientSocket.ping();
      } catch {
        // ignore ping errors — next heartbeat will clean up
      }
    }
  }, HEARTBEAT_INTERVAL_MS);
  heartbeatTimer.unref?.();
}

/**
 * Attach the downstream market WS server to an existing HTTP server.
 * Shares one port with Express via path-based upgrade routing.
 *
 * Clients connect to: ws(s)://<host>:<port>/ws/market
 * Messages:
 *  - { type: "Market-Snapshot", data: Quote[] } on connect
 *  - { type: "Market-Update", data: Quote[] }   batched every 150ms
 */
export function initMarketGateway(httpServer) {
  const websocketServer = new WebSocketServer({
    server: httpServer,
    path: MARKET_WS_PATH,
  });
  marketWss = websocketServer;

  websocketServer.on("connection", (clientSocket) => {
    clientSocket.isAlive = true;
    clientSocket.on("pong", () => {
      clientSocket.isAlive = true;
    });
    clientSocket.on("error", (error) => {
      console.error("Market client socket error:", error);
    });

    sendSafe(
      clientSocket,
      JSON.stringify({ type: "Market-Snapshot", data: getSnapshot() }),
    );
  });

  startBroadcastLoop(websocketServer);
  startHeartbeatLoop(websocketServer);

  websocketServer.on("close", () => {
    if (broadcastTimer) clearInterval(broadcastTimer);
    if (heartbeatTimer) clearInterval(heartbeatTimer);
    broadcastTimer = null;
    heartbeatTimer = null;
  });

  ensureUpstream().catch((error) =>
    console.error("Failed to start market upstream:", error),
  );

  console.log(`Market WebSocket live at path ${MARKET_WS_PATH}`);
  return websocketServer;
}

export function closeMarketGateway() {
  if (broadcastTimer) clearInterval(broadcastTimer);
  if (heartbeatTimer) clearInterval(heartbeatTimer);
  broadcastTimer = null;
  heartbeatTimer = null;

  const wss = marketWss;
  marketWss = null;
  if (!wss) return Promise.resolve();

  for (const clientSocket of wss.clients) {
    try {
      clientSocket.close(1001, "server shutdown");
    } catch {
      // ignore per-client close errors
    }
  }

  return new Promise((resolve) => {
    try {
      wss.close(() => resolve());
    } catch {
      resolve();
    }
  });
}
