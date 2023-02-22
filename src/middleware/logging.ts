import winston from "winston";
import expressWinston from "express-winston";
import { Request, Response } from "express";

// Winston logger configuration
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "my-express-app" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// Express middleware for logging incoming requests
export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: true,
});

// Express middleware for logging errors
export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log" }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
});

// Express error handler
export const errorHandler = (err: any, req: Request, res: Response) => {
  logger.error(err.stack);
  res.status(500).send("Internal server error.");
};
