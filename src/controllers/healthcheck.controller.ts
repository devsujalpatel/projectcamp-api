import { ApiResponse } from "@/utils/api-response";
import type { Request, Response, NextFunction } from "express";

const healthCheck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        data: {},
        message: "Server is running",
      }),
    );
  } catch (error) {
    next(error);
  }
};

export { healthCheck };
