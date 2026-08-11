import moongoose from "mongoose";

const watchlistItemSchema = new moongoose.Schema(
  {
    user: {
      type: moongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required!"],
    },
    symbol: {
      type: String,
      required: [true, "Symbol is required!"],
      trim: true,
      uppercase: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    exchange: String,

    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  },
);

const watchlistSchema = new moongoose.Schema(
  {
    user: {
      type: moongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required!"],
      unique: true,
    },
    stocks: [watchlistItemSchema],
  },
  {
    timestamps: true,
  },
);

export default moongoose.model("Watchlist", watchlistSchema);
