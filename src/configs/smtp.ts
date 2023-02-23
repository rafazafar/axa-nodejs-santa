import * as z from "zod";
import nodemailer from "nodemailer";

import env from "./env";

// Define SMTP configuration schema
const smtpConfigSchema = z.object({
  host: z.string(),
  port: z.coerce.number(),
  auth: z.object({
    user: z.string().email(),
    pass: z.string(),
  }),
  secure: z.coerce.boolean().default(false),
});

// Load SMTP configuration from environment variables
const smtpConfig = {
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  auth: {
    user: env.SMTP_USERNAME,
    pass: env.SMTP_PASSWORD,
  },
  secure: env.SMTP_SECURE,
};

console.table(smtpConfig);

// Validate SMTP configuration against schema
const config = smtpConfigSchema.parse(smtpConfig);

const transporter = nodemailer.createTransport(config);

export default transporter;
