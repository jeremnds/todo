import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import "../strategies/jwtStrategy";
dotenv.config();

const secretKey = process.env.SECRET_KEY;

if (!secretKey) throw new Error("SECRET_KEY is missing!");

export const authenticateJWT = passport.authenticate("jwt", { session: false });

export const isNotAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: any, user: Express.User | undefined) => {
      if (err) return next(err);
      if (user) {
        return res.status(403).json({ message: "You are already logged in" });
      }
      next();
    }
  )(req, res, next);
};
