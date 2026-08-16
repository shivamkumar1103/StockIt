import * as PortfolioRepository from "../repository/portfolioRepository.js";
import AppError from "../utils/appError.js";

export const getUserPortfolio = async (userId) => {
  const portfolio = await PortfolioRepository.getUserPortfolio(userId);
  const symbols = portfolio.holdings.map((holding) => holding.symbol);

  let stockData = [];
  if (symbols.length > 0) {
    stockData = await PortfolioRepository.getStockData(symbols);
  }

  const stockMap = {};
  stockData.forEach((stock) => {
    stockMap[stock.symbol] = stock;
  });

  let totalInvestment = 0;
  let currentValue = 0;

  const enrichedHoldings = portfolio.holdings.map((holding) => {
    const liveData = stockMap[holding.symbol] || {};
    const currentPrice = liveData.currentPrice || holding.averagePrice || 0;

    const holdingInvestment = holding.quantity * holding.averagePrice;
    const holdingCurrentValue = holding.quantity * currentPrice;

    totalInvestment += holdingInvestment;
    currentValue += holdingCurrentValue;

    return {
      ...(holding.toObject ? holding.toObject() : holding),
      currentPrice,
      investmentValue: holdingInvestment,
      currentValue: holdingCurrentValue,
      unrealizedPnL: holdingCurrentValue - holdingInvestment,
      ...liveData,
    };
  });

  const unrealizedPnL = currentValue - totalInvestment;

  const wallet = await PortfolioRepository.getUserWallet(userId);
  const walletBalance = wallet ? wallet.balance : 0;
  const totalBalance = walletBalance + currentValue;

  return {
    holdings: enrichedHoldings,
    totalInvestment,
    currentValue,
    unrealizedPnL,
    totalBalance,
    walletBalance,
  };
};

export const getUserStocks = async (userId) => {
  const myStocks = await PortfolioRepository.getUserPortfolio(userId);
  const symbols = myStocks.holdings.map((holding) => holding.symbol);

  const stockData = await PortfolioRepository.getStockData(symbols);
  return stockData;
};

export const getUserWallet = async (userId) => {
  return await PortfolioRepository.getUserWallet(userId);
};

export const getUserOrderHistory = async (userId) => {
  return await PortfolioRepository.getUserOrderHistory(userId);
};

export const getUserOrderById = async (userId, orderId) => {
  const order = await PortfolioRepository.getUserOrderById(userId, orderId);
  if (!order) {
    throw new AppError(`Order with id ${orderId} not found`, 404);
  }
  return order;
};

export const deleteUserOrderById = async (userId, orderId) => {
  const deletedOrder = await PortfolioRepository.deleteUserOrderById(
    userId,
    orderId,
  );
  if (!deletedOrder) {
    throw new AppError(`Order with id ${orderId} not found`, 404);
  }
  return deletedOrder;
};

export const getUserTransactionHistory = async (userId) => {
  return await PortfolioRepository.getUserTransactionHistory(userId);
};

export const getUserTransactionById = async (userId, transactionId) => {
  const transaction = await PortfolioRepository.getUserTransactionById(
    userId,
    transactionId,
  );
  if (!transaction) {
    throw new AppError(`Transaction with id ${transactionId} not found`, 404);
  }
  return transaction;
};

export const getUserTradeHistory = async (userId) => {
  return await PortfolioRepository.getUserTradeHistory(userId);
};

export const getUserTradeById = async (userId, tradeId) => {
  const trade = await PortfolioRepository.getUserTradeById(userId, tradeId);
  if (!trade) {
    throw new AppError(`Trade with id ${tradeId} not found`, 404);
  }
  return trade;
};
