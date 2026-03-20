import db from "../config/db.js";

export const createNotice = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content)
      return res.status(400).json({ message: "Title and content are required" });
    const [result] = await db.execute(
      "INSERT INTO notices (title, content, created_by) VALUES (?, ?, ?)",
      [title, content, req.user.id]
    );
    res.status(201).json({ message: "Notice created", id: result.insertId });
  } catch (error) {
    next(error);
  }
};

export const getAllNotices = async (req, res, next) => {
  try {
    const [rows] = await db.execute(
      `SELECT n.*, u.name AS created_by_name 
       FROM notices n 
       LEFT JOIN users u ON n.created_by = u.id 
       ORDER BY n.created_at DESC`
    );
    res.status(200).json(rows);
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
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ message: "Notice not found" });
    res.status(200).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const updateNotice = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const [existing] = await db.execute("SELECT * FROM notices WHERE id = ?", [req.params.id]);
    if (existing.length === 0) return res.status(404).json({ message: "Notice not found" });
    await db.execute(
      "UPDATE notices SET title = ?, content = ? WHERE id = ?",
      [title, content, req.params.id]
    );
    res.status(200).json({ message: "Notice updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteNotice = async (req, res, next) => {
  try {
    const [existing] = await db.execute("SELECT * FROM notices WHERE id = ?", [req.params.id]);
    if (existing.length === 0) return res.status(404).json({ message: "Notice not found" });
    await db.execute("DELETE FROM notices WHERE id = ?", [req.params.id]);
    res.status(200).json({ message: "Notice deleted" });
  } catch (error) {
    next(error);
  }
};
