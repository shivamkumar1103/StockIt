/** Pure selectors over an already-merged stock list. */

export const getTopGainer = (stocks) => {
  if (stocks.length === 0) return null;
  return stocks.reduce((best, stock) =>
    stock.changePercent > best.changePercent ? stock : best,
  );
};

export const getTopLoser = (stocks) => {
  if (stocks.length === 0) return null;
  return stocks.reduce((worst, stock) =>
    stock.changePercent < worst.changePercent ? stock : worst,
  );
};

export const getLiveCount = (stocks) => stocks.filter((s) => s.isLive).length;

export const getSectors = (stocks) => {
  const set = new Set(stocks.map((s) => s.sector).filter(Boolean));
  return [...set].sort((a, b) =>
    a === "Other" ? 1 : b === "Other" ? -1 : a.localeCompare(b),
  );
};

export const filterBySectorAndQuery = (stocks, activeSector, searchQuery) => {
  let result = stocks;

  if (activeSector !== "All") {
    result = result.filter((s) => s.sector === activeSector);
  }

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    result = result.filter(
      (s) =>
        s.symbol.toLowerCase().includes(query) ||
        s.name.toLowerCase().includes(query),
    );
  }

  return result;
};
