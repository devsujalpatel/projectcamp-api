import "dotenv/config";
import type ms from "ms";

const config = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV,
  WHITELIST_ORIGINS: ["http://localhost:5173"],
  MONGO_URI: process.env.MONGO_URI,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN as ms.StringValue,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN as ms.StringValue,
  WHITELIST_ADMINS_MAILS: ["testmail@gmail.com"],
  MAILTRAP_SMTP_HOST: process.env.MAILTRAP_SMTP_HOST as string,
  MAILTRAP_SMTP_PORT: process.env.MAILTRAP_SMTP_PORT,
  MAILTRAP_SMTP_USER: process.env.MAILTRAP_SMTP_USER as string,
  MAILTRAP_SMTP_PASS: process.env.MAILTRAP_SMTP_PASS as string,
};

export default config;
