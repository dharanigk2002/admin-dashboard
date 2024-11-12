import { v2 as cloudinary } from "cloudinary";
import { Employee } from "../model/employee.model.js";

export async function createEmployee(req, res) {
  try {
    const { name, email, mobile, gender, course, designation } = req.body;
    const isExists = await Employee.findOne({ email });
    if (isExists)
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    const mno = await Employee.findOne({ mobile });
    if (mno)
      return res
        .status(409)
        .json({ success: false, message: "Please enter your mobile number" });
    if (!/^[6-9]{1}[0-9]{9}/.test(mobile))
      return res
        .status(400)
        .json({ success: false, message: "Invalid mobile number" });
    const profile = req.file;
    const extn = ["jpg", "png"].includes(
      profile.filename.split(".").pop().toLowerCase()
    );
    if (!extn)
      return res.status(400).json({
        success: false,
        message: "Image should only be in jpg and png format",
      });
    const url = await cloudinary.uploader.upload(profile.path);
    const newEmployee = new Employee({
      name,
      email,
      mobile,
      gender,
      designation,
      course,
      image: url.secure_url,
    });
    await newEmployee.save();
    return res.status(200).json({ success: true, employee: newEmployee });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getEmployees(req, res) {
  try {
    const employees = await Employee.find({})
      .select("-_id -__v  -updatedAt")
      .sort({ id: 1, name: 1 });
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function deleteEmployee(req, res) {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({ id });
    if (!employee)
      return res
        .status(404)
        .json({ success: false, message: "No employees found" });
    await cloudinary.uploader.destroy(
      employee.image.split("/").pop().split(".").at(0)
    );
    await Employee.deleteOne({ id });
    return res.status(200).json({
      success: true,
      message: `Employee id${id} deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateEmployee(req, res) {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({ id });
    if (!employee)
      return res
        .status(404)
        .json({ success: false, message: "No employees found" });
    const update = req.body;
    const employees = await Employee.find({ id: { $ne: id } });
    const emailExists = employees.find((emp) => emp.email === update.email);
    const mnoExists = employees.find((emp) => emp.mobile === update.mobile);
    if (emailExists)
      return res
        .status(409)
        .json({ success: false, message: "Email id already exists" });
    if (mnoExists)
      return res
        .status(409)
        .json({ success: false, message: "Invalid mobile number" });
    const profile = req.file;
    if (profile) {
      await cloudinary.uploader.destroy(
        employee.image.split("/").pop().split(".")[0]
      );
      const url = await cloudinary.uploader.upload(profile.path);
      employee.image = url.secure_url;
    }
    Object.assign(employee, update);
    await employee.save();
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function getEmployeeById(req, res) {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({ id }).select(
      "-_id -__v -createdAt -updatedAt"
    );
    if (!employee)
      return res
        .status(404)
        .json({ success: false, message: "No employees found" });
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
