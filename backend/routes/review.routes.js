import express from "express";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  updateReview,
} from "../controller/review.controller.js";
import islogin from "../middleware/islogin.js";

export const reviewroutes = express.Router();

reviewroutes.get("/", getAllReviews);
reviewroutes.get("/:id", getReviewById);
reviewroutes.post("/", createReview);
reviewroutes.put("/:id", islogin, updateReview);
reviewroutes.delete("/:id", islogin, deleteReview);
