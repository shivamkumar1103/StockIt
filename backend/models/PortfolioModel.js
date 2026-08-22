import moongose from "mongoose";

const holdingSchema = new moongose.Schema(
  {
    symbol: {
      type: String,
      required: [true, "Symbol is required"],
      uppercase: true,
      trim: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
    averagePrice: {
      type: Number,
    },
  },
  {
    _id: false,
  },
);

const portfolioSchema = new moongose.Schema(
  {
    user: {
      type: moongose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    holdings: [holdingSchema],
  },
  {
    timestamps: true,
  },
);

export default moongose.model("Portfolio", portfolioSchema);
