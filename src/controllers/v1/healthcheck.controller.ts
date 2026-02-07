import { ApiResponse } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import type { Request, Response, NextFunction } from "express";

export const healthCheck = asyncHandler(
  async (req: Request, res: Response) => {
    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        data: {},
        message: "Server is running",
      }),
    );
  },
);
