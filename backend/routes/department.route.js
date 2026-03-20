import express from "express";
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} from "../controller/department.controller.js";
import { uploadDepartment } from "../utils/multerHandler.js";
import islogin from "../middleware/islogin.js";

export const departmentroutes = express.Router();

departmentroutes.get("/", getAllDepartments);
departmentroutes.get("/:id", getDepartmentById);
departmentroutes.post(
  "/",
  islogin,
  uploadDepartment.single("image"),
  createDepartment,
);
departmentroutes.put(
  "/:id",
  islogin,
  uploadDepartment.single("image"),
  updateDepartment,
);
departmentroutes.delete("/:id", islogin, deleteDepartment);
