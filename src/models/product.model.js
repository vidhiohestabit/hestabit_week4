import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tags: {
      type: String,
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;