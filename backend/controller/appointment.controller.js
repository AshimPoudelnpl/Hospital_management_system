import db from "../config/db.js";
import {
  sendAdminAppointmentNotification,
  sendAppointmentConfirmationEmail,
} from "../utils/emailService.js";

export const createAppointment = async (req, res, next) => {
  try {
    const {
      patient_name,
      patient_email,
      patient_phone,
      doctor_id,
      department_id,
      appointment_date,
      appointment_time,
      message,
    } = req.body;
    if (
      !patient_name ||
      !patient_email ||
      !patient_phone ||
      !appointment_date ||
      !appointment_time
    ) {
      return res.status(400).json({
        message:
          "patient_name, patient_email, patient_phone, appointment_date and appointment_time are required",
      });
    }
    if (!doctor_id || !department_id) {
      return res.status(400).json({
        message: "Both doctor_id and department_id are required",
      });
    }

    const [result] = await db.execute(
      "INSERT INTO appointments (patient_name, patient_email, patient_phone, doctor_id, department_id, appointment_date, appointment_time, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        patient_name,
        patient_email,
        patient_phone,
        doctor_id || null,
        department_id || null,
        appointment_date,
        appointment_time,
        message || null,
      ],
    );

    res
      .status(201)
      .json({ message: "Appointment booked", id: result.insertId });

    try {
      const [[doctor]] = await db.execute(
        "SELECT name FROM doctors WHERE id = ?",
        [doctor_id],
      );
      const [[department]] = await db.execute(
        "SELECT name FROM departments WHERE id = ?",
        [department_id],
      );

      const emailPayload = {
        appointmentId: result.insertId,
        patient_name,
        patient_email,
        patient_phone,
        appointment_date,
        appointment_time,
        department_name: department?.name,
        doctor_name: doctor?.name,
        message,
      };

      const emailResults = await Promise.allSettled([
        sendAppointmentConfirmationEmail(emailPayload),
        sendAdminAppointmentNotification(emailPayload),
      ]);

      emailResults.forEach((result, index) => {
        if (result.status === "rejected") {
          const emailTarget = index === 0 ? "patient" : "admin";
          console.error(`Failed to send ${emailTarget} email:`, result.reason);
        }
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }
  } catch (error) {
    next(error);
  }
};

export const getAllAppointments = async (req, res, next) => {
  try {
    const [rows] = await db.execute(
      `SELECT a.*, d.name AS doctor_name, dep.name AS department_name 
       FROM appointments a 
       LEFT JOIN doctors d ON a.doctor_id = d.id 
       LEFT JOIN departments dep ON a.department_id = dep.id 
       ORDER BY a.created_at DESC`,
    );
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

export const getAppointmentById = async (req, res, next) => {
  try {
    const [rows] = await db.execute(
      `SELECT a.*, d.name AS doctor_name, dep.name AS department_name 
       FROM appointments a 
       LEFT JOIN doctors d ON a.doctor_id = d.id 
       LEFT JOIN departments dep ON a.department_id = dep.id 
       WHERE a.id = ?`,
      [req.params.id],
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pending", "confirmed", "cancelled", "completed"];
    if (!validStatuses.includes(status))
      return res.status(400).json({
        message:
          "Invalid status. Must be pending, confirmed, cancelled or completed",
      });
    const [existing] = await db.execute(
      "SELECT * FROM appointments WHERE id = ?",
      [req.params.id],
    );
    if (existing.length === 0)
      return res.status(404).json({ message: "Appointment not found" });
    await db.execute("UPDATE appointments SET status = ? WHERE id = ?", [
      status,
      req.params.id,
    ]);
    res
      .status(200)
      .json({ message: "Appointment status updated", data: { status } });
  } catch (error) {
    next(error);
  }
};

export const deleteAppointment = async (req, res, next) => {
  try {
    const [existing] = await db.execute(
      "SELECT * FROM appointments WHERE id = ?",
      [req.params.id],
    );
    if (existing.length === 0)
      return res.status(404).json({ message: "Appointment not found" });
    await db.execute("DELETE FROM appointments WHERE id = ?", [req.params.id]);
    res.status(200).json({ message: "Appointment deleted" });
  } catch (error) {
    next(error);
  }
};
