/**
 * Static market data for 50 popular companies.
 * Each entry includes symbol, name, sector, price, change, changePercent, marketCap, and volume.
 */
const marketData = [
  // ── Technology ──────────────────────────────────────
  { symbol: "AAPL", name: "Apple Inc.", sector: "Technology", price: 198.11, change: 2.45, changePercent: 1.25, marketCap: "3.09T", volume: "54.2M" },
  { symbol: "MSFT", name: "Microsoft Corp.", sector: "Technology", price: 430.52, change: 5.18, changePercent: 1.22, marketCap: "3.20T", volume: "22.1M" },
  { symbol: "GOOGL", name: "Alphabet Inc.", sector: "Technology", price: 176.89, change: -1.32, changePercent: -0.74, marketCap: "2.19T", volume: "28.5M" },
  { symbol: "NVDA", name: "NVIDIA Corp.", sector: "Technology", price: 124.67, change: 6.89, changePercent: 5.85, marketCap: "3.07T", volume: "312.4M" },
  { symbol: "META", name: "Meta Platforms", sector: "Technology", price: 510.34, change: 3.21, changePercent: 0.63, marketCap: "1.30T", volume: "18.7M" },
  { symbol: "TSM", name: "Taiwan Semiconductor", sector: "Technology", price: 178.45, change: 4.12, changePercent: 2.36, marketCap: "925.3B", volume: "16.3M" },
  { symbol: "AVGO", name: "Broadcom Inc.", sector: "Technology", price: 172.50, change: 3.88, changePercent: 2.30, marketCap: "800.1B", volume: "30.2M" },
  { symbol: "ORCL", name: "Oracle Corp.", sector: "Technology", price: 189.23, change: -0.87, changePercent: -0.46, marketCap: "526.7B", volume: "8.9M" },
  { symbol: "CRM", name: "Salesforce Inc.", sector: "Technology", price: 272.41, change: 1.56, changePercent: 0.58, marketCap: "263.1B", volume: "6.4M" },
  { symbol: "ADBE", name: "Adobe Inc.", sector: "Technology", price: 478.90, change: -3.45, changePercent: -0.72, marketCap: "213.5B", volume: "3.8M" },
  { symbol: "INTC", name: "Intel Corp.", sector: "Technology", price: 30.12, change: -1.23, changePercent: -3.92, marketCap: "128.4B", volume: "62.1M" },
  { symbol: "AMD", name: "Advanced Micro Devices", sector: "Technology", price: 164.78, change: 4.56, changePercent: 2.85, marketCap: "266.2B", volume: "45.7M" },

  // ── Financial ──────────────────────────────────────
  { symbol: "JPM", name: "JPMorgan Chase", sector: "Financial", price: 205.67, change: 1.89, changePercent: 0.93, marketCap: "592.4B", volume: "9.8M" },
  { symbol: "V", name: "Visa Inc.", sector: "Financial", price: 281.34, change: 0.76, changePercent: 0.27, marketCap: "577.1B", volume: "6.2M" },
  { symbol: "MA", name: "Mastercard Inc.", sector: "Financial", price: 468.92, change: 2.34, changePercent: 0.50, marketCap: "437.8B", volume: "3.1M" },
  { symbol: "BAC", name: "Bank of America", sector: "Financial", price: 39.45, change: -0.32, changePercent: -0.80, marketCap: "312.5B", volume: "35.6M" },
  { symbol: "GS", name: "Goldman Sachs", sector: "Financial", price: 462.18, change: 5.67, changePercent: 1.24, marketCap: "152.3B", volume: "2.4M" },
  { symbol: "MS", name: "Morgan Stanley", sector: "Financial", price: 98.73, change: 0.45, changePercent: 0.46, marketCap: "160.8B", volume: "8.1M" },
  { symbol: "BLK", name: "BlackRock Inc.", sector: "Financial", price: 812.56, change: -4.23, changePercent: -0.52, marketCap: "122.1B", volume: "0.6M" },

  // ── Healthcare ─────────────────────────────────────
  { symbol: "UNH", name: "UnitedHealth Group", sector: "Healthcare", price: 527.89, change: -8.34, changePercent: -1.56, marketCap: "486.2B", volume: "4.2M" },
  { symbol: "JNJ", name: "Johnson & Johnson", sector: "Healthcare", price: 156.23, change: 0.98, changePercent: 0.63, marketCap: "376.5B", volume: "7.8M" },
  { symbol: "LLY", name: "Eli Lilly & Co.", sector: "Healthcare", price: 892.45, change: 12.34, changePercent: 1.40, marketCap: "848.9B", volume: "3.5M" },
  { symbol: "PFE", name: "Pfizer Inc.", sector: "Healthcare", price: 28.67, change: -0.45, changePercent: -1.55, marketCap: "161.3B", volume: "28.9M" },
  { symbol: "ABBV", name: "AbbVie Inc.", sector: "Healthcare", price: 185.34, change: 1.12, changePercent: 0.61, marketCap: "327.4B", volume: "5.6M" },
  { symbol: "MRK", name: "Merck & Co.", sector: "Healthcare", price: 127.89, change: -2.01, changePercent: -1.55, marketCap: "323.7B", volume: "9.1M" },
  { symbol: "TMO", name: "Thermo Fisher Scientific", sector: "Healthcare", price: 567.23, change: 3.45, changePercent: 0.61, marketCap: "218.4B", volume: "1.8M" },

  // ── Consumer ───────────────────────────────────────
  { symbol: "AMZN", name: "Amazon.com Inc.", sector: "Consumer", price: 185.67, change: 3.45, changePercent: 1.89, marketCap: "1.93T", volume: "48.3M" },
  { symbol: "TSLA", name: "Tesla Inc.", sector: "Consumer", price: 248.92, change: -5.67, changePercent: -2.23, marketCap: "792.1B", volume: "112.5M" },
  { symbol: "WMT", name: "Walmart Inc.", sector: "Consumer", price: 67.89, change: 0.34, changePercent: 0.50, marketCap: "545.6B", volume: "12.3M" },
  { symbol: "PG", name: "Procter & Gamble", sector: "Consumer", price: 165.45, change: 0.78, changePercent: 0.47, marketCap: "389.2B", volume: "6.7M" },
  { symbol: "KO", name: "Coca-Cola Co.", sector: "Consumer", price: 63.12, change: 0.23, changePercent: 0.37, marketCap: "272.8B", volume: "11.2M" },
  { symbol: "PEP", name: "PepsiCo Inc.", sector: "Consumer", price: 183.56, change: -0.89, changePercent: -0.48, marketCap: "252.1B", volume: "4.5M" },
  { symbol: "COST", name: "Costco Wholesale", sector: "Consumer", price: 572.34, change: 4.56, changePercent: 0.80, marketCap: "253.7B", volume: "2.1M" },
  { symbol: "NKE", name: "Nike Inc.", sector: "Consumer", price: 97.23, change: -1.34, changePercent: -1.36, marketCap: "148.9B", volume: "8.9M" },
  { symbol: "MCD", name: "McDonald's Corp.", sector: "Consumer", price: 294.67, change: 1.23, changePercent: 0.42, marketCap: "213.4B", volume: "3.4M" },
  { symbol: "SBUX", name: "Starbucks Corp.", sector: "Consumer", price: 98.45, change: -0.67, changePercent: -0.68, marketCap: "112.3B", volume: "7.2M" },

  // ── Energy ─────────────────────────────────────────
  { symbol: "XOM", name: "Exxon Mobil Corp.", sector: "Energy", price: 104.56, change: -1.23, changePercent: -1.16, marketCap: "434.8B", volume: "15.6M" },
  { symbol: "CVX", name: "Chevron Corp.", sector: "Energy", price: 155.78, change: -0.98, changePercent: -0.63, marketCap: "289.3B", volume: "8.4M" },
  { symbol: "COP", name: "ConocoPhillips", sector: "Energy", price: 112.34, change: 1.56, changePercent: 1.41, marketCap: "133.2B", volume: "5.9M" },
  { symbol: "SLB", name: "Schlumberger Ltd.", sector: "Energy", price: 47.89, change: 0.67, changePercent: 1.42, marketCap: "68.4B", volume: "9.3M" },
  { symbol: "EOG", name: "EOG Resources", sector: "Energy", price: 123.45, change: 2.34, changePercent: 1.93, marketCap: "71.2B", volume: "3.7M" },

  // ── Communication ──────────────────────────────────
  { symbol: "NFLX", name: "Netflix Inc.", sector: "Communication", price: 632.45, change: 8.90, changePercent: 1.43, marketCap: "273.8B", volume: "5.3M" },
  { symbol: "DIS", name: "Walt Disney Co.", sector: "Communication", price: 101.23, change: 0.56, changePercent: 0.56, marketCap: "185.6B", volume: "10.2M" },
  { symbol: "CMCSA", name: "Comcast Corp.", sector: "Communication", price: 43.67, change: -0.34, changePercent: -0.77, marketCap: "170.4B", volume: "18.9M" },
  { symbol: "TMUS", name: "T-Mobile US", sector: "Communication", price: 172.89, change: 1.23, changePercent: 0.72, marketCap: "202.3B", volume: "4.1M" },
  { symbol: "SPOT", name: "Spotify Technology", sector: "Communication", price: 315.67, change: 7.89, changePercent: 2.56, marketCap: "62.3B", volume: "2.8M" },

  // ── Industrial ─────────────────────────────────────
  { symbol: "CAT", name: "Caterpillar Inc.", sector: "Industrial", price: 278.90, change: 3.45, changePercent: 1.25, marketCap: "137.8B", volume: "3.2M" },
  { symbol: "BA", name: "Boeing Co.", sector: "Industrial", price: 218.34, change: -2.56, changePercent: -1.16, marketCap: "130.5B", volume: "5.6M" },
  { symbol: "HON", name: "Honeywell Intl.", sector: "Industrial", price: 205.67, change: 1.23, changePercent: 0.60, marketCap: "136.2B", volume: "3.8M" },
  { symbol: "UPS", name: "United Parcel Service", sector: "Industrial", price: 142.89, change: -1.78, changePercent: -1.23, marketCap: "122.4B", volume: "4.1M" },
];

/** Unique sector labels extracted from the data. */
export const sectors = [...new Set(marketData.map((s) => s.sector))];

export default marketData;
