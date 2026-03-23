import React, { useState } from "react";
import { useBookAppointmentMutation } from "@Redux/features/appointmentSlice.js";
import { useGetDoctorsQuery } from "@Redux/features/doctorSlice.js";
import { useGetDepartmentsQuery } from "@Redux/features/departmentSlice.js";
import Loading from "../shared/Loading";
import Skeleton from "../shared/Skeleton";
import { toast } from "react-toastify";

const initialForm = {
  patient_name: "",
  patient_email: "",
  patient_phone: "",
  department_id: "",
  doctor_id: "",
  appointment_date: "",
  appointment_time: "",
  message: "",
};

const BookAppointment = () => {
  const [form, setForm] = useState(initialForm);

  const { data: departments, isLoading: deptLoading } =
    useGetDepartmentsQuery();
  const { data: doctors, isLoading: docLoading } = useGetDoctorsQuery(form.department_id || undefined);
  const [bookAppointment, { isLoading }] = useBookAppointmentMutation();

  const filteredDoctors = doctors || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "department_id" ? { doctor_id: "" } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.doctor_id || !form.department_id) {
      toast.error("Please select both a department and a doctor.");
      return;
    }
    try {
      await bookAppointment(form).unwrap();
      toast.success("Appointment booked successfully!");
      setForm(initialForm);
    } catch (err) {
      const msg =
        err?.data?.message || "Failed to book appointment. Please try again.";
      toast.error(msg);
    }
  };

  if (deptLoading || docLoading) return <Skeleton variant="form" count={4} />;

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-900 mb-3">
            Book an Appointment
          </h1>
          <p className="text-gray-600">
            Fill in the details below and we'll confirm your appointment
            shortly.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8 space-y-5"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Patient Name *
            </label>
            <input
              type="text"
              name="patient_name"
              value={form.patient_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email *
              </label>
              <input
                type="email"
                name="patient_email"
                value={form.patient_email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Phone *
              </label>
              <input
                type="text"
                name="patient_phone"
                value={form.patient_phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Department *
              </label>
              <select
                name="department_id"
                value={form.department_id}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
              >
                <option value="">Select Department</option>
                {(departments || []).map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Doctor *
              </label>
              <select
                name="doctor_id"
                value={form.doctor_id}
                onChange={handleChange}
                required
                disabled={!form.department_id}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">
                  {!form.department_id ? "Select a department first" : filteredDoctors.length === 0 ? "No doctors available" : "Select Doctor"}
                </option>
                {filteredDoctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Appointment Date *
              </label>
              <input
                type="date"
                name="appointment_date"
                value={form.appointment_date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Appointment Time *
              </label>
              <input
                type="time"
                name="appointment_time"
                value={form.appointment_time}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="4"
              placeholder="Describe your symptoms or reason for visit..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          >
            {isLoading ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
