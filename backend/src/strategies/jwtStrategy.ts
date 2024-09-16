import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import User from "../models/userModel";

dotenv.config();

const secretKey = process.env.SECRET_KEY;

if (!secretKey) throw new Error("SECRET_KEY is missing!");

export type jwtUser = {
  _id: string | ObjectId;
  username: string;
};

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

passport.use(
  new Strategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload._id);

      if (user) {
        return done(null, { _id: user._id, username: user.username });
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

export const generateToken = (user: any) => {
  return jwt.sign({ _id: user._id, username: user.username }, secretKey, {
    expiresIn: "1h",
  });
};
