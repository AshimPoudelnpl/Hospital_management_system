import express from "express";
import { createContact, getAllContacts, getContactById, deleteContact } from "../controller/contact.controller.js";
import islogin from "../middleware/islogin.js";

export const contactroutes = express.Router();

contactroutes.post("/", createContact);
contactroutes.get("/", islogin, getAllContacts);
contactroutes.get("/:id", islogin, getContactById);
contactroutes.delete("/:id", islogin, deleteContact);
