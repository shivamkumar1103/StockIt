import { getRedisClient, isRedisReady } from "../utils/redisClient.js";

/*
  Redis cache for Finnhub API calls ONLY.
  TwelveData (chart/time_series) intentionally bypasses this service.
  Cache-aside with fail-open: any Redis error falls through to live fetch.
*/

export const FINNHUB_TTL_SECONDS = {
  quote: 30, // live price, volatile. Finnhub free ~60 req/min
  profile: 24 * 60 * 60, // company fundamentals, static
  search: 60 * 60, // search results, stable
  news: 5 * 60, // market news, fresh in minutes
};

const PREFIX = "finnhub";

export const buildQuoteKey = (symbol) =>
  `${PREFIX}:quote:${symbol.trim().toUpperCase()}`;

export const buildProfileKey = (symbol) =>
  `${PREFIX}:profile:${symbol.trim().toUpperCase()}`;

export const buildSearchKey = (query) =>
  `${PREFIX}:search:${query.trim().toLowerCase()}`;

export const buildNewsKey = (category = "general", minId = 0) =>
  `${PREFIX}:news:${String(category || "general").trim().toLowerCase()}:${minId || 0}`;

export const get = async (key) => {
  if (!isRedisReady()) return null;
  try {
    const raw = await getRedisClient().get(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const set = async (key, value, ttlSeconds) => {
  if (!isRedisReady()) return;
  if (value === null || value === undefined) return;
  try {
    await getRedisClient().set(key, JSON.stringify(value), "EX", ttlSeconds);
  } catch {
    // fail-open: ignore cache write errors
  }
};

export const getOrSet = async (key, ttlSeconds, fetchFn) => {
  const cached = await get(key);
  if (cached !== null) return cached;

  const fresh = await fetchFn();
  // Only cache successful, non-empty payloads. Errors propagate uncached.
  if (fresh !== null && fresh !== undefined) {
    await set(key, fresh, ttlSeconds);
  }
  return fresh;
};
