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
  console.log("getQuote callled");
  // 1. Validate query parameters
  if (!req.params.symbol || !req.query.market) {
    return next(new AppError("Symbol and market are required", 400));
  }
  // 2. Fetch and send stock quote
  try {
    const quote = await getQuote(req.params.symbol, req.query.market);
    res.status(200).json({
      status: "success",
      data: quote,
    });
  } catch (error) {
    console.error("Error fetching stock quote:", error);
    return next(new AppError("Failed to fetch stock quote", 500));
  }
};

export const getCompanyProfileInfo = async (req, res, next) => {
  // 1. Validate query parameters
  if (!req.params.symbol || !req.query.market) {
    return next(new AppError("Symbol and market are required", 400));
  }
  // 2. Fetch and send company profile
  try {
    const profile = await getCompanyProfile(
      req.params.symbol,
      req.query.market,
    );
    res.status(200).json({
      status: "success",
      data: profile,
    });
  } catch (error) {
    console.error("Error fetching company profile:", error);
    return next(new AppError("Failed to fetch company profile", 500));
  }
};

export const searchForStocks = async (req, res, next) => {
  // 1. Validate query parameters
  if (!req.query.q || !req.query.market) {
    return next(new AppError("Query (q) and market are required", 400));
  }

  // 2. Fetch and send search results
  try {
    const results = await searchStocks(req.query.q, req.query.market);
    res.status(200).json({
      status: "success",
      data: results,
    });
  } catch (error) {
    console.error("Error searching stocks:", error);
    return next(new AppError("Failed to search stocks", 500));
  }
};

export const getNews = async (req, res, next) => {
  // 1. Validate query parameters
  if (!req.query.market) {
    return next(new AppError("Market is required", 400));
  }

  // 2. Fetch and send news
  try {
    const news = await getMarketNews(
      req.query.category,
      req.query.market,
      req.query.minId,
    );
    res.status(200).json({
      status: "success",
      data: news,
    });
  } catch (error) {
    console.error("Error fetching market news:", error);
    return next(new AppError("Failed to fetch market news", 500));
  }
};

export const getHomeData = async (req, res, next) => {
  // 1. Validate query parameters
  if (!req.query.market) {
    return next(new AppError("Market is required", 400));
  }
  // 2. Fetch and send homepage data
  try {
    const homeData = await getHome(req.query.market);
    res.status(200).json({
      status: "success",
      data: homeData,
    });
  } catch (error) {
    console.error("Error fetching home data:", error);
    return next(new AppError("Failed to fetch home data", 500));
  }
};

export const getStockChart = async (req, res, next) => {
  // 1. Validate query parameters
  if (!req.params.symbol || !req.query.interval || !req.query.market) {
    return next(new AppError("Symbol, interval, and market are required", 400));
  }
  // 2. Fetch and send stock chart data
  try {
    const historicalData = await getHistoricalData(
      req.params.symbol,
      req.query.interval,
      req.query.market,
    );
    res.status(200).json({
      status: "success",
      data: historicalData,
    });
  } catch (error) {
    console.error("Error fetching historical data:", error);
    return next(new AppError("Failed to fetch historical data", 500));
  }
};
