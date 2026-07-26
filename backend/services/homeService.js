import { getQuote, getMarketNews } from "./stockService.js";

const HOME_SECTIONS = {
  indexes: ["AAPL", "MSFT", "GOOGL", "AMZN"],

  trending: ["NVDA", "TSLA", "META", "AMD"],

  popular: ["AAPL", "NVDA", "MSFT", "TSLA", "AMZN"],
};

const fetchQuotes = async (symbols, market) => {
  const uniqueSymbols = [...new Set(symbols)];

  const quotePromises = uniqueSymbols.map(async (symbol) => {
    try {
      const quote = await getQuote(symbol, market);

      return {
        symbol,
        ...quote,
      };
    } catch (err) {
      console.error(`Failed to fetch ${symbol}:`, err.message);
      return null;
    }
  });

  const results = await Promise.all(quotePromises);

  return results.filter(Boolean).reduce((map, stock) => {
    map.set(stock.symbol, stock);
    return map;
  }, new Map());
};

const buildSection = (symbols, quoteMap) =>
  symbols.map((symbol) => quoteMap.get(symbol)).filter(Boolean);

// Home Service
export const getHome = async (market) => {
  const allSymbols = [
    ...HOME_SECTIONS.indexes,
    ...HOME_SECTIONS.trending,
    ...HOME_SECTIONS.popular,
  ];

  const [quoteMap, news] = await Promise.all([
    fetchQuotes(allSymbols, market),
    getMarketNews("general", market),
  ]);

  return {
    news: news.slice(0, 10),

    indexes: buildSection(HOME_SECTIONS.indexes, quoteMap),

    trending: buildSection(HOME_SECTIONS.trending, quoteMap),

    popular: buildSection(HOME_SECTIONS.popular, quoteMap),
  };
};
