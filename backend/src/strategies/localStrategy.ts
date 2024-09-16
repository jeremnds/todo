import { ObjectId } from "mongoose";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/userModel";
import { comparePassword } from "../utils/helpers";

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: ObjectId, done) => {
  try {
    const findUser: any = await User.findById(id);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new LocalStrategy(
    { usernameField: "identifier" },
    async (identifier, password, done) => {
      try {
        const query = identifier.includes("@")
          ? { email: identifier }
          : { username: identifier };

        const user: any = await User.findOne(query).select("+password");
        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const compare = await comparePassword(password, user.password);
        if (!compare) {
          return done(null, false, { message: "Incorrect Password" });
        }

        return done(null, user);
      } catch (error) {
        return done(error, false, {
          message: "An error occurred during authentication",
        });
      }
    }
  )
);
