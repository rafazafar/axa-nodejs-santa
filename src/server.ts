import express from "express";
import type { Response } from "express";

import env from "./configs/env";
import { requestLogger, logger } from "./middleware/logging";
import emailRouter from "./controllers/email";

const app = express();

// Express middleware for logging incoming requests
// app.use(requestLogger);

// Express middleware for parsing JSON request bodies
app.use(express.json());

// add routers here
app.use("/", emailRouter);

// Express error handler
app.use((err: any, res: Response) => {
  logger.error(err.stack);
  res.status(500).send("Internal server error.");
});

app.listen(env.PORT, () => {
  console.log(`Server is listening on port ${env.PORT}`);
});
