import { Router } from "express";
import { checkSchema } from "express-validator";
import {
  createTodo,
  deleteTodo,
  getTodoList,
  updateTodo,
} from "../controllers/todoController";
import { isAuthenticated } from "../middlewares/authMiddleware";
import { todoSchema } from "../schemas/todoSchema";

const router = Router();

router.get("/", isAuthenticated, getTodoList);

router.post("/create", isAuthenticated, checkSchema(todoSchema), createTodo);

router.delete("/delete/:id", isAuthenticated, deleteTodo);

router.patch("/edit/:id", isAuthenticated, updateTodo);

export default router;
