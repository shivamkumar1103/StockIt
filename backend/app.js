import express from "express";
import morgan from "morgan";
import AppError from "./utils/appError.js";
import userRouter from "./routes/userRoutes.js";
import stockRouter from "./routes/stockRoutes.js";
import watchlistRouter from "./routes/watchlistRoutes.js";
import tradeRouter from "./routes/tradeRoutes.js";
import portfolioRouter from "./routes/portfolioRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// dotenv.config({ path: "./config.env" });

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/stocks", stockRouter);
app.use("/api/v1/watchlist", watchlistRouter);
app.use("/api/v1/trade", tradeRouter);
app.use("/api/v1/trading", portfolioRouter);

app.use((req, res, next) => {
  const err = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404,
  );
  next(err);
});

app.use((err, req, res, next) => {
  // console.error("Error:", err.stack);
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message || "Internal Server Error",
  });
});

export default app;
