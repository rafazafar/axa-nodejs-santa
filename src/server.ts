import express from "express";
import winston from "winston";
import expressWinston from "express-winston";

import env from "./configs/env";

const app = express();

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
app.use(
  expressWinston.logger({
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
  })
);

// Express middleware for parsing JSON request bodies
app.use(express.json());

// Express route handler with Zod validation
app.post("/users", (req, res) => {
  try {
    // schema.parse(req.body);
    res.send("Request is valid.");
  } catch (err) {
    // res.status(400).send(err.message);
  }
});

// Express error handler
app.use((err: any, req: express.Request, res: express.Response) => {
  logger.error(err.stack);
  res.status(500).send("Internal server error.");
});

app.listen(env.PORT, () => {
  console.log(`Server is listening on port ${env.PORT}`);
});
