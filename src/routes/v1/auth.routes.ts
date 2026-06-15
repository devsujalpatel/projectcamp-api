import { Router } from "express";
import { registerUser } from "#/controllers/v1/auth/register.controller.js";
import { validateData } from "#/middleware/validation.middleware.js";
import {
  userLoginSchema,
  userRegistrationSchema,
} from "#/validators/user.schema.zod.js";
import { loginUser } from "#/controllers/v1/auth/login.controller.js";
import { verifyUser } from "#/controllers/v1/auth/verify.controller.js";

const router = Router();

router.post("/register", validateData(userRegistrationSchema), registerUser);
router.post("/login", validateData(userLoginSchema), loginUser);
router.get("/verify-email/:unhashedToken", verifyUser);

export default router;
