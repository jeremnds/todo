import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import todoRoute from "./routes/todoRoute";
import userRouter from "./routes/userRoute";
dotenv.config();

const app = express();
const mongoUri = process.env.MONGODB_URI;
const frontUrl = process.env.FRONT_URL;
const nodeEnv = process.env.NODE_ENV;
if (!nodeEnv) throw new Error("NODE_ENV is missing");
if (!frontUrl) throw new Error("FRONT_URL is missing");
if (!mongoUri) throw new Error("MONGODB_URI is missing");

mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(`Error: ${err}`));

app.use(express.json());

const corsOptions = {
  origin: frontUrl,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(passport.initialize());

app.use("/api/todos", todoRoute);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello world!" });
});

const PORT = process.env.PORT || 5000;

if (!PORT) throw new Error("PORT is missing");

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
