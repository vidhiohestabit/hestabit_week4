import config from "./config/index.js";
import logger from "./utils/logger.js";
import createApp from "./loaders/app.js";

async function startServer() {
  const app = await createApp();

  const server = app.listen(config.port, () => {
    logger.info(`Server started on port ${config.port}`);
  });

  // Graceful shutdown
  process.on("SIGTERM", () => {
    logger.info("SIGTERM received. Shutting down...");
    server.close(() => {
      process.exit(0);
    });
  });
}

startServer();
