import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployees,
  updateEmployee,
} from "./employee.controller.js";
import { upload } from "../middleware/multer.js";

const employeeRouter = express.Router();

employeeRouter.post("/create", upload.single("image"), createEmployee);
employeeRouter.get("/all", getEmployees);
employeeRouter.delete("/delete/:id", deleteEmployee);
employeeRouter.put("/update/:id", upload.single("image"), updateEmployee);
employeeRouter.get("/:id", getEmployeeById);
export default employeeRouter;
