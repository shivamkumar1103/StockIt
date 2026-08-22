import mongoose from "mongoose";
import * as stockService from "./stockService.js";
import * as tradingRepository from "../repository/tradingRepository.js";

export const placeBuyOrder = async (userId, symbol, quantity, companyName) => {
  if (!quantity || quantity <= 0) {
    throw new Error("Invalid quantity");
  }

  // fetch balance before API call to save resources if balance is obviously 0
  const currentBalance = await tradingRepository.getUserBalance(userId);
  if (currentBalance <= 0) {
    throw new Error("Insufficient balance");
  }

  // get live price of the stock outside transaction
  const { currentPrice } = await stockService.getQuote(symbol, "US");
  const totalCost = currentPrice * quantity;

  if (currentBalance < totalCost) {
    throw new Error("Insufficient balance");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await tradingRepository.createOrder(
      userId,
      symbol,
      quantity,
      totalCost,
      "buy",
      companyName,
      session,
    );

    const updatedBalance = await tradingRepository.deductFromBalance(
      userId,
      totalCost,
      session,
    );

    const trade = await tradingRepository.createTrade(
      userId,
      order.id,
      symbol,
      quantity,
      totalCost,
      "buy",
      session,
    );

    await tradingRepository.updatePortfolioOnBuy(
      userId,
      symbol,
      quantity,
      currentPrice,
      companyName,
      session,
    );

    await tradingRepository.createTransaction(
      userId,
      trade.id,
      order.id,
      "buy",
      totalCost,
      currentBalance,
      updatedBalance,
      session,
    );

    await session.commitTransaction();
    return order;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const placeSellOrder = async (userId, symbol, quantity) => {
  if (!quantity || quantity <= 0) {
    throw new Error("Invalid quantity");
  }

  // check if user has enough shares before making the API call
  const holding = await tradingRepository.getPortfolioHolding(userId, symbol);
  if (!holding || holding.quantity < quantity) {
    throw new Error("Insufficient shares");
  }

  // get live price of the stock outside transaction
  const { currentPrice } = await stockService.getQuote(symbol, "US");
  const totalRevenue = currentPrice * quantity;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await tradingRepository.createOrder(
      userId,
      symbol,
      quantity,
      totalRevenue,
      "sell",
      holding.companyName,
      session,
    );

    await tradingRepository.updatePortfolioOnSell(
      userId,
      symbol,
      quantity,
      session,
    );

    const updatedBalance = await tradingRepository.addAmountToBalance(
      userId,
      totalRevenue,
      session,
    );

    const currentBalance = updatedBalance - totalRevenue;

    const trade = await tradingRepository.createTrade(
      userId,
      order.id,
      symbol,
      quantity,
      totalRevenue,
      "sell",
      session,
    );

    await tradingRepository.createTransaction(
      userId,
      trade.id,
      order.id,
      "sell",
      totalRevenue,
      currentBalance,
      updatedBalance,
      session,
    );

    await session.commitTransaction();
    return order;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
