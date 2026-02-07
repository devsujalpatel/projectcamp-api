import jwt from "jsonwebtoken";
import config from "@/config";
import crypto from "crypto";
// Types
import { Types } from "mongoose";

export const generateAccessToken = (userId: Types.ObjectId): string => {
  return jwt.sign({ userId }, config.JWT_ACCESS_SECRET, {
    expiresIn: config.JWT_ACCESS_EXPIRES_IN,
    subject: "accessApi",
  });
};

export const generateRefreshToken = (userId: Types.ObjectId): string => {
  return jwt.sign({ userId }, config.JWT_REFRESH_SECRET, {
    expiresIn: config.JWT_REFRESH_EXPIRES_IN,
    subject: "refreshToken",
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, config.JWT_ACCESS_SECRET);
};
export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, config.JWT_REFRESH_SECRET);
};

export const generateTemporaryToken = () => {
  const unHashedToken = crypto.randomBytes(20).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");

  const tokenExpiry = new Date(Date.now() + 20 * 60 * 1000); // 20 minutes from now

  return { unHashedToken, hashedToken, tokenExpiry };
};
