import { Router } from "express";
import { checkSchema } from "express-validator";
import {
  createTodo,
  deleteTodo,
  getTodoList,
  updateTodo,
} from "../controllers/todoController";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { todoSchema } from "../schemas/todoSchema";

const router = Router();

router.get("/", authenticateJWT, getTodoList);

router.post("/create", authenticateJWT, checkSchema(todoSchema), createTodo);

router.delete("/delete/:id", authenticateJWT, deleteTodo);

router.patch("/edit/:id", authenticateJWT, updateTodo);

export default router;
