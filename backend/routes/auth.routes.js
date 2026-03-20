import express from "express";
import { login, logout } from "../controller/auth.controller.js";


export const authroutes=express.Router();
authroutes.post("/login", login);
authroutes.get("/logout", logout);