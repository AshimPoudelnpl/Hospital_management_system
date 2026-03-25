import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetServicesQuery } from "@Redux/features/serviceSlice.js";
import Loading from "../shared/Loading";
import Skeleton from "../shared/Skeleton";
import ServiceCard from "../ui/ServiceCard";
import CTASection from "../ui/CTASection";
import { FaHeartbeat } from "react-icons/fa";

const Services = () => {
  const navigate = useNavigate();
  const { data: servicesData, isLoading, error } = useGetServicesQuery();

  if (isLoading) return <Skeleton variant="grid" count={3} />;

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-red-600 text-lg mb-4">Failed to load services.</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );

  const services = servicesData || [];

  const servicesWithImages = services.map((s) => ({
    ...s,
    image: s.image ? `${import.meta.env.VITE_BACKEND_URL}/${s.image}` : null,
  }));

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-3">Our Medical Services</h1>
          <p className="text-gray-600 text-lg">
            Comprehensive healthcare services for your wellbeing
          </p>
        </div>

        {/* Grid */}
        {servicesWithImages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesWithImages.map((service, index) => (
              <ServiceCard key={service.id || index} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <FaHeartbeat className="text-5xl mx-auto mb-4 text-gray-300" />
            <p>No services available at the moment.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16">
          <CTASection
            title="Need Medical Assistance?"
            description="Our team is available 24/7 to help you with any medical emergency or consultation"
            buttons={[
              { label: "Book Appointment", path: "/book-appointment", variant: "primary" },
              { label: "Emergency: +977-986568345", path: "#", variant: "success" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
