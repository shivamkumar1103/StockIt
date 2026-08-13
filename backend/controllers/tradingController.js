import * as tradingService from "../services/tradingService.js";

export const buyOrder = async (req, res) => {
  const { symbol, quantity } = req.body;
  const userId = req.user.id;
  if (!symbol || !quantity) {
    return res
      .status(400)
      .json({ message: "Symbol and quantity are required" });
  }

  const result = await tradingService.placeBuyOrder(userId, symbol, quantity);
  res
    .status(201)
    .json({
      status: "success",
      message: "Buy order placed successfully",
      data: result,
    });
};

export const sellOrder = async (req, res) => {
  const { symbol, quantity } = req.body;
  const userId = req.user.id;
  if (!symbol || !quantity) {
    return res
      .status(400)
      .json({ message: "Symbol and quantity are required" });
  }
  const order = await tradingService.placeSellOrder(userId, symbol, quantity);
  res.status(200).json({
    status: "success",
    message: "Sell order placed successfully",
    data: order,
  });
};
