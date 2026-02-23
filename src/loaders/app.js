import express from "express";
import logger from "../utils/logger.js";
import connectDB from "./db.js";

export default async function createApp() {
  const app = express();

  // Middlewares
  app.use(express.json());
  logger.info("Middlewares loaded");

  // Database
  await connectDB();

  // Routes
  app.get("/health", (req, res) => {
    res.json({ status: "OK" });
  });

  logger.info("Routes mounted: 1 endpoint");

  return app;
}
