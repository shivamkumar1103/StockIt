import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

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

app.use(globalErrorHandler);

export default app;
