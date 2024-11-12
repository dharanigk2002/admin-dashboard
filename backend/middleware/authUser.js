import jwt from "jsonwebtoken";
import { Login } from "../model/login.model.js";

export async function authUser(req, res, next) {
  const { jwt: token } = req.cookies;
  try {
    if (!token || token === undefined)
      return res
        .status(403)
        .json({ success: false, message: "Login to perform actions" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Login.findById(decoded.id);
    if (!user)
      return res.status(403).json({ success: false, message: "No user found" });
    req.body.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
