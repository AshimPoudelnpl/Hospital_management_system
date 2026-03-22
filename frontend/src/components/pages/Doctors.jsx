import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetDoctorsQuery } from "@Redux/features/doctorSlice.js";
import Loading from "../shared/Loading";
import { FaUserMd, FaStethoscope, FaClock } from "react-icons/fa";

const Doctors = () => {
  const navigate = useNavigate();
  const { data: doctorsData, isLoading, error } = useGetDoctorsQuery();

  if (isLoading) return <Loading />;

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-red-600 text-lg mb-4">Failed to load doctors.</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );

  const doctors = doctorsData || [];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-900 mb-3">Our Expert Doctors</h1>
          <p className="text-gray-600 text-lg">
            Meet our team of experienced medical professionals dedicated to your health
          </p>
        </div>

        {/* Grid */}
        {doctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <div
                key={doctor.id || index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-64 overflow-hidden bg-gray-100">
                  <img
                    src={doctor.image ? `${import.meta.env.VITE_BACKEND_URL}/${doctor.image.replace(/\\/g, "/")}` : "/default-doctor.jpg"}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-1">{doctor.name}</h3>
                  <p className="text-green-600 font-semibold mb-1 flex items-center gap-2">
                    <FaStethoscope className="text-sm" /> {doctor.specialty}
                  </p>
                  {doctor.department_name && (
                    <p className="text-sm text-blue-500 mb-2">{doctor.department_name}</p>
                  )}
                  {doctor.experience && (
                    <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                      <FaClock className="text-xs" /> {doctor.experience} experience
                    </p>
                  )}
                  {doctor.description && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {doctor.description}
                    </p>
                  )}
                  <button
                    onClick={() => navigate("/book-appointment")}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <FaUserMd className="text-5xl mx-auto mb-4 text-gray-300" />
            <p>No doctors found.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-blue-900 text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">Looking for a Specialist?</h3>
          <p className="mb-6 text-blue-200">
            Contact us to schedule an appointment with our expert doctors
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate("/book-appointment")}
              className="bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-medium"
            >
              Book Appointment
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition font-medium"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
