import express from "express";
import * as watchlistController from "../controllers/watchlistController.js";
import { protect } from "../controllers/authController.js";

const router = express.Router();

router.use(protect); // Ensure the user is authenticated for all watchlist routes

router.get("/", watchlistController.getWatchlist);
router.post("/", watchlistController.addToWatchlist);
router.delete("/", watchlistController.removeFromWatchlist);

export default router;
