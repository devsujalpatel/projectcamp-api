import { ApiError } from '@/utils/api-error';
import { ApiResponse } from '@/utils/api-response';
import { Router } from 'express';

const router = Router();

router.get('/healthcheck', (req, res) => {
  try {
    res
      .status(200)
      .json(new ApiResponse({ statusCode: 200, data: {}, message: 'success' }));
  } catch (error) {
    res.status(500).json(new ApiError({ statusCode: 500, message: 'error' }));
  }
});

export default router;
