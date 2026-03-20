import express from "express";
import { createNotice, getAllNotices, getNoticeById, updateNotice, deleteNotice } from "../controller/notice.controller.js";
import islogin from "../middleware/islogin.js";

export const noticeroutes = express.Router();

noticeroutes.get("/", getAllNotices);
noticeroutes.get("/:id", getNoticeById);
noticeroutes.post("/", islogin, createNotice);
noticeroutes.put("/:id", islogin, updateNotice);
noticeroutes.delete("/:id", islogin, deleteNotice);
