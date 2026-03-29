import { getConnection } from "../config/dbHelper.js";
import { removeImage } from "../utils/removeImg.js";

export const createService = async (req, res, next) => {
  try {
    const db = await getConnection();
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
    const db = await getConnection();
    const { search, page = 1, limit = 10 } = req.query;
    const pageNum = Math.max(1, parseInt(page) || 1);
    const pageSize = Math.max(1, Math.min(100, parseInt(limit) || 10));
    const offset = (pageNum - 1) * pageSize;

    let query = `SELECT * FROM services`;
    let countQuery = `SELECT COUNT(*) as total FROM services`;
    const params = [];
    const countParams = [];

    if (search) {
      const searchTerm = `%${search}%`;
      query += ` WHERE title LIKE ? OR description LIKE ?`;
      countQuery += ` WHERE title LIKE ? OR description LIKE ?`;
      params.push(searchTerm, searchTerm);
      countParams.push(searchTerm, searchTerm);
    }

    query += ` ORDER BY created_at DESC LIMIT ${pageSize} OFFSET ${offset}`;

    const [rows] = await db.execute(query, params);
    const [countResult] = await db.execute(countQuery, countParams);
    const total = countResult[0].total;

    res.status(200).json({
      data: rows,
      pagination: {
        total,
        page: pageNum,
        limit: pageSize,
        pages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getServiceById = async (req, res, next) => {
  try {
    const db = await getConnection();
    const [rows] = await db.execute("SELECT * FROM services WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Service not found" });
    res.status(200).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  try {
    const db = await getConnection();
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
    const db = await getConnection();
    const [existing] = await db.execute("SELECT * FROM services WHERE id = ?", [req.params.id]);
    if (existing.length === 0) return res.status(404).json({ message: "Service not found" });
    if (existing[0].image) removeImage(existing[0].image);
    await db.execute("DELETE FROM services WHERE id = ?", [req.params.id]);
    res.status(200).json({ message: "Service deleted" });
  } catch (error) {
    next(error);
  }
};
