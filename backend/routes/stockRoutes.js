import express from "express";
import * as stockController from "../controllers/stockController.js";
import cacheMiddleware from "../services/cacheMiddleware.js";

const router = express.Router();

router
  .route("/quote/:symbol")
  .get(cacheMiddleware("quote"), stockController.getStockQuote);
router.route("/profile/:symbol").get(stockController.getCompanyProfileInfo);
router.route("/search").get(stockController.searchForStocks);
router.route("/news").get(stockController.getNews);
router.route("/home").get(stockController.getHomeData);
router.route("/chart/:symbol").get(stockController.getStockChart);

export default router;
