import AppError from "../utils/appError.js";
import * as watchlistService from "../services/watchlistService.js";

export const getWatchlist = async (req, res) => {
  const userId = req.user.id;
  const watchlist = await watchlistService.getWatchlist(userId);

  res.status(200).json({
    status: "success",
    count: watchlist.stocks.length,
    data: watchlist.stocks,
  });
};

export const addToWatchlist = async (req, res) => {
  const userId = req.user.id;
  const { symbol, exchange } = req.body;
  if (!symbol) {
    throw new AppError("Symbol is required!", 400);
  }

  const updatedWatchlist = await watchlistService.addToWatchlist(
    userId,
    symbol,
    exchange,
  );

  res.status(201).json({
    status: "success",
    data: updatedWatchlist.stocks,
  });
};

export const removeFromWatchlist = async (req, res) => {
  const userId = req.user.id;
  const { symbol } = req.body;
  if (!symbol) {
    throw new AppError("Symbol is required!", 400);
  }

  const updatedWatchlist = await watchlistService.removeFromWatchlist(
    userId,
    symbol,
  );

  res.status(200).json({
    status: "success",
    message: `Stock with symbol ${symbol} removed from watchlist.`,
    updatedWatchlist: updatedWatchlist.stocks,
  });
};
