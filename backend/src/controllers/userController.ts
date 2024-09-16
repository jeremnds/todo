import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import passport from "passport";
import User from "../models/userModel";
import { generateToken } from "../strategies/jwtStrategy";
import "../strategies/localStrategy";
import { hashPassword } from "../utils/helpers";

dotenv.config();

const secretKey = process.env.SECRET_KEY;

if (!secretKey) throw new Error("SECRET_KEY is missing!");

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const data = matchedData(req);
  data.password = await hashPassword(data.password);

  const newUser = new User(data);
  try {
    const savedUser = await newUser.save();
    return res.status(201).send(savedUser);
  } catch (error: any) {
    if (error.code === 11000) {
      if (error.keyPattern?.email) {
        return res.status(400).json({ message: "Email already exists" });
      }
      if (error.keyPattern?.username) {
        return res.status(400).json({ message: "Username already exists" });
      }
    }
    console.log(error);
    return res.sendStatus(400);
  }
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errorMessage = result.array()[0].msg;
    return res.status(400).send({ message: errorMessage });
  }
  passport.authenticate(
    "local",
    { session: false },
    (
      err: Error | null,
      user: Express.User | false,
      info: { message?: string } | undefined
    ) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: info?.message });

      const token = generateToken(user);
      return res.json({ token });
    }
  )(req, res, next);
};
