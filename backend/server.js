import mongoose from "mongoose";
import app from "./app.js";
import { connectRedis, disconnectRedis } from "./utils/redisClient.js";
import {
  initMarketWebSocket,
  closeMarketWebSocket,
} from "./websocket/index.js";

// connect redis (fail-open: server boots even if Redis is down)
void connectRedis().catch(() => {});

// connect databse
const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB).then(() => console.log("DB connection successful!"));

// start the server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// attach market websocket (Finnhub live -> ws://<host>:<port>/ws/market)
// Keep the returned server so shutdown can close WS clients before HTTP.
const marketWss = initMarketWebSocket(server);
void marketWss;

let isShuttingDown = false;

// Order matters: WS clients -> WS server/upstream -> HTTP -> Redis -> Mongo.
// Closing WS first lets `server.close()` resolve instead of hanging on
// open upgrade sockets that share the same HTTP server.
const gracefulShutdown = async (reason, err, exitCode = 0) => {
  if (isShuttingDown) return;
  isShuttingDown = true;

  if (err) {
    console.log(`${reason}`, err.name || err, err.message || err);
  } else {
    console.log(`${reason}`);
  }

  try {
    await closeMarketWebSocket();
    console.log("Market WebSocket closed");
  } catch (closeErr) {
    console.log("Error closing Market WebSocket:", closeErr);
  }

  try {
    await new Promise((resolve, reject) => {
      server.close((closeErr) => (closeErr ? reject(closeErr) : resolve()));
    });
    console.log("HTTP server closed");
  } catch (closeErr) {
    console.log("Error closing HTTP server:", closeErr);
  }

  try {
    await disconnectRedis();
    console.log("Redis connection closed");
  } catch (closeErr) {
    console.log("Error closing Redis connection:", closeErr);
  }

  try {
    await mongoose.connection.close();
    console.log("DB connection closed");
  } catch (closeErr) {
    console.log("Error closing DB connection:", closeErr);
  }

  process.exit(exitCode);
};

// handle uncaught exceptions
process.on("uncaughtException", (err) => {
  gracefulShutdown("UNCAUGHT EXCEPTION! Shutting down...", err, 1);
});

// handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  gracefulShutdown("UNHANDLED REJECTION! Shutting down...", err, 1);
});

// handle SIGTERM / SIGINT signals
process.on("SIGTERM", () => {
  gracefulShutdown("SIGTERM received. Shutting down gracefully...");
});

process.on("SIGINT", () => {
  gracefulShutdown("SIGINT received. Shutting down gracefully...");
});
