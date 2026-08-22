import Wallet from "../models/walletModel.js";
import Order from "../models/OrderModel.js";
import Trade from "../models/TradeModel.js";
import Transaction from "../models/TransactionModel.js";
import Portfolio from "../models/PortfolioModel.js";

export const getUserBalance = async (userId) => {
  let wallet = await Wallet.findOne({ user: userId });
  if (!wallet) {
    wallet = new Wallet({ user: userId });
    await wallet.save();
  }

  return wallet.balance;
};

export const createOrder = async (
  userId,
  symbol,
  quantity,
  totalCost,
  side,
  companyName,
  session,
) => {
  const order = new Order({
    user: userId,
    symbol,
    companyName,
    side,
    quantity,
    type: "market",
    price: totalCost / quantity,
    executedPrice: totalCost / quantity,
    status: "executed",
  });
  await order.save({ session });
  return order;
};

export const deductFromBalance = async (userId, amount, session) => {
  const wallet = await Wallet.findOne({ user: userId }).session(session);
  if (!wallet) {
    throw new Error("Wallet not found");
  }
  wallet.balance -= amount;
  await wallet.save({ session });

  return wallet.balance;
};

export const addAmountToBalance = async (userId, amount, session) => {
  const wallet = await Wallet.findOne({ user: userId }).session(session);
  if (!wallet) {
    throw new Error("Wallet not found");
  }
  wallet.balance += amount;
  await wallet.save({ session });

  return wallet.balance;
};

export const getPortfolioHolding = async (userId, symbol) => {
  let portfolio = await Portfolio.findOne({ user: userId });

  if (!portfolio) {
    portfolio = new Portfolio({ user: userId, holdings: [] });
    await portfolio.save();
  }

  return portfolio.holdings.find(
    (h) => h.symbol.toUpperCase() === symbol.toUpperCase(),
  );
};

export const updatePortfolioOnBuy = async (
  userId,
  symbol,
  quantity,
  price,
  companyName,
  session,
) => {
  let portfolio = await Portfolio.findOne({ user: userId }).session(session);
  if (!portfolio) {
    portfolio = new Portfolio({ user: userId, holdings: [] });
  }

  const holding = portfolio.holdings.find(
    (h) => h.symbol.toUpperCase() === symbol.toUpperCase(),
  );

  if (holding) {
    const totalValue =
      holding.quantity * holding.averagePrice + quantity * price;
    holding.quantity += quantity;
    holding.averagePrice = totalValue / holding.quantity;
    if (companyName && !holding.companyName) {
      holding.companyName = companyName;
    }
  } else {
    portfolio.holdings.push({ symbol, companyName, quantity, averagePrice: price });
  }

  await portfolio.save({ session });
};

export const updatePortfolioOnSell = async (
  userId,
  symbol,
  quantity,
  session,
) => {
  const portfolio = await Portfolio.findOne({ user: userId }).session(session);
  if (!portfolio) throw new Error("Portfolio not found");

  const holdingIndex = portfolio.holdings.findIndex(
    (h) => h.symbol.toUpperCase() === symbol.toUpperCase(),
  );

  if (holdingIndex === -1) throw new Error("Holding not found");

  const holding = portfolio.holdings[holdingIndex];
  if (holding.quantity < quantity) {
    throw new Error("Insufficient shares");
  }

  holding.quantity -= quantity;

  if (holding.quantity === 0) {
    portfolio.holdings.splice(holdingIndex, 1);
  }

  await portfolio.save({ session });
};

export const createTrade = async (
  userId,
  orderId,
  symbol,
  quantity,
  totalAmount,
  side,
  session,
) => {
  const trade = new Trade({
    user: userId,
    order: orderId,
    symbol,
    side,
    quantity,
    price: totalAmount / quantity,
    totalAmount,
  });
  await trade.save({ session });
  return trade;
};

export const createTransaction = async (
  userId,
  tradeId,
  orderId,
  type,
  amount,
  balanceBefore,
  balanceAfter,
  session,
) => {
  const transaction = new Transaction({
    user: userId,
    trade: tradeId,
    order: orderId,
    type,
    amount,
    balanceBefore,
    balanceAfter,
  });
  await transaction.save({ session });
  return transaction;
};
