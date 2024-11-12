import bcrypt from "bcrypt";
import { Login } from "../model/login.model.js";
import { generateToken } from "../utils/generateToken.js";

export async function createAdmin(req, res) {
  const { username, password } = req.body;

  try {
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, message: "username and password is required" });
    const isExist = await Login.findOne({ username });
    if (isExist)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    if (password.length < 6)
      return res.status(403).json({
        success: false,
        message: "Password must be atleast 6 chars length",
      });
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(password, salt);
    const newUser = new Login({
      username,
      password: hashPwd,
    });
    generateToken(newUser._id, res);
    await newUser.save();
    return res
      .status(200)
      .json({ success: true, message: "user created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function loginAdmin(req, res) {
  const { username, password } = req.body;
  try {
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, message: "username and password is required" });
    const user = await Login.findOne({ username });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    generateToken(user._id, res);
    return res.status(200).json({ success: true, username: user.username });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function logoutAdmin(req, res) {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully!!!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getCurrentAdmin(req, res) {
  const { user } = req.body;
  return res.status(200).json({ success: true, user: user.username });
}
