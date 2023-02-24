import express from "express";
import { Request, Response, NextFunction } from "express";

import rootRouter from "./routes/index";
import santaRouter from "./routes/santa";
import { winstonLogger, winstonErrorLogger } from "./middleware/logging";

const app = express();

// Express middleware for parsing JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static folder
app.use(express.static("public"));

// Routers
app.use("/", rootRouter);
app.use("/santa", santaRouter);

// Express Logging middleware
app.use(winstonLogger);
app.use(winstonErrorLogger);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

export default app;
