import Redis from "ioredis";

let client = null;
let isReady = false;
let connectPromise = null;

const getRedisUrl = () => process.env.REDIS_URL || "redis://localhost:6379";

export const isCacheEnabled = () => process.env.CACHE_ENABLED !== "false";

export const connectRedis = async () => {
  if (!isCacheEnabled()) {
    console.warn("Redis cache disabled via CACHE_ENABLED=false");
    return null;
  }
  if (client && isReady) return client;
  if (connectPromise) return connectPromise;

  connectPromise = (async () => {
    let redis = null;
    try {
      redis = new Redis(getRedisUrl(), {
        lazyConnect: true,
        enableOfflineQueue: false,
        maxRetriesPerRequest: 2,
        retryStrategy: (times) => Math.min(times * 100, 3000),
      });

      redis.on("error", (err) => {
        console.warn("Redis client error:", err.message);
      });
      redis.on("ready", () => {
        isReady = true;
      });
      redis.on("close", () => {
        isReady = false;
      });
      redis.on("end", () => {
        isReady = false;
      });

      await redis.connect();
      isReady = true;
      client = redis;
      console.log("Redis connection successful!");
      return client;
    } catch (err) {
      console.warn(
        "Redis connection failed, running without cache:",
        err.message,
      );
      isReady = false;
      if (redis) {
        try {
          redis.disconnect();
        } catch {
          // ignore cleanup errors
        }
      }
      client = null;
      return null;
    } finally {
      connectPromise = null;
    }
  })();

  return connectPromise;
};

export const getRedisClient = () => client;

export const isRedisReady = () => isReady && client !== null;

export const disconnectRedis = async () => {
  if (client) {
    try {
      await client.quit();
    } catch (err) {
      console.warn("Error closing Redis connection:", err.message);
    } finally {
      client = null;
      isReady = false;
    }
  }
};
