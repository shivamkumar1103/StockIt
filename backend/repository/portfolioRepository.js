import Portfolio from "../models/PortfolioModel.js";
import Wallet from "../models/WalletModel.js";
import Order from "../models/OrderModel.js";
import Transaction from "../models/TransactionModel.js";
import Trade from "../models/TradeModel.js";
import { getQuote } from "../services/stockService.js";

export const getUserPortfolio = async (userId) => {
  // Check if the portfolio exists for the user
  let portfolio = await Portfolio.findOne({ user: userId });
  // If not, create a new portfolio for the user
  if (!portfolio) {
    portfolio = new Portfolio({ user: userId, holdings: [] });
    await portfolio.save();
  }
  // Return the portfolio
  return portfolio;
};

export const getStockData = async (symbols) => {
  // Fetch stock data for each symbol
  const stockData = await Promise.all(
    symbols.map(async (symbol) => {
      const quote = await getQuote(symbol);
      return { symbol, ...quote };
    }),
  );
  return stockData;
};

export const getUserWallet = async (userId) => {
  // Check if the wallet exists for the user
  let userwallet = await Wallet.findOne({ user: userId });
  // If not, create a new wallet for the user with a default balance
  if (!userwallet) {
    userwallet = new Wallet({ user: userId });
    await userwallet.save();
  }
  return userwallet;
};

export const getUserOrderHistory = async (userId) => {
  // Fetch the order history for the user, sorted by most recent orders first
  const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
  return orders;
};

export const getUserOrderById = async (userId, orderId) => {
  const order = await Order.findOne({ _id: orderId, user: userId });
  return order;
};

export const deleteUserOrderById = async (userId, orderId) => {
  const order = await Order.findOneAndDelete({ _id: orderId, user: userId });
  return order;
};

export const getUserTransactionHistory = async (userId) => {
  // Fetch the transaction history for the user, sorted by most recent first
  const transactions = await Transaction.find({ user: userId }).sort({
    createdAt: -1,
  });
  return transactions;
};

export const getUserTransactionById = async (userId, transactionId) => {
  return await Transaction.findOne({ _id: transactionId, user: userId });
};

export const getUserTradeHistory = async (userId) => {
  // Fetch the trade history for the user, sorted by most recent first
  const trades = await Trade.find({ user: userId }).sort({ createdAt: -1 });
  return trades;
};

export const getUserTradeById = async (userId, tradeId) => {
  return await Trade.findOne({ _id: tradeId, user: userId });
};
