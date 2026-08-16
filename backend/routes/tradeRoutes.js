import express from "express";
import { protect } from "../controllers/authController.js";
import * as tradingController from "../controllers/tradingController.js";

const router = express.Router();

router.use(protect);

router.post("/buy", tradingController.buyOrder);
router.post("/sell", tradingController.sellOrder);

export default router;
