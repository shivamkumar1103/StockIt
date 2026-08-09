import express from "express";
import * as stockController from "../controllers/stockController.js";
import cacheMiddleware from "../middleware/cacheMiddleware.js";

const router = express.Router();

router
  .route("/quote/:symbol")
  .get(cacheMiddleware("quote"), stockController.getStockQuote);
router
  .route("/profile/:symbol")
  .get(cacheMiddleware("profile"), stockController.getCompanyProfileInfo);
router
  .route("/search")
  .get(cacheMiddleware("searchResults"), stockController.searchForStocks);
router.route("/news").get(cacheMiddleware("news"), stockController.getNews);
router.route("/home").get(cacheMiddleware("home"), stockController.getHomeData);
router
  .route("/chart/:symbol")
  .get(cacheMiddleware("chart"), stockController.getStockChart);

export default router;
