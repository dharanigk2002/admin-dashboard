import express from "express";
import cors from "cors";
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectDb } from "./db/connectDb.js";
import loginRouter from "./controller/login.router.js";
import employeeRouter from "./controller/employee.router.js";
import { authUser } from "./middleware/authUser.js";
import path from "path";

const PORT = process.env.PORT || 5000;
const server = express();
const __dirname = path.resolve();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
server.use(cookieParser());
server.use(
  express.json({
    limit: "5MB",
  })
);
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use("/api/admin", loginRouter);
server.use("/api/employee", authUser, employeeRouter);
server.use(express.static(path.join(__dirname, "backend", "public")));

server.get("/*", (_, res) =>
  res.sendFile(path.join(__dirname, "backend", "public", "index.html"))
);
server.listen(PORT, () => {
  console.log("Listening on port", PORT);
  connectDb();
});
