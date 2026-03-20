import express from "express";
import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  deleteAppointment,
} from "../controller/appointment.controller.js";
import islogin from "../middleware/islogin.js";

export const appointmentroutes = express.Router();

appointmentroutes.post("/", createAppointment);
appointmentroutes.get("/", islogin, getAllAppointments);
appointmentroutes.get("/:id", islogin, getAppointmentById);
appointmentroutes.put("/:id", islogin, updateAppointmentStatus);
appointmentroutes.delete("/:id", islogin, deleteAppointment);
