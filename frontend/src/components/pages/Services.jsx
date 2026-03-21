import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetServicesQuery } from "@Redux/features/serviceSlice.js";
import Loading from "../shared/Loading";
import { FaHeartbeat } from "react-icons/fa";

const Services = () => {
  const navigate = useNavigate();
  const { data: servicesData, isLoading, error } = useGetServicesQuery();

  if (isLoading) return <Loading />;

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
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id || index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-48 overflow-hidden bg-gray-100">
                  <img
                    src={service.image ? `/${service.image}` : "/default-service.jpg"}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {service.description || "Quality medical service provided by our expert team."}
                  </p>
                  <button
                    onClick={() => navigate("/book-appointment")}
                    className="mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Book Appointment →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <FaHeartbeat className="text-5xl mx-auto mb-4 text-gray-300" />
            <p>No services available at the moment.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-blue-900 text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">Need Medical Assistance?</h3>
          <p className="mb-6 text-blue-200">
            Our team is available 24/7 to help you with any medical emergency or consultation
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate("/book-appointment")}
              className="bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-medium"
            >
              Book Appointment
            </button>
            <button className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition font-medium">
              Emergency: +977-986568345
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
