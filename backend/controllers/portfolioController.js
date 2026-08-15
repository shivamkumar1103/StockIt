import * as PortfolioService from "../services/portfolioService.js";

export const getPortfolio = async (req, res) => {
  const userId = req.user.id;
  const portfolio = await PortfolioService.getUserPortfolio(userId);
  res.status(200).json({ status: "success", data: portfolio });
};

export const getStocks = async (req, res) => {
  const userId = req.user.id;
  const stockData = await PortfolioService.getUserStocks(userId);
  res.status(200).json({ status: "success", data: stockData });
};

export const getWallet = async (req, res) => {
  const userId = req.user.id;
  const wallet = await PortfolioService.getUserWallet(userId);
  res.status(200).json({ status: "success", data: wallet });
};

export const getOrderHistory = async (req, res) => {
  const userId = req.user.id;
  const orderHistory = await PortfolioService.getUserOrderHistory(userId);
  res.status(200).json({ status: "success", data: orderHistory });
};

export const getOrderById = async (req, res) => {
  const userId = req.user.id;
  const orderId = req.params.id;
  const order = await PortfolioService.getUserOrderById(userId, orderId);

  res.status(200).json({ status: "success", data: order });
};

export const deleteOrderById = async (req, res) => {
  const userId = req.user.id;
  const orderId = req.params.id;
  const deletedOrder = await PortfolioService.deleteUserOrderById(
    userId,
    orderId,
  );
  res.status(200).json({ status: "success", data: deletedOrder });
};

export const getTransactionHistory = async (req, res) => {
  const userId = req.user.id;
  const transactionHistory =
    await PortfolioService.getUserTransactionHistory(userId);
  res.status(200).json({ status: "success", data: transactionHistory });
};

export const getTransactionById = async (req, res) => {
  const userId = req.user.id;
  const transactionId = req.params.id;
  const transaction = await PortfolioService.getUserTransactionById(
    userId,
    transactionId,
  );
  res.status(200).json({ status: "success", data: transaction });
};

export const getTradeHistory = async (req, res) => {
  const userId = req.user.id;
  const tradeHistory = await PortfolioService.getUserTradeHistory(userId);
  res.status(200).json({ status: "success", data: tradeHistory });
};

export const getTradeById = async (req, res) => {
  const userId = req.user.id;
  const tradeId = req.params.id;
  const trade = await PortfolioService.getUserTradeById(userId, tradeId);
  res.status(200).json({ status: "success", data: trade });
};
