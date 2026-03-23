import db from "../config/db.js";

// CREATE REVIEW
export const createReview = async (req, res, next) => {
  try {
    const { name, role, rating, text } = req.body;

    if (!name || !text || !rating) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!Number.isInteger(Number(rating)) || rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    const [result] = await db.execute(
      "INSERT INTO reviews (name, rating, review_text) VALUES (?, ?, ?)",
      [name, rating, text]
    );

    res.status(201).json({
      message: "Review created",
      id: result.insertId,
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL REVIEWS
export const getAllReviews = async (req, res, next) => {
  try {
    const [rows] = await db.execute(
      `SELECT id, name, rating, review_text AS text, created_at
       FROM reviews
       ORDER BY created_at DESC`
    );

    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// GET REVIEW BY ID
export const getReviewById = async (req, res, next) => {
  try {
    const [rows] = await db.execute(
      `SELECT id, name, rating, review_text AS text, created_at
       FROM reviews
       WHERE id = ?`,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

// UPDATE REVIEW
export const updateReview = async (req, res, next) => {
  try {
    const { name, rating, text } = req.body;

    const [result] = await db.execute(
      "UPDATE reviews SET name = ?, rating = ?, review_text = ? WHERE id = ?",
      [name, rating, text, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.status(200).json({
      message: "Review updated",
    });
  } catch (error) {
    next(error);
  }
};

// DELETE REVIEW
export const deleteReview = async (req, res, next) => {
  try {
    const [result] = await db.execute(
      "DELETE FROM reviews WHERE id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.status(200).json({
      message: "Review deleted",
    });
  } catch (error) {
    next(error);
  }
};
