import winston from "winston";
import expressWinston from "express-winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

const winstonLogger = expressWinston.logger({
  winstonInstance: logger,
  meta: true,
  msg: "{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
});

const winstonErrorLogger = expressWinston.errorLogger({
  winstonInstance: logger,
  meta: true,
  msg: "{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
});

export { winstonLogger, winstonErrorLogger };
