import { healcheck } from '@/controllers/healthcheck.controller';
import { Router } from 'express';

const router = Router();

router.get('/healthcheck', healcheck);

export default router;
