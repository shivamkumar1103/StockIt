import cache from "./cacheService.js";

const cacheMiddleware = (type) => (req, res, next) => {
  const key = `cache:${req.originalUrl}`;

  // Check if the response is already cached
  const cachedResponse = cache.get(key);
  if (cachedResponse) {
    return res.json(cachedResponse);
  }
  const originalJson = res.json.bind(res);
  // Override the res.json method to cache the response before sending it
  res.json = (body) => {
    cache.set(key, body, type);
    originalJson(body);
  };
  next();
};

export default cacheMiddleware;
