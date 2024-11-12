import express from "express";
import {
  createAdmin,
  loginAdmin,
  logoutAdmin,
  getCurrentAdmin,
} from "./login.controller.js";
import { authUser } from "../middleware/authUser.js";

const loginRouter = express.Router();

loginRouter.post("/create", createAdmin);
loginRouter.post("/login", loginAdmin);
loginRouter.get("/logout", authUser, logoutAdmin);
loginRouter.get("/valid", authUser, getCurrentAdmin);

export default loginRouter;
