import Watchlist from "../models/watchlistModel.js";

export const getWatchlist = async (userId) => {
  return await Watchlist.findOne({ user: userId }).populate("stocks");
};

export const createWatchlist = async (userId) => {
  return await Watchlist.create({ user: userId });
};

export const addStockToWatchlist = async (userId, symbol, exchange) => {
  const updatedWatchlist = await Watchlist.findOneAndUpdate(
    {
      user: userId,
    },
    {
      $push: {
        stocks: {
          symbol,
          exchange,
        },
      },
    },
    { new: true, upsert: true },
  );

  return updatedWatchlist;
};

export const removeStockFromWatchlist = async (userId, symbol) => {
  const updatedWatchlist = await Watchlist.findOneAndUpdate(
    { user: userId },
    { $pull: { stocks: { symbol } } },
    { new: true },
  );

  return updatedWatchlist;
};
