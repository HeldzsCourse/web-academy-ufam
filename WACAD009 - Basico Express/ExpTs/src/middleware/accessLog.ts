import { Request, Response, NextFunction } from "express";
import fs from "fs/promises";
import path from "path";

type LogFormat = "detailed" | "simple";

const formatLogMessage = (format: LogFormat, req: Request): string => {
  switch (format) {
    case "detailed":
      return `${new Date().toISOString()}, ${req.url}, ${req.method}, HTTP/${req.httpVersion}, ${req.get("User-Agent")}\n`;
    case "simple":
      return `${new Date().toISOString()} ${req.method} ${req.url}\n`;
    default:
      return `${new Date().toISOString()} ${req.method} ${req.url}\n`;
  }
};

export const accessLog = (format: LogFormat) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const logDir = process.env.LOG_DIR || "logs";

    const logFilePath = path.join(process.cwd(), logDir, "access.log");
    const logDirectory = path.dirname(logFilePath);

    const logMessage = formatLogMessage(format, req);

    try {
      await fs.mkdir(logDirectory, { recursive: true });

      await fs.appendFile(logFilePath, logMessage);
    } catch (error) {
      console.error("Falha ao salvar o log de acesso:", error);
    }

    next();
  };
};
