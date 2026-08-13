import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    symbol: {
      type: String,
      required: [true, "Symbol is required"],
      uppercase: true,
      trim: true,
    },

    side: {
      type: String,
      enum: ["buy", "sell"],
      required: [true, "Side is required"],
    },

    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0.000001, "Quantity must be greater than 0"],
    },

    type: {
      type: String,
      enum: ["market", "limit"],
      required: [true, "Type is required"],
    },

    price: {
      type: Number,
      min: [0, "Price must be greater than or equal to 0"],
    },

    executedPrice: {
      type: Number,
      min: [0, "Executed price must be greater than or equal to 0"],
    },

    status: {
      type: String,
      enum: ["pending", "executed", "cancelled", "rejected"],
      default: "pending",
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

OrderSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model("Order", OrderSchema);
