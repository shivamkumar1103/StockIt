const ExpTime = {
  quote: 1 * 60 * 1000, // 1 minute
  profile: 24 * 60 * 60 * 1000, // 24 hours
  searchResults: 60 * 60 * 1000, // 1 hour
  news: 5 * 60 * 1000, // 5 minutes
  chart: 24 * 60 * 60 * 1000, // 24 hours
};

class CacheService {
  constructor() {
    this.cache = new Map();
  }

  set(key, data, type) {
    this.cache.set(key, { data, timestamp: Date.now() + ExpTime[type] });
  }

  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.timestamp) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  delete(key) {
    return this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }
}

export default new CacheService();
