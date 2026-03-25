import db from "../config/db.js";

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message)
      return res.status(400).json({ message: "name, email, phone and message are required" });
    
    // Check if email already exists
    const [emailExists] = await db.execute(
      "SELECT id FROM contacts WHERE email = ?",
      [email]
    );
    if (emailExists.length > 0) {
      return res.status(409).json({ message: "Email is same. Try another one" });
    }
    
    // Check if phone already exists
    const [phoneExists] = await db.execute(
      "SELECT id FROM contacts WHERE phone = ?",
      [phone]
    );
    if (phoneExists.length > 0) {
      return res.status(409).json({ message: "Contact is same. Try another one" });
    }
    
    const [result] = await db.execute(
      "INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)",
      [name, email, phone, message]
    );
    res.status(201).json({ message: "Message sent successfully", id: result.insertId });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      if (error.message.includes("email")) {
        return res.status(409).json({ message: "Email is same. Try another one" });
      }
      if (error.message.includes("phone")) {
        return res.status(409).json({ message: "Contact is same. Try another one" });
      }
    }
    next(error);
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const pageNum = Math.max(1, parseInt(page) || 1);
    const pageSize = Math.max(1, Math.min(100, parseInt(limit) || 10));
    const offset = (pageNum - 1) * pageSize;

    let query = `SELECT * FROM contacts`;
    let countQuery = `SELECT COUNT(*) as total FROM contacts`;
    const params = [];
    const countParams = [];

    if (search) {
      query += ` WHERE name LIKE ? OR email LIKE ? OR phone LIKE ?`;
      countQuery += ` WHERE name LIKE ? OR email LIKE ? OR phone LIKE ?`;
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
      countParams.push(searchTerm, searchTerm, searchTerm);
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

export const getContactById = async (req, res, next) => {
  try {
    const [rows] = await db.execute("SELECT * FROM contacts WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Contact not found" });
    res.status(200).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const [existing] = await db.execute("SELECT * FROM contacts WHERE id = ?", [req.params.id]);
    if (existing.length === 0) return res.status(404).json({ message: "Contact not found" });
    await db.execute("DELETE FROM contacts WHERE id = ?", [req.params.id]);
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};
