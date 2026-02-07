import { Router } from "express";
import { registerUser } from "@/controllers/v1/auth/register.controller";

const router = Router();

router.post("/register", registerUser);

export default router;
