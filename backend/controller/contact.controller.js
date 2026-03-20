import db from "../config/db.js";

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message)
      return res.status(400).json({ message: "name, email, phone and message are required" });
    const [result] = await db.execute(
      "INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)",
      [name, email, phone, message]
    );
    res.status(201).json({ message: "Message sent successfully", id: result.insertId });
  } catch (error) {
    next(error);
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    const [rows] = await db.execute("SELECT * FROM contacts ORDER BY created_at DESC");
    res.status(200).json(rows);
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
