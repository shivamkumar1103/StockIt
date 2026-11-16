import express from "express";
import * as stockController from "../controllers/stockController.js";
import cacheMiddleware from "../middleware/cacheMiddleware.js";

const router = express.Router();

// Finnhub-backed endpoints: Redis cache lives in stockService via
// finnhubCacheService (service layer), so no HTTP middleware here.
router.route("/quote/:symbol").get(stockController.getStockQuote);
router.route("/profile/:symbol").get(stockController.getCompanyProfileInfo);
router.route("/search").get(stockController.searchForStocks);
router.route("/news").get(stockController.getNews);
router.route("/home").get(stockController.getHomeData);
// TwelveData-backed: intentionally no Redis, keep in-memory middleware.
router
  .route("/chart/:symbol")
  .get(cacheMiddleware("chart"), stockController.getStockChart);

export default router;
