import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetDoctorsQuery } from "@Redux/features/doctorSlice.js";
import { useGetServicesQuery } from "@Redux/features/serviceSlice.js";
import logo from "../../assets/logo.png";
import doctorImg from "../../assets/medium-shot-doctor-checking-blood-pressure-female-patient.jpg";
import { FaCheckCircle, FaUserMd, FaAmbulance, FaHospital, FaBriefcaseMedical } from "react-icons/fa";

const About = () => {
  const navigate = useNavigate();
  const { data: doctors } = useGetDoctorsQuery();
  const { data: services } = useGetServicesQuery();

  return (
    <div className="bg-gray-50">

      {/* Hero */}
      <div className="bg-blue-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={doctorImg} alt="Hospital" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <img src={logo} alt="Swastik Hospital" className="w-24 mx-auto mb-6 bg-white rounded-full p-3" />
          <h1 className="text-4xl font-bold mb-4">About Swastik Hospital</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Committed to providing high-quality, personalized care for every patient
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* About Text */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed text-lg mb-6">
            Swastik Hospital is a specialized multi-specialty hospital committed to providing
            high-quality, personalized care for patients with various medical concerns. With a
            skilled team led by experienced doctors, we bring cutting-edge technology and years
            of surgical and clinical experience to your care.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Contact Us
          </button>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: <FaUserMd />, value: `${(doctors || []).length || "50"}+`, label: "Medical Professionals" },
            { icon: <FaAmbulance />, value: "24/7", label: "Emergency Care" },
            { icon: <FaHospital />, value: "Modern", label: "Facilities & Equipment" },
            { icon: <FaBriefcaseMedical />, value: `${(services || []).length || "10"}+`, label: "Medical Services" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-2xl text-white">{stat.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Services */}
        {services && services.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Services We Offer</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {services.slice(0, 6).map((service, i) => (
                <div key={service.id || i} className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
                  <div className="h-36 overflow-hidden rounded-lg mb-4 bg-gray-100">
                    <img
                      src={service.image ? `/${service.image}` : "/default-service.jpg"}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-blue-900 mb-2">{service.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2">{service.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button
                onClick={() => navigate("/services")}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                View All Services
              </button>
            </div>
          </div>
        )}

        {/* Doctors */}
        {doctors && doctors.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Meet Our Experts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {doctors.slice(0, 4).map((doc, i) => (
                <div key={doc.id || i} className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition text-center">
                  <div className="h-52 overflow-hidden bg-gray-100">
                    <img
                      src={doc.image ? `/${doc.image}` : "/default-doctor.jpg"}
                      alt={doc.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-blue-900">{doc.name}</h3>
                    <p className="text-green-600 text-sm">{doc.specialty}</p>
                    {doc.department_name && (
                      <p className="text-gray-400 text-xs mt-1">{doc.department_name}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button
                onClick={() => navigate("/doctors")}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                View All Doctors
              </button>
            </div>
          </div>
        )}

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Swastik Hospital?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Affordable Healthcare", desc: "Quality medical services at reasonable and transparent pricing" },
              { title: "Experienced Doctors", desc: "Highly qualified medical professionals with years of expertise" },
              { title: "Modern Facilities", desc: "State-of-the-art equipment and comfortable patient care areas" },
              { title: "Patient-Centered Care", desc: "Personalized treatment plans focused on your wellbeing" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <FaCheckCircle className="text-2xl flex-shrink-0 text-green-400 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                  <p className="text-blue-100">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Have questions or need to schedule an appointment? Our team is here to help.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate("/book-appointment")}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Book Appointment
            </button>
            <button className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition font-medium">
              Call: +977-081-5403520
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
            >
              Email Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
