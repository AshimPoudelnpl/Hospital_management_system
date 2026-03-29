import { getConnection } from "../config/dbHelper.js";
import { removeImage } from "../utils/removeImg.js";

export const createDoctor = async (req, res, next) => {
  try {
    const db = await getConnection();
    const {
      name,
      specialty,
      experience,
      description,
      display_order,
      department_id,
    } = req.body;
    const image = req.file ? req.file.path : null;
    if (!name || !specialty)
      return res
        .status(400)
        .json({ message: "Name and specialty are required" });
    
    if (display_order) {
      const [existing] = await db.execute(
        "SELECT id FROM doctors WHERE display_order = ?",
        [display_order]
      );
      if (existing.length > 0)
        return res.status(400).json({ message: "Display order already exists" });
    }
    
    const [result] = await db.execute(
      "INSERT INTO doctors (name, specialty, experience, description, image, display_order, department_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        specialty,
        experience,
        description,
        image,
        display_order,
        department_id ? parseInt(department_id) : null,
      ],
    );
    res.status(201).json({ message: "Doctor created", id: result.insertId });
  } catch (error) {
    next(error);
  }
};

export const getAllDoctors = async (req, res, next) => {
  try {
    const db = await getConnection();
    const { department_id, search, page = 1, limit = 10 } = req.query;
    const pageNum = Math.max(1, parseInt(page) || 1);
    const pageSize = Math.max(1, Math.min(100, parseInt(limit) || 10));
    const offset = (pageNum - 1) * pageSize;

    let query = `SELECT d.*, dep.name AS department_name 
       FROM doctors d 
       LEFT JOIN departments dep ON d.department_id = dep.id`;
    let countQuery = `SELECT COUNT(*) as total FROM doctors d`;
    const params = [];
    const countParams = [];

    const conditions = [];
    if (department_id) {
      conditions.push(`d.department_id = ?`);
      params.push(parseInt(department_id));
      countParams.push(parseInt(department_id));
    }
    if (search) {
      conditions.push(`(d.name LIKE ? OR d.specialty LIKE ?)`);
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
      countParams.push(searchTerm, searchTerm);
    }

    if (conditions.length > 0) {
      const whereClause = ` WHERE ${conditions.join(" AND ")}`;
      query += whereClause;
      countQuery += whereClause;
    }

    query += ` ORDER BY d.display_order ASC, d.created_at DESC LIMIT ${pageSize} OFFSET ${offset}`;

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

export const getDoctorById = async (req, res, next) => {
  try {
    const db = await getConnection();
    const [rows] = await db.execute(
      `SELECT d.*, dep.name AS department_name 
       FROM doctors d 
       LEFT JOIN departments dep ON d.department_id = dep.id 
       WHERE d.id = ?`,
      [req.params.id],
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const updateDoctor = async (req, res, next) => {
  try {
    const db = await getConnection();
    const {
      name,
      specialty,
      experience,
      description,
      display_order,
      department_id,
    } = req.body;
    const [existing] = await db.execute("SELECT * FROM doctors WHERE id = ?", [
      req.params.id,
    ]);
    if (existing.length === 0)
      return res.status(404).json({ message: "Doctor not found" });
    
    if (display_order && display_order !== existing[0].display_order) {
      const [duplicate] = await db.execute(
        "SELECT id FROM doctors WHERE display_order = ? AND id != ?",
        [display_order, req.params.id]
      );
      if (duplicate.length > 0)
        return res.status(400).json({ message: "Display order already exists" });
    }
    
    const image = req.file ? req.file.path : existing[0].image;
    if (req.file && existing[0].image) removeImage(existing[0].image);
    await db.execute(
      "UPDATE doctors SET name = ?, specialty = ?, experience = ?, description = ?, image = ?, display_order = ?, department_id = ? WHERE id = ?",
      [
        name,
        specialty,
        experience,
        description,
        image,
        display_order || null,
        department_id ? parseInt(department_id) : null,
        req.params.id,
      ],
    );
    res.status(200).json({ message: "Doctor updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteDoctor = async (req, res, next) => {
  try {
    const db = await getConnection();
    const [existing] = await db.execute("SELECT * FROM doctors WHERE id = ?", [
      req.params.id,
    ]);
    if (existing.length === 0)
      return res.status(404).json({ message: "Doctor not found" });
    if (existing[0].image) removeImage(existing[0].image);
    await db.execute("DELETE FROM doctors WHERE id = ?", [req.params.id]);
    res.status(200).json({ message: "Doctor deleted" });
  } catch (error) {
    next(error);
  }
};
