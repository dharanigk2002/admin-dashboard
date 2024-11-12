import mongoose from "mongoose";

const loginSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is mandatory"],
    },
    password: {
      type: String,
      minLength: [6, "Password must be atleast 6 characters length"],
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Login =
  mongoose.models.Login || mongoose.model("Login", loginSchema);
