/**
 * Static metadata for the 25 symbols streamed by the backend
 * (`TOP_25_STOCKS` in `backend/websocket/constants.js`).
 * Only fields the backend never provides are kept here —
 * price/change/volume all come from live quotes.
 * Each entry: symbol, name, sector.
 */
const marketData = [
  // ── Technology ──────────────────────────────────────
  { symbol: "AAPL", name: "Apple Inc.", sector: "Technology" },
  { symbol: "MSFT", name: "Microsoft Corp.", sector: "Technology" },
  { symbol: "GOOGL", name: "Alphabet Inc.", sector: "Technology" },
  { symbol: "NVDA", name: "NVIDIA Corp.", sector: "Technology" },
  { symbol: "META", name: "Meta Platforms", sector: "Technology" },
  { symbol: "AVGO", name: "Broadcom Inc.", sector: "Technology" },
  { symbol: "CRM", name: "Salesforce Inc.", sector: "Technology" },
  { symbol: "AMD", name: "Advanced Micro Devices", sector: "Technology" },

  // ── Financial ───────────────────────────────────────
  { symbol: "JPM", name: "JPMorgan Chase", sector: "Financial" },
  { symbol: "V", name: "Visa Inc.", sector: "Financial" },
  { symbol: "MA", name: "Mastercard Inc.", sector: "Financial" },
  { symbol: "BAC", name: "Bank of America", sector: "Financial" },

  // ── Healthcare ──────────────────────────────────────
  { symbol: "LLY", name: "Eli Lilly & Co.", sector: "Healthcare" },
  { symbol: "UNH", name: "UnitedHealth Group", sector: "Healthcare" },
  { symbol: "JNJ", name: "Johnson & Johnson", sector: "Healthcare" },
  { symbol: "ABBV", name: "AbbVie Inc.", sector: "Healthcare" },
  { symbol: "MRK", name: "Merck & Co.", sector: "Healthcare" },

  // ── Consumer ────────────────────────────────────────
  { symbol: "AMZN", name: "Amazon.com Inc.", sector: "Consumer" },
  { symbol: "TSLA", name: "Tesla Inc.", sector: "Consumer" },
  { symbol: "PG", name: "Procter & Gamble", sector: "Consumer" },
  { symbol: "HD", name: "Home Depot Inc.", sector: "Consumer" },
  { symbol: "COST", name: "Costco Wholesale", sector: "Consumer" },
  { symbol: "WMT", name: "Walmart Inc.", sector: "Consumer" },

  // ── Energy ──────────────────────────────────────────
  { symbol: "XOM", name: "Exxon Mobil Corp.", sector: "Energy" },

  // ── Communication ───────────────────────────────────
  { symbol: "NFLX", name: "Netflix Inc.", sector: "Communication" },
];

export default marketData;
