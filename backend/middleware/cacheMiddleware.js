import cache from "../services/cacheService.js";

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
    // ONLY cache if the response status is 2xx (Success)
    if (res.statusCode >= 200 && res.statusCode < 300) {
      cache.set(key, body, type);
    }
    return originalJson(body);
  };
  next();
};

export default cacheMiddleware;
