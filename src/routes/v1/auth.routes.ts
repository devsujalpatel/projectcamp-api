import { Router } from "express";
import { registerUser } from "@/controllers/v1/auth/register.controller";
import { validateData } from "@/middleware/validation.middleware";
import {
  userLoginSchema,
  userRegistrationSchema,
} from "@/validators/user.schema.zod";
import { loginUser } from "@/controllers/v1/auth/login.controller";

const router = Router();

router.post("/register", validateData(userRegistrationSchema), registerUser);
router.post("/login", validateData(userLoginSchema), loginUser);

export default router;
