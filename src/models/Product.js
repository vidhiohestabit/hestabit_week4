import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    tags: [String],
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;