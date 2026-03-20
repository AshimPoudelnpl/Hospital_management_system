import db from "../config/db.js";
import { removeImage } from "../utils/removeImg.js";

export const createDepartment = async (req, res, next) => {
  try {
    const { name, description, head_doctor, services } = req.body;
    console.log(typeof req.body.services);
    console.log(req.body.services);
    const image = req.file ? req.file.path : null;
    if (!name) return res.status(400).json({ message: "Name is required" });
    const [result] = await db.execute(
      "INSERT INTO departments (name, description, image, head_doctor) VALUES (?, ?, ?, ?)",
      [name, description, image, head_doctor],
    );
    const departmentId = result.insertId;
    if (services && Array.isArray(JSON.parse(services))) {
      const parsedServices = JSON.parse(services);
      for (const service_name of parsedServices) {
        await db.execute(
          "INSERT INTO department_services (department_id, service_name) VALUES (?, ?)",
          [departmentId, service_name],
        );
      }
    }
    res.status(201).json({ message: "Department created", id: departmentId });
  } catch (error) {
    next(error);
  }
};

export const getAllDepartments = async (req, res, next) => {
  try {
    const [departments] = await db.execute(
      "SELECT * FROM departments ORDER BY created_at DESC",
    );
    for (const dept of departments) {
      const [services] = await db.execute(
        "SELECT * FROM department_services WHERE department_id = ?",
        [dept.id],
      );
      dept.services = services;
    }
    res.status(200).json(departments);
  } catch (error) {
    next(error);
  }
};

export const getDepartmentById = async (req, res, next) => {
  try {
    const [rows] = await db.execute("SELECT * FROM departments WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Department not found" });
    const [services] = await db.execute(
      "SELECT * FROM department_services WHERE department_id = ?",
      [req.params.id],
    );
    res.status(200).json({ ...rows[0], services });
  } catch (error) {
    next(error);
  }
};

export const updateDepartment = async (req, res, next) => {
  try {
    const { name, description, head_doctor, services } = req.body;
    const [existing] = await db.execute(
      "SELECT * FROM departments WHERE id = ?",
      [req.params.id],
    );
    if (existing.length === 0)
      return res.status(404).json({ message: "Department not found" });
    const image = req.file ? req.file.path : existing[0].image;
    if (req.file && existing[0].image) removeImage(existing[0].image);
    await db.execute(
      "UPDATE departments SET name = ?, description = ?, image = ?, head_doctor = ? WHERE id = ?",
      [name, description, image, head_doctor, req.params.id],
    );
    if (services) {
      await db.execute(
        "DELETE FROM department_services WHERE department_id = ?",
        [req.params.id],
      );
      const parsedServices = JSON.parse(services);
      for (const service_name of parsedServices) {
        await db.execute(
          "INSERT INTO department_services (department_id, service_name) VALUES (?, ?)",
          [req.params.id, service_name],
        );
      }
    }
    res.status(200).json({ message: "Department updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteDepartment = async (req, res, next) => {
  try {
    const [existing] = await db.execute(
      "SELECT * FROM departments WHERE id = ?",
      [req.params.id],
    );
    if (existing.length === 0)
      return res.status(404).json({ message: "Department not found" });
    if (existing[0].image) removeImage(existing[0].image);
    await db.execute("DELETE FROM departments WHERE id = ?", [req.params.id]);
    res.status(200).json({ message: "Department deleted" });
  } catch (error) {
    next(error);
  }
};
