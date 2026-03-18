import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },

    productName: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    // TTL Example 
    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);


// 🔹 Compound Index 
OrderSchema.index({ status: 1, createdAt: -1 });


// 🔹 TTL Index (optional)
OrderSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });


export default mongoose.model("Order", OrderSchema);