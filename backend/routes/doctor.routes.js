import express from "express";
import { createDoctor, getAllDoctors, getDoctorById, updateDoctor, deleteDoctor } from "../controller/doctor.controller.js";
import { uploadDoctor } from "../utils/multerHandler.js";
import islogin from "../middleware/islogin.js";

export const doctorroutes = express.Router();

doctorroutes.get("/", getAllDoctors);
doctorroutes.get("/:id", getDoctorById);
doctorroutes.post("/", islogin, uploadDoctor.single("image"), createDoctor);
doctorroutes.put("/:id", islogin, uploadDoctor.single("image"), updateDoctor);
doctorroutes.delete("/:id", islogin, deleteDoctor);
