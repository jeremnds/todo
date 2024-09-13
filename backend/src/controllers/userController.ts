import { NextFunction, Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import passport from "passport";
import User from "../models/userModel";
import "../strategies/localStrategy";
import { hashPassword } from "../utils/helpers";

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
    (
      err: Error | null,
      user: Express.User | false,
      info: { message?: string } | undefined
    ) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: info?.message });

      req.logIn(user, (err) => {
        if (err) return next(err);
        const userData = {
          _id: user._id,
          username: user.username,
        };
        res.status(200).json({ message: "Logged in successfully", userData });
      });
    }
  )(req, res, next);
};

export const getStatus = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export const logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to log out" });
    }

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to destroy session" });
      }

      res.clearCookie("connect.sid");
      return res.status(200).json({ message: "Successfully logged out" });
    });
  });
};
