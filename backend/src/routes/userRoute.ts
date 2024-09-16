import { Router } from "express";
import { checkSchema } from "express-validator";
import { login, register } from "../controllers/userController";
import { isNotAuthenticated } from "../middlewares/authMiddleware";
import { loginSchema, registerSchema } from "../schemas/userSchema";

const router = Router();

router.post(
  "/register",
  isNotAuthenticated,
  checkSchema(registerSchema),
  register
);

router.post("/login", isNotAuthenticated, checkSchema(loginSchema), login);

export default router;
