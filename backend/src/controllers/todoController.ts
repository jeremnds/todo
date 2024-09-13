import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import mongoose from "mongoose";
import Todo from "../models/todoModel";
import { AuthenticatedRequest } from "../types/passport";

export const createTodo = async (req: AuthenticatedRequest, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errorMessage = result.array()[0].msg;
    return res.status(400).json({ message: errorMessage });
  }
  const data = matchedData(req);
  const userId = req.user?._id;
  const newTodo = new Todo({
    ...data,
    user: userId,
  });
  try {
    const savedTodo = await newTodo.save();
    return res.status(201).json(savedTodo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to create todo", error });
  }
};

export const getTodoList = async (req: Request, res: Response) => {
  const userId = req.user?._id;

  try {
    const todoList = await Todo.find({ user: userId }).sort({
      createdAt: -1,
    });
    return res.status(200).json(todoList);
  } catch (error) {
    console.error("Error fetching todo list:", error);
    return res.status(500).json({ message: "Failed to fetch todos", error });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const todoId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(todoId)) {
    return res.status(400).json({ message: "Invalid Todo ID" });
  }
  try {
    const todo = await Todo.findOneAndDelete({
      _id: todoId,
      user: userId,
    });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const userId = req.user?._id;

  const todoId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(todoId)) {
    return res.status(400).json({ message: "Invalid Todo ID" });
  }
  try {
    const { title, completed } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: todoId, user: userId },
      { title, completed },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json(todo);
  } catch (error) {
    console.error("Error updating todo:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};
