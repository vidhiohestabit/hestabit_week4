import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
      index: true,
    },

    productName: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },

    expiresAt: {
      type: Date,
      index: { expires: "24h" }, // TTL index
    },
  },
  {
    timestamps: true,
  }
);

//
// 📊 Compound Index for query performance
//
OrderSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model("Order", OrderSchema);