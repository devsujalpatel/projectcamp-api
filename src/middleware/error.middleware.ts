import type { Request, Response, NextFunction } from "express";
import { ApiError } from "@/utils/api-error";

export const errorHandler = (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors ?? [],
    });
  }

  // fallback for unknown errors
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
