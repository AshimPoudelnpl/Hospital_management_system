import db from "../config/db.js";
import { removeImage } from "../utils/removeImg.js";

export const createDoctor = async (req, res, next) => {
  try {
    const { name, specialty, experience, description, availability, department_id } = req.body;
    const image = req.file ? req.file.path : null;
    if (!name || !specialty)
      return res.status(400).json({ message: "Name and specialty are required" });
    const [result] = await db.execute(
      "INSERT INTO doctors (name, specialty, experience, description, image, availability, department_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, specialty, experience, description, image, availability, department_id || null]
    );
    res.status(201).json({ message: "Doctor created", id: result.insertId });
  } catch (error) {
    next(error);
  }
};

export const getAllDoctors = async (req, res, next) => {
  try {
    const [rows] = await db.execute(
      `SELECT d.*, dep.name AS department_name 
       FROM doctors d 
       LEFT JOIN departments dep ON d.department_id = dep.id 
       ORDER BY d.created_at DESC`
    );
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

export const getDoctorById = async (req, res, next) => {
  try {
    const [rows] = await db.execute(
      `SELECT d.*, dep.name AS department_name 
       FROM doctors d 
       LEFT JOIN departments dep ON d.department_id = dep.id 
       WHERE d.id = ?`,
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const updateDoctor = async (req, res, next) => {
  try {
    const { name, specialty, experience, description, availability, department_id } = req.body;
    const [existing] = await db.execute("SELECT * FROM doctors WHERE id = ?", [req.params.id]);
    if (existing.length === 0) return res.status(404).json({ message: "Doctor not found" });
    const image = req.file ? req.file.path : existing[0].image;
    if (req.file && existing[0].image) removeImage(existing[0].image);
    await db.execute(
      "UPDATE doctors SET name = ?, specialty = ?, experience = ?, description = ?, image = ?, availability = ?, department_id = ? WHERE id = ?",
      [name, specialty, experience, description, image, availability, department_id || null, req.params.id]
    );
    res.status(200).json({ message: "Doctor updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteDoctor = async (req, res, next) => {
  try {
    const [existing] = await db.execute("SELECT * FROM doctors WHERE id = ?", [req.params.id]);
    if (existing.length === 0) return res.status(404).json({ message: "Doctor not found" });
    if (existing[0].image) removeImage(existing[0].image);
    await db.execute("DELETE FROM doctors WHERE id = ?", [req.params.id]);
    res.status(200).json({ message: "Doctor deleted" });
  } catch (error) {
    next(error);
  }
};
