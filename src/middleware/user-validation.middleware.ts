// import { ApiError } from "@/utils/api-error";
// import type { Request, Response, NextFunction } from "express";
// import { z } from "zod";

// export function validateData<T extends z.ZodTypeAny>(schema: T) {
//   return (req: Request, _res: Response, next: NextFunction) => {
//     const { accessToken } = req.cookies;

//     if (!result.success) {
//       const errorMessages = result.error.issues.map((issue) => ({
//         field: issue.path.join("."),
//         message: issue.message,
//       }));

//       return next(
//         new ApiError({
//           statusCode: 400,
//           message: "Invalid request body",
//           errors: errorMessages,
//         }),
//       );
//     }

//     req.body = result.data;
//     next();
//   };
// }
