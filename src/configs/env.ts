import { z } from "zod";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();
console.log(process.env);

let envSchema = z.object({
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string(),
  SMTP_USERNAME: z.string(),
  SMTP_PASSWORD: z.string(),
  PORT: z.string().default("3000"),
});

let env = envSchema.parse(process.env);

export default env;
