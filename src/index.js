import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/index.js"; // your db connection
import { securityMiddleware } from "./middlewares/security.js";
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

// Global Security Middlewares
securityMiddleware(app);

// Routes
app.use("/products", productRoutes);
app.use("/users", userRoutes);

const startServer = async () => {
  await connectDB(); // ensure this is awaited
  console.log("✅ DB connected");

  app.listen(process.env.PORT || 4000, () => {
    console.log(`🚀 Secure Server running on port ${process.env.PORT || 4000}`);
  });
};

startServer();