import express from "express";
import { protect } from "../controllers/authController.js";
import * as PortfolioController from "../controllers/portfolioController.js";

const router = express.Router();

router.use(protect);

// Portfolio routes
router.get("/portfolio", PortfolioController.getPortfolio);

// Wallet routes
router.get("/wallet", PortfolioController.getWallet);

// Order routes
router.get("/orders", PortfolioController.getOrderHistory);
router.get("/orders/:id", PortfolioController.getOrderById);
router.delete("/orders/:id", PortfolioController.deleteOrderById);

// Transaction routes
router.get("/transactions", PortfolioController.getTransactionHistory);
router.get("/transactions/:id", PortfolioController.getTransactionById);

// Trade routes
router.get("/trades", PortfolioController.getTradeHistory);
router.get("/trades/:id", PortfolioController.getTradeById);

export default router;
