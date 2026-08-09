import AppError from "../utils/appError.js";
import { getHome } from "../services/homeService.js";
import {
  getQuote,
  getCompanyProfile,
  searchStocks,
  getMarketNews,
  getHistoricalData,
} from "../services/stockService.js";

export const getStockQuote = async (req, res, next) => {
  if (!req.params.symbol || !req.query.market) {
    return next(new AppError("Symbol and market are required", 400));
  }

  const quote = await getQuote(req.params.symbol, req.query.market);
  res.status(200).json({
    status: "success",
    data: quote,
  });
};

export const getCompanyProfileInfo = async (req, res, next) => {
  if (!req.params.symbol || !req.query.market) {
    return next(new AppError("Symbol and market are required", 400));
  }

  const profile = await getCompanyProfile(
    req.params.symbol,
    req.query.market,
  );
  res.status(200).json({
    status: "success",
    data: profile,
  });
};

export const searchForStocks = async (req, res, next) => {
  if (!req.query.q || !req.query.market) {
    return next(new AppError("Query (q) and market are required", 400));
  }

  const results = await searchStocks(req.query.q, req.query.market);
  res.status(200).json({
    status: "success",
    data: results,
  });
};

export const getNews = async (req, res, next) => {
  if (!req.query.market) {
    return next(new AppError("Market is required", 400));
  }

  const news = await getMarketNews(
    req.query.category,
    req.query.market,
    req.query.minId,
  );
  res.status(200).json({
    status: "success",
    data: news,
  });
};

export const getHomeData = async (req, res, next) => {
  if (!req.query.market) {
    return next(new AppError("Market is required", 400));
  }

  const homeData = await getHome(req.query.market);
  res.status(200).json({
    status: "success",
    data: homeData,
  });
};

export const getStockChart = async (req, res, next) => {
  if (!req.params.symbol || !req.query.interval || !req.query.market) {
    return next(new AppError("Symbol, interval, and market are required", 400));
  }

  const outputsize = parseInt(req.query.outputsize, 10) || 30;
  const historicalData = await getHistoricalData(
    req.params.symbol,
    req.query.interval,
    req.query.market,
    outputsize,
  );
  res.status(200).json({
    status: "success",
    data: historicalData,
  });
};
