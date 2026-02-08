import { Router } from "express";
import { registerUser } from "@/controllers/v1/auth/register.controller";
import { validateData } from "@/middleware/validation.middleware";
import { userRegistrationSchema } from "@/validators/user.schema.zod";

const router = Router();

router.post("/register", validateData(userRegistrationSchema), registerUser);

export default router;
