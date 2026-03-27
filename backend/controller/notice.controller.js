import db from "../config/db.js";
import fs from "fs";
import { get } from "http";
import path from "path";
import slugify from "slugify";

export const createNotice = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content)
      return res
        .status(400)
        .json({ message: "Title and content are required" });

    const slug = slugify(title, { lower: true, strict: true });
    const image = req.file ? `uploads/notices/${req.file.filename}` : null;

    const [result] = await db.execute(
      "INSERT INTO notices (title, slug, content, image, created_by) VALUES (?, ?, ?, ?, ?)",
      [title, slug, content, image, req.user.id],
    );
    res.status(201).json({ message: "Notice created", id: result.insertId });
  } catch (error) {
    next(error);
  }
};

export const getAllNotices = async (req, res, next) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const pageNum = Math.max(1, parseInt(page) || 1);
    const pageSize = Math.max(1, Math.min(100, parseInt(limit) || 10));
    const offset = (pageNum - 1) * pageSize;

    let query = `SELECT n.*, u.name AS created_by_name 
       FROM notices n 
       LEFT JOIN users u ON n.created_by = u.id`;
    let countQuery = `SELECT COUNT(*) as total FROM notices n`;
    const params = [];
    const countParams = [];

    if (search) {
      query += ` WHERE n.title LIKE ? OR n.content LIKE ?`;
      countQuery += ` WHERE n.title LIKE ? OR n.content LIKE ?`;
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
      countParams.push(searchTerm, searchTerm);
    }

    query += ` ORDER BY n.created_at DESC LIMIT ${pageSize} OFFSET ${offset}`;

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

export const getNoticeById = async (req, res, next) => {
  try {
    const [rows] = await db.execute(
      `SELECT n.*, u.name AS created_by_name 
       FROM notices n 
       LEFT JOIN users u ON n.created_by = u.id 
       WHERE n.id = ?`,
      [req.params.id],
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Notice not found" });
    res.status(200).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const getNoticeBySlug = async (req, res, next) => {
  try {
    const [rows] = await db.execute(`select * from notices where slug = ?`, [
      req.params.slug,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Notice not found" });
    res.status(200).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const updateNotice = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const [existing] = await db.execute("SELECT * FROM notices WHERE id = ?", [
      req.params.id,
    ]);
    if (existing.length === 0)
      return res.status(404).json({ message: "Notice not found" });

    const slug = title
      ? slugify(title, { lower: true, strict: true })
      : existing[0].slug;
    let image = existing[0].image;
    if (req.file) {
      // Delete old image if exists
      if (existing[0].image) {
        const oldImagePath = path.join(process.cwd(), existing[0].image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      image = `uploads/notices/${req.file.filename}`;
    }

    await db.execute(
      "UPDATE notices SET title = ?, slug = ?, content = ?, image = ? WHERE id = ?",
      [title, slug, content, image, req.params.id],
    );
    res.status(200).json({ message: "Notice updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteNotice = async (req, res, next) => {
  try {
    const [existing] = await db.execute("SELECT * FROM notices WHERE id = ?", [
      req.params.id,
    ]);
    if (existing.length === 0)
      return res.status(404).json({ message: "Notice not found" });

    // Delete image if exists
    if (existing[0].image) {
      const imagePath = path.join(process.cwd(), existing[0].image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await db.execute("DELETE FROM notices WHERE id = ?", [req.params.id]);
    res.status(200).json({ message: "Notice deleted" });
  } catch (error) {
    next(error);
  }
};
