import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetDoctorsQuery } from "@Redux/features/doctorSlice.js";
import Loading from "../shared/Loading";
import Skeleton from "../shared/Skeleton";
import DoctorCard from "../ui/DoctorCard";
import CTASection from "../ui/CTASection";
import { FaUserMd } from "react-icons/fa";

const Doctors = () => {
  const navigate = useNavigate();
  const { data: doctorsData, isLoading, error } = useGetDoctorsQuery();

  if (isLoading) return <Skeleton variant="grid" count={3} />;

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
              <DoctorCard key={doctor.id || index} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <FaUserMd className="text-5xl mx-auto mb-4 text-gray-300" />
            <p>No doctors found.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16">
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
