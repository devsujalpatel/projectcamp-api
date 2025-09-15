import { ApiError } from '@/utils/api-error';
import { ApiResponse } from '@/utils/api-response';
import { asyncHandler } from '@/utils/async-handler';
import { Request, Response } from 'express';

export const healcheck = asyncHandler(async (req: Request, res: Response) => {
  res
    .status(200)
    .json(new ApiResponse({ statusCode: 200, data: 'Server is Running' }));
});
