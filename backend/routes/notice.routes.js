import express from "express";
import {
  createNotice,
  getAllNotices,
  getNoticeById,
  getNoticeBySlug,
  updateNotice,
  deleteNotice,
} from "../controller/notice.controller.js";
import islogin from "../middleware/islogin.js";
import { uploadNotice } from "../utils/multerHandler.js";

export const noticeroutes = express.Router();

noticeroutes.get("/", getAllNotices);
noticeroutes.get("/slug/:slug", getNoticeBySlug);
noticeroutes.get("/:id", getNoticeById);
noticeroutes.post("/", islogin, uploadNotice.single("image"), createNotice);
noticeroutes.put("/:id", islogin, uploadNotice.single("image"), updateNotice);
noticeroutes.delete("/:id", islogin, deleteNotice);
