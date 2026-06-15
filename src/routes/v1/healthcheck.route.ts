import { healthCheck } from "#/controllers/v1/healthcheck.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", healthCheck);

export default router;
