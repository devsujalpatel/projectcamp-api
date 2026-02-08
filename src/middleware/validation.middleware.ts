import type { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export function validateData(schema: z.ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));

        return res.status(400).json({
          error: "Invalid request body",
          details: errorMessages,
        });
      }

      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  };
}
