import * as z from "zod";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

// Load environment variables from .env file
dotenv.config();

// Define SMTP configuration schema
const smtpConfigSchema = z.object({
  host: z.string(),
  port: z.number(),
  auth: z.object({
    user: z.string().email(),
    pass: z.string(),
  }),
});

// Load SMTP configuration from environment variables
const smtpConfig = {
  host: process.env.SMTP_HOST || "",
  port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 0,
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
};

// Validate SMTP configuration against schema
try {
  smtpConfigSchema.parse(smtpConfig);
  console.log("SMTP configuration is valid.");
} catch (err) {
  console.log(`SMTP configuration is invalid: ${err.message}`);
}

const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: "youremail@gmail.com",
    pass: "password",
  },
  secure: true,
});
