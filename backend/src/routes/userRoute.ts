import { Router } from "express";
import { checkSchema } from "express-validator";
import {
  getStatus,
  login,
  logout,
  register,
} from "../controllers/userController";
import {
  isAuthenticated,
  isNotAuthenticated,
} from "../middlewares/authMiddleware";
import { loginSchema, registerSchema } from "../schemas/userSchema";

const router = Router();

router.post(
  "/register",
  isNotAuthenticated,
  checkSchema(registerSchema),
  register
);

router.post("/login", isNotAuthenticated, checkSchema(loginSchema), login);

router.get("/status", getStatus);

router.post("/logout", isAuthenticated, logout);

export default router;
