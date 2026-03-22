import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const getHospitalFromAddress = () =>
  `Swastik Hospital <${process.env.EMAIL_USER}>`;

export const sendAppointmentConfirmationEmail = async (appointmentData) => {
  const {
    appointmentId,
    patient_name,
    patient_email,
    patient_phone,
    appointment_date,
    appointment_time,
  } = appointmentData;

  const mailOptions = {
    from: getHospitalFromAddress(),
    to: patient_email,
    subject: "Appointment Confirmed - Swastik Hospital",
    html: `
      <body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
        <table width="100%"><tr><td align="center" style="padding:30px;">
          <table width="580" style="background:#fff;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.08);overflow:hidden;">
            <tr><td style="background:#1d4ed8;padding:30px;text-align:center;">
              <h1 style="color:#fff;margin:0;font-size:24px;">Appointment Booked!</h1>
              <p style="color:#bfdbfe;margin:8px 0 0 0;font-size:14px;">Swastik Hospital</p>
            </td></tr>
            <tr><td style="padding:30px;color:#374151;">
              <p style="font-size:16px;">Dear <strong>${patient_name}</strong>,</p>
              <p style="color:#6b7280;">Your appointment has been successfully booked. Here are your details:</p>
              <table width="100%" style="margin:20px 0;border-collapse:collapse;">
                <tr style="background:#eff6ff;"><td style="padding:12px 16px;font-weight:bold;width:40%;">Appointment ID</td><td style="padding:12px 16px;">#${appointmentId}</td></tr>
                <tr><td style="padding:12px 16px;font-weight:bold;">Patient Name</td><td style="padding:12px 16px;">${patient_name}</td></tr>
                <tr style="background:#eff6ff;"><td style="padding:12px 16px;font-weight:bold;">Phone</td><td style="padding:12px 16px;">${patient_phone}</td></tr>
                <tr><td style="padding:12px 16px;font-weight:bold;">Date</td><td style="padding:12px 16px;">${appointment_date}</td></tr>
                <tr style="background:#eff6ff;"><td style="padding:12px 16px;font-weight:bold;">Time</td><td style="padding:12px 16px;">${appointment_time}</td></tr>
              </table>
              <div style="background:#f0fdf4;border-left:4px solid #22c55e;padding:16px;border-radius:4px;margin:20px 0;">
                <p style="margin:0;color:#15803d;font-size:14px;">Please arrive 10 minutes before your scheduled appointment time.</p>
              </div>
              <p style="color:#6b7280;font-size:13px;margin-top:30px;">For any queries, contact us at <strong>${process.env.EMAIL_USER}</strong></p>
            </td></tr>
            <tr><td style="background:#f8fafc;padding:20px;text-align:center;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">&copy; Swastik Hospital. All rights reserved.</p>
            </td></tr>
          </table>
        </td></tr></table>
      </body>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendAdminAppointmentNotification = async (appointmentData) => {
  const {
    appointmentId,
    patient_name,
    patient_email,
    patient_phone,
    appointment_date,
    appointment_time,
    department_name,
    doctor_name,
    message,
  } = appointmentData;

  if (!process.env.ADMIN_EMAIL) {
    throw new Error("ADMIN_EMAIL is not configured");
  }

  const mailOptions = {
    from: getHospitalFromAddress(),
    to: process.env.ADMIN_EMAIL,
    subject: `New Appointment Booking #${appointmentId}`,
    html: `
      <body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">
        <table width="100%"><tr><td align="center" style="padding:30px;">
          <table width="620" style="background:#ffffff;border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.08);overflow:hidden;">
            <tr><td style="background:#0f172a;padding:24px 30px;">
              <h1 style="color:#ffffff;margin:0;font-size:22px;">New Appointment Request</h1>
            </td></tr>
            <tr><td style="padding:30px;color:#334155;">
              <p style="margin-top:0;color:#64748b;">A new appointment has been booked from the website.</p>
              <table width="100%" style="border-collapse:collapse;">
                <tr style="background:#f8fafc;"><td style="padding:12px 16px;font-weight:bold;width:38%;">Appointment ID</td><td style="padding:12px 16px;">#${appointmentId}</td></tr>
                <tr><td style="padding:12px 16px;font-weight:bold;">Patient Name</td><td style="padding:12px 16px;">${patient_name}</td></tr>
                <tr style="background:#f8fafc;"><td style="padding:12px 16px;font-weight:bold;">Patient Email</td><td style="padding:12px 16px;">${patient_email}</td></tr>
                <tr><td style="padding:12px 16px;font-weight:bold;">Phone</td><td style="padding:12px 16px;">${patient_phone}</td></tr>
                <tr style="background:#f8fafc;"><td style="padding:12px 16px;font-weight:bold;">Department</td><td style="padding:12px 16px;">${department_name || "N/A"}</td></tr>
                <tr><td style="padding:12px 16px;font-weight:bold;">Doctor</td><td style="padding:12px 16px;">${doctor_name || "N/A"}</td></tr>
                <tr style="background:#f8fafc;"><td style="padding:12px 16px;font-weight:bold;">Date</td><td style="padding:12px 16px;">${appointment_date}</td></tr>
                <tr><td style="padding:12px 16px;font-weight:bold;">Time</td><td style="padding:12px 16px;">${appointment_time}</td></tr>
                <tr style="background:#f8fafc;"><td style="padding:12px 16px;font-weight:bold;">Message</td><td style="padding:12px 16px;">${message || "No message provided"}</td></tr>
              </table>
            </td></tr>
          </table>
        </td></tr></table>
      </body>
    `,
  };

  await transporter.sendMail(mailOptions);
};
