import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetServicesQuery } from "@Redux/features/serviceSlice.js";
import { useGetDoctorsQuery } from "@Redux/features/doctorSlice.js";
import { useGetReviewsQuery } from "@Redux/features/reviewSlice.js";
import Skeleton from "../shared/Skeleton";
import HeroSection from "../ui/HeroSection";
import ServiceCard from "../ui/ServiceCard";
import DoctorCard from "../ui/DoctorCard";
import StatCard from "../ui/StatCard";
import ReviewCard from "../ui/ReviewCard";
import doctorImage from "../../assets/medium-shot-doctor-checking-blood-pressure-female-patient.jpg";
import surgeonImage from "../../assets/ordinary-busy-day-surgeon.jpg";
import doctor from "../../assets/9109683.png";
import {
  FaUserMd,
  FaAmbulance,
  FaHospital,
  FaBriefcaseMedical,
  FaHeartbeat,
  FaBone,
  FaChild,
  FaStethoscope,
  FaFlask,
  FaCheckCircle,
  FaPhoneAlt,
  FaCalendarAlt,
  FaUsers,
  FaTrophy,
  FaAward,
  FaShieldAlt,
  FaLightbulb,
  FaArrowRight,
  FaClock,
} from "react-icons/fa";

const fallbackReviews = [
  {
    name: "Sita Sharma",
    role: "Patient",
    rating: 5,
    text: "Excellent care and very professional staff. The doctors were thorough and explained everything clearly. Highly recommend Swastik Hospital!",
  },
  {
    name: "Ram Thapa",
    role: "Patient",
    rating: 5,
    text: "I had my surgery here and the entire team was amazing. From admission to discharge, everything was smooth and well-organized.",
  },
  {
    name: "Anita Gurung",
    role: "Patient",
    rating: 4,
    text: "Very clean facility with modern equipment. The doctors are experienced and the nurses are caring. Great experience overall.",
  },
  {
    name: "Bikash Rai",
    role: "Patient",
    rating: 5,
    text: "Emergency services were incredibly fast. The staff responded immediately and provided excellent treatment. Truly a lifesaver!",
  },
  {
    name: "Priya Shrestha",
    role: "Patient",
    rating: 5,
    text: "Best hospital in the area. Affordable pricing and top-notch medical care. The pediatric department took great care of my child.",
  },
  {
    name: "Deepak Karki",
    role: "Patient",
    rating: 4,
    text: "Friendly and knowledgeable doctors. The appointment booking process was easy and the waiting time was minimal. Very satisfied.",
  },
];

const fallbackServices = [
  {
    title: "Cardiology",
    icon: <FaHeartbeat />,
    description:
      "Swastik Hospital provides comprehensive heart care and advanced cardiac treatments for patients.",
  },
  {
    title: "Orthopedics",
    icon: <FaBone />,
    description:
      "We offer advanced bone and joint care solutions to help patients recover and stay active.",
  },
  {
    title: "Pediatrics",
    icon: <FaChild />,
    description:
      "Our pediatric department provides specialized healthcare for infants, children, and adolescents.",
  },
  {
    title: "General Surgery",
    icon: <FaStethoscope />,
    description:
      "Swastik Hospital performs expert surgical procedures with modern technology and experienced surgeons.",
  },
  {
    title: "Emergency Services",
    icon: <FaAmbulance />,
    description:
      "We provide 24/7 emergency medical assistance for urgent health conditions.",
  },
  {
    title: "Laboratory",
    icon: <FaFlask />,
    description:
      "Our laboratory offers advanced diagnostic testing facilities for accurate and fast medical results.",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const images = [doctorImage, surgeonImage];

  const { data: servicesData, isLoading: servicesLoading } =
    useGetServicesQuery();
  const { data: doctorsData, isLoading: doctorsLoading } = useGetDoctorsQuery();
  const { data: reviewsData = [], isLoading: reviewsLoading } =
    useGetReviewsQuery();

  if (servicesLoading || doctorsLoading || reviewsLoading)
    return <Skeleton variant="grid" count={6} />;

  const services = (
    servicesData?.length > 0 ? servicesData.slice(0, 6) : fallbackServices
  ).map((s) => ({
    ...s,
    icon: s.icon || <FaHeartbeat />,
    image: s.image ? `${import.meta.env.VITE_BACKEND_URL}/${s.image}` : null,
  }));

  const doctors = (doctorsData?.data || []).slice(0, 4);
  const reviews = reviewsData.length > 0 ? reviewsData : fallbackReviews;

  return (
    <>
      <HeroSection
        images={images}
        title="Your Health, Our Priority"
        subtitle="Swastik Hospital delivers world-class medical care with compassion, cutting-edge technology, and experienced specialists — all under one roof."
        buttons={[
          {
            label: "Book Appointment",
            path: "/book-appointment",
            variant: "primary",
          },
          { label: "Contact Us", path: "/contact", variant: "secondary" },
        ]}
        stats={[
          { val: "50+", label: "Doctors" },
          { val: "24/7", label: "Emergency" },
          { val: "15+", label: "Years" },
        ]}
        showDoctorImage={true}
        doctorImage={doctor}
        doctorBadge={{ name: "Dr. Prapti Sedai", title: "Orthopaedic Surgeon" }}
      />

      {/* Statistics */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-6">
          <StatCard
            icon={<FaUserMd />}
            value="50+"
            label="Medical Professionals"
          />
          <StatCard
            icon={<FaAmbulance />}
            value="24/7"
            label="Emergency Care"
          />
          <StatCard
            icon={<FaHospital />}
            value="Modern"
            label="Facilities & Equipments"
          />
          <StatCard
            icon={<FaBriefcaseMedical />}
            value="Expert"
            label="Medical Consulting"
          />
        </div>
      </div>

      {/* Quick Appointment Booking CTA */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Need Medical Attention?
              </h3>
              <p className="text-blue-100">
                Book an appointment with our expert doctors in just a few clicks
              </p>
            </div>
            <button
              onClick={() => navigate("/book-appointment")}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition flex items-center gap-2 whitespace-nowrap"
            >
              <FaCalendarAlt /> Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <div
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate("/doctors")}
            >
              <div className="text-4xl text-blue-600 mb-4">
                <FaUserMd className="text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                Find Doctors
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Browse our experienced medical professionals
              </p>
              <span className="text-blue-600 font-semibold flex items-center gap-2">
                Explore <FaArrowRight size={14} className="text-blue-600" />
              </span>
            </div>

            <div
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate("/departments")}
            >
              <div className="text-4xl text-green-600 mb-4">
                <FaHospital className="text-blue-900" />
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                Departments
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Specialized medical departments and services
              </p>
              <span className="text-blue-600 font-semibold flex items-center gap-2">
                View All <FaArrowRight size={14} className="text-blue-600" />
              </span>
            </div>

            <div
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate("/services")}
            >
              <div className="text-4xl text-blue-600 mb-4">
                <FaStethoscope className="text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                Services
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Comprehensive healthcare services available
              </p>
              <span className="text-blue-600 font-semibold flex items-center gap-2">
                Discover <FaArrowRight size={14} className="text-blue-600" />
              </span>
            </div>

            <div
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate("/contact")}
            >
              <div className="text-4xl text-blue-600 mb-4">
                <FaPhoneAlt className="text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                Contact Us
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Get in touch with our support team
              </p>
              <span className="text-blue-600 font-semibold flex items-center gap-2">
                Call Now <FaArrowRight size={14} className="text-blue-600" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Why We're Different */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-3">
              Why We're Different
            </h2>
            <p className="text-gray-600">
              Excellence in healthcare with patient-first approach
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg border-l-4 border-blue-600">
              <div className="text-5xl text-blue-600 mb-4">
                <FaAward />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                Award-Winning Care
              </h3>
              <p className="text-gray-700">
                Recognized for excellence in patient care and medical innovation with multiple national awards
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg border-l-4 border-green-600">
              <div className="text-5xl text-blue-400 mb-4">
                <FaShieldAlt />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                Safety First
              </h3>
              <p className="text-gray-700">
                State-of-the-art infection control and safety protocols ensuring your wellbeing at every step
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-lg border-l-4 border-blue-600">
              <div className="text-5xl text-blue-600 mb-4">
                <FaLightbulb />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                Innovation
              </h3>
              <p className="text-gray-700">
                Latest medical technology and treatment methods to provide you with the best healthcare outcomes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <FaCalendarAlt className="text-4xl mx-auto mb-3" />
              <p className="text-3xl font-bold">5000+</p>
              <p className="text-blue-100">Appointments Booked</p>
            </div>
            <div>
              <FaUsers className="text-4xl mx-auto mb-3" />
              <p className="text-3xl font-bold">10000+</p>
              <p className="text-blue-100">Happy Patients</p>
            </div>
            <div>
              <FaTrophy className="text-4xl mx-auto mb-3" />
              <p className="text-3xl font-bold">15+</p>
              <p className="text-blue-100">Years Experience</p>
            </div>
            <div>
              <FaClock className="text-4xl mx-auto mb-3" />
              <p className="text-3xl font-bold">24/7</p>
              <p className="text-blue-100">Available Service</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-12">
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id || index} service={service} />
            ))}
          </div>
          <button
            onClick={() => navigate("/services")}
            className="mt-10 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            View All Services
          </button>
        </div>
      </div>

      {/* Doctors Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-3">
              Meet Our Doctors
            </h2>
            <p className="text-gray-600">
              Expert medical professionals dedicated to your health
            </p>
          </div>

          {doctors.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {doctors.map((doc, index) => (
                <DoctorCard key={doc.id || index} doctor={doc} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No doctors available at the moment.
            </p>
          )}

          <div className="text-center mt-10">
            <button
              onClick={() => navigate("/doctors")}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              View All Doctors
            </button>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gradient-to-r from-[#167aab] to-[#1b10e6] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Why Choose Swastik Hospital?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Affordable Healthcare",
                desc: "Quality medical services at reasonable and transparent pricing",
              },
              {
                title: "Experienced Doctors",
                desc: "Highly qualified medical professionals with years of expertise",
              },
              {
                title: "Modern Facilities",
                desc: "State-of-the-art equipment and comfortable patient care areas",
              },
              {
                title: "Patient-Centered Care",
                desc: "Personalized treatment plans focused on your wellbeing",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <FaCheckCircle className="text-3xl flex-shrink-0 text-white" />
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-blue-100">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">
              Testimonials
            </span>
            <h2 className="text-3xl font-bold text-blue-900 mt-2">
              What Our Patients Say
            </h2>
            <p className="text-gray-500 mt-2">
              Real experiences from people we've had the privilege to care for
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <ReviewCard key={review.id || i} review={review} />
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </>
  );
};

export default Home;
