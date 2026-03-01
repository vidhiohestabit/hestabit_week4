import express from "express";
import connectDB from "./db.js";
import accountRoutes from "../routes/account.routes.js";

const createApp = async () => {
  const app = express();

  app.use(express.json());

  // DB connect
  await connectDB();

  // Mount routes
  app.use("/accounts", accountRoutes);

  return app;
};

export default createApp;