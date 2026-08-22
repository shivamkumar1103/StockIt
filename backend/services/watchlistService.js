import AppError from "../utils/appError.js";
import * as watchlistRepository from "../repository/watchlistRepository.js";
import { maxWatchlistLength } from "../utils/config.js";

export const getWatchlist = async (userId) => {
  const watchlist = await watchlistRepository.getWatchlist(userId);

  if (!watchlist) {
    await watchlistRepository.createWatchlist(userId);
  }

  return watchlist;
};

export const addToWatchlist = async (userId, symbol, exchange, companyName) => {
  const watchlist = await watchlistRepository.getWatchlist(userId);
  const formattedSymbol = symbol.toUpperCase();

  // If the watchlist doesn't exist, create a new one for the user
  if (!watchlist) {
    await watchlistRepository.createWatchlist(userId);
  }

  if (watchlist.stocks.length >= maxWatchlistLength) {
    throw new AppError(
      "Watchlist limit reached! You can only add up to 10 stocks.",
      400,
    );
  }

  // Check if the stock already exists in the watchlist
  const existingStock = watchlist.stocks.find(
    (stock) => stock.symbol === formattedSymbol,
  );

  if (existingStock) {
    throw new AppError("Stock already exists in the watchlist!", 409);
  }

  // Add the new stock to the watchlist
  const updatedWatchlist = await watchlistRepository.addStockToWatchlist(
    userId,
    formattedSymbol,
    exchange,
    companyName
  );
  return updatedWatchlist;
};

export const removeFromWatchlist = async (userId, symbol) => {
  const formattedSymbol = symbol.toUpperCase();
  // Check if the watchlist exists for the user
  const watchlist = await watchlistRepository.getWatchlist(userId);

  if (!watchlist) {
    throw new AppError("Watchlist not found!", 404);
  }

  // Check if the stock exists in the watchlist and remove it
  const updatedWatchlist = await watchlistRepository.removeStockFromWatchlist(
    userId,
    formattedSymbol,
  );

  if (!updatedWatchlist) {
    throw new AppError("Stock not found in the watchlist!", 404);
  }

  return updatedWatchlist;
};
