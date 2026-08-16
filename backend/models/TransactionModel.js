import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["deposit", "buy", "sell"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    balanceBefore: {
      type: Number,
      required: true,
      min: 0,
    },

    balanceAfter: {
      type: Number,
      required: true,
      min: 0,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },

    trade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trade",
    },

    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

transactionSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model("Transaction", transactionSchema);
