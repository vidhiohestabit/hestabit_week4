import fs from "fs";
import path from "path";

const logDir = "logs";

// ensure logs folder exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

export const logRequest = (message) => {
  const logPath = path.join(logDir, "app.log");
  const logMessage = `${new Date().toISOString()} - ${message}\n`;

  fs.appendFileSync(logPath, logMessage);
};

export const logError = (message) => {
  const logPath = path.join(logDir, "error.log");
  const logMessage = `${new Date().toISOString()} - ${message}\n`;

  fs.appendFileSync(logPath, logMessage);
};