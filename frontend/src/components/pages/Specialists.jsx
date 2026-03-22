import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetDoctorsQuery } from "@Redux/features/doctorSlice.js";
import { useGetDepartmentsQuery } from "@Redux/features/departmentSlice.js";
import Loading from "../shared/Loading";
import { FaUserMd, FaStethoscope, FaClock } from "react-icons/fa";

const Specialists = () => {
  const navigate = useNavigate();
  const [selectedDept, setSelectedDept] = useState("");

  const { data: doctorsData, isLoading: docLoading, error } = useGetDoctorsQuery();
  const { data: departments } = useGetDepartmentsQuery();

  if (docLoading) return <Loading />;

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-red-600 text-lg mb-4">Failed to load specialists.</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );

  const allDoctors = doctorsData || [];
  const specialists = selectedDept
    ? allDoctors.filter((d) => String(d.department_id) === selectedDept)
    : allDoctors;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-900 mb-3">Our Medical Specialists</h1>
          <p className="text-gray-600 text-lg">Expert doctors providing specialized medical care</p>
        </div>

{/* List */}
        {specialists.length > 0 ? (
          <div className="space-y-5">
            {specialists.map((doc, index) => (
              <div
                key={doc.id || index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition flex"
              >
                <div className="w-36 h-36 flex-shrink-0 overflow-hidden bg-gray-100">
                  <img
                    src={doc.image ? `/${doc.image}` : "/default-doctor.jpg"}
                    alt={doc.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-blue-900">{doc.name}</h3>
                        <p className="text-green-600 font-semibold flex items-center gap-1 text-sm">
                          <FaStethoscope className="text-xs" /> {doc.specialty}
                        </p>
                        {doc.department_name && (
                          <p className="text-blue-500 text-xs mt-1">{doc.department_name}</p>
                        )}
                      </div>
                      {doc.experience && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1 flex-shrink-0">
                          <FaClock className="text-xs" /> {doc.experience}
                        </span>
                      )}
                    </div>
                    {doc.description && (
                      <p className="text-gray-500 text-sm mt-2 line-clamp-2">{doc.description}</p>
                    )}
                  </div>
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={() => navigate("/book-appointment")}
                      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <FaUserMd className="text-5xl mx-auto mb-4 text-gray-300" />
            <p>No specialists found{selectedDept ? " for this department" : ""}.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-blue-900 text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">Need a Specialist Consultation?</h3>
          <p className="mb-6 text-blue-200">Contact us for expert medical care</p>
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

export default Specialists;
