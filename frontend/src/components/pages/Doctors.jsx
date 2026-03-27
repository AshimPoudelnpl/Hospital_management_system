import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetDoctorsQuery } from "@Redux/features/doctorSlice.js";
import Loading from "../shared/Loading";
import Skeleton from "../shared/Skeleton";
import Card from "../shared/Card";
import CTASection from "../ui/CTASection";
import { FaUserMd, FaChevronLeft, FaChevronRight, FaStethoscope, FaClock } from "react-icons/fa";

const Doctors = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: doctorsData, isLoading, error } = useGetDoctorsQuery({ page: currentPage, limit: 8 });

  if (isLoading) return <Skeleton variant="grid" count={8} />;

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

  const doctors = doctorsData?.data || [];
  const pagination = doctorsData?.pagination || {};



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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {doctors.map((doctor, index) => (
                <Card
                  key={doctor.id || index}
                  image={doctor.image}
                  title={doctor.name}
                  subtitle={
                    <span className="flex items-center gap-2">
                      <FaStethoscope className="text-sm flex-shrink-0" />
                      <span className="line-clamp-1">{doctor.specialty}</span>
                    </span>
                  }
                  badge={
                    doctor.experience && (
                      <span className="flex items-center gap-2">
                        <FaClock className="text-xs flex-shrink-0" />
                        <span className="line-clamp-1">{doctor.experience} experience</span>
                      </span>
                    )
                  }
                  description={doctor.description}
                  expandable={true}
                  buttonText="Book Appointment"
                  onButtonClick={() => {
                    const params = new URLSearchParams();
                    if (doctor.department_id) params.append("department_id", doctor.department_id);
                    params.append("doctor_id", doctor.id);
                    navigate(`/book-appointment?${params.toString()}`);
                  }}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <FaChevronLeft size={18} />
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg font-medium transition ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(pagination.pages, prev + 1))}
                  disabled={currentPage === pagination.pages}
                  className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <FaChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <FaUserMd className="text-5xl mx-auto mb-4 text-gray-300" />
            <p>No doctors found.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-20">
          <CTASection
            title="Looking for a Specialist?"
            description="Contact us to schedule an appointment with our expert doctors"
            buttons={[
              { label: "Book Appointment", path: "/book-appointment", variant: "primary" },
              { label: "Contact Us", path: "/contact", variant: "success" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Doctors;
