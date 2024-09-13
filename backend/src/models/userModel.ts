import mongoose from "mongoose";

export interface UserType extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  todos: mongoose.Schema.Types.ObjectId[];
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

const User = mongoose.model("User", UserSchema);
export default User;
