import express from "express";
import { createService, getAllServices, getServiceById, updateService, deleteService } from "../controller/services.controller.js";
import { uploadService } from "../utils/multerHandler.js";
import islogin from "../middleware/islogin.js";

export const serviceroutes = express.Router();

serviceroutes.get("/", getAllServices);
serviceroutes.get("/:id", getServiceById);
serviceroutes.post("/", islogin, uploadService.single("image"), createService);
serviceroutes.put("/:id", islogin, uploadService.single("image"), updateService);
serviceroutes.delete("/:id", islogin, deleteService);
