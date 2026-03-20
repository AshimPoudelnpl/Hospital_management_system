import db from "../config/db.js";
import { removeImage } from "../utils/removeImg.js";

export const createService = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.path : null;
    if (!title) return res.status(400).json({ message: "Title is required" });
    const [result] = await db.execute(
      "INSERT INTO services (title, description, image) VALUES (?, ?, ?)",
      [title, description, image]
    );
    res.status(201).json({ message: "Service created", id: result.insertId });
  } catch (error) {
    next(error);
  }
};

export const getAllServices = async (req, res, next) => {
  try {
    const [rows] = await db.execute("SELECT * FROM services ORDER BY created_at DESC");
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

export const getServiceById = async (req, res, next) => {
  try {
    const [rows] = await db.execute("SELECT * FROM services WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Service not found" });
    res.status(200).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const [existing] = await db.execute("SELECT * FROM services WHERE id = ?", [req.params.id]);
    if (existing.length === 0) return res.status(404).json({ message: "Service not found" });
    const image = req.file ? req.file.path : existing[0].image;
    if (req.file && existing[0].image) removeImage(existing[0].image);
    await db.execute(
      "UPDATE services SET title = ?, description = ?, image = ? WHERE id = ?",
      [title, description, image, req.params.id]
    );
    res.status(200).json({ message: "Service updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const [existing] = await db.execute("SELECT * FROM services WHERE id = ?", [req.params.id]);
    if (existing.length === 0) return res.status(404).json({ message: "Service not found" });
    if (existing[0].image) removeImage(existing[0].image);
    await db.execute("DELETE FROM services WHERE id = ?", [req.params.id]);
    res.status(200).json({ message: "Service deleted" });
  } catch (error) {
    next(error);
  }
};
