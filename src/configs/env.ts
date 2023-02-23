import { z } from "zod";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

let envSchema = z.object({
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_USERNAME: z.string(),
  SMTP_PASSWORD: z.string(),
  SMTP_SECURE: z.coerce.boolean().default(false),
  PORT: z.coerce.number().default(3000),
});

let env = envSchema.parse(process.env);

export default env;
