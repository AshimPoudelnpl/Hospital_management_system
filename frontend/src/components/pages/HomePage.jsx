import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetServicesQuery } from "@Redux/features/serviceSlice.js";
import { useGetDoctorsQuery } from "@Redux/features/doctorSlice.js";
import { useGetReviewsQuery } from "@Redux/features/reviewSlice.js";
import Loading from "../shared/Loading";
import Skeleton from "../shared/Skeleton";
import HeroSection from "../ui/HeroSection";
import ServiceCard from "../ui/ServiceCard";
import DoctorCard from "../ui/DoctorCard";
import StatCard from "../ui/StatCard";
import ReviewCard from "../ui/ReviewCard";
import CTASection from "../ui/CTASection";
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
} from "react-icons/fa";

const fallbackReviews = [
  { name: "Sita Sharma", role: "Patient", rating: 5, text: "Excellent care and very professional staff. The doctors were thorough and explained everything clearly. Highly recommend Swastik Hospital!" },
  { name: "Ram Thapa", role: "Patient", rating: 5, text: "I had my surgery here and the entire team was amazing. From admission to discharge, everything was smooth and well-organized." },
  { name: "Anita Gurung", role: "Patient", rating: 4, text: "Very clean facility with modern equipment. The doctors are experienced and the nurses are caring. Great experience overall." },
  { name: "Bikash Rai", role: "Patient", rating: 5, text: "Emergency services were incredibly fast. The staff responded immediately and provided excellent treatment. Truly a lifesaver!" },
  { name: "Priya Shrestha", role: "Patient", rating: 5, text: "Best hospital in the area. Affordable pricing and top-notch medical care. The pediatric department took great care of my child." },
  { name: "Deepak Karki", role: "Patient", rating: 4, text: "Friendly and knowledgeable doctors. The appointment booking process was easy and the waiting time was minimal. Very satisfied." },
];

const fallbackServices = [
  { title: "Cardiology", icon: <FaHeartbeat />, description: "Swastik Hospital provides comprehensive heart care and advanced cardiac treatments for patients." },
  { title: "Orthopedics", icon: <FaBone />, description: "We offer advanced bone and joint care solutions to help patients recover and stay active." },
  { title: "Pediatrics", icon: <FaChild />, description: "Our pediatric department provides specialized healthcare for infants, children, and adolescents." },
  { title: "General Surgery", icon: <FaStethoscope />, description: "Swastik Hospital performs expert surgical procedures with modern technology and experienced surgeons." },
  { title: "Emergency Services", icon: <FaAmbulance />, description: "We provide 24/7 emergency medical assistance for urgent health conditions." },
  { title: "Laboratory", icon: <FaFlask />, description: "Our laboratory offers advanced diagnostic testing facilities for accurate and fast medical results." },
];

const Home = () => {
  const navigate = useNavigate();
  const images = [doctorImage, surgeonImage];

  const { data: servicesData, isLoading: servicesLoading } = useGetServicesQuery();
  const { data: doctorsData, isLoading: doctorsLoading } = useGetDoctorsQuery();
  const { data: reviewsData = [], isLoading: reviewsLoading } = useGetReviewsQuery();

  if (servicesLoading || doctorsLoading || reviewsLoading) return <Skeleton variant="grid" count={6} />;

  const services = (servicesData?.length > 0 ? servicesData.slice(0, 6) : fallbackServices).map(
    (s) => ({ ...s, icon: s.icon || <FaHeartbeat /> })
  );

  const doctors = (doctorsData || []).slice(0, 4);
  const reviews = reviewsData.length > 0 ? reviewsData : fallbackReviews;

  return (
    <>
      <HeroSection
        images={images}
        title="Your Health,\nOur Priority"
        subtitle="Swastik Hospital delivers world-class medical care with compassion, cutting-edge technology, and experienced specialists — all under one roof."
        buttons={[
          { label: "Book Appointment", path: "/book-appointment", variant: "primary" },
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
          <StatCard icon={<FaUserMd />} value="50+" label="Medical Professionals" />
          <StatCard icon={<FaAmbulance />} value="24/7" label="Emergency Care" />
          <StatCard icon={<FaHospital />} value="Modern" label="Facilities & Equipments" />
          <StatCard icon={<FaBriefcaseMedical />} value="Expert" label="Medical Consulting" />
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-12">Our Services</h2>
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
            <h2 className="text-3xl font-bold text-blue-900 mb-3">Meet Our Doctors</h2>
            <p className="text-gray-600">Expert medical professionals dedicated to your health</p>
          </div>

          {doctors.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {doctors.map((doc, index) => (
                <DoctorCard key={doc.id || index} doctor={doc} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No doctors available at the moment.</p>
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
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Swastik Hospital?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Affordable Healthcare", desc: "Quality medical services at reasonable and transparent pricing" },
              { title: "Experienced Doctors", desc: "Highly qualified medical professionals with years of expertise" },
              { title: "Modern Facilities", desc: "State-of-the-art equipment and comfortable patient care areas" },
              { title: "Patient-Centered Care", desc: "Personalized treatment plans focused on your wellbeing" },
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
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Testimonials</span>
            <h2 className="text-3xl font-bold text-blue-900 mt-2">What Our Patients Say</h2>
            <p className="text-gray-500 mt-2">Real experiences from people we've had the privilege to care for</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <ReviewCard key={review.id || i} review={review} />
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <CTASection
            title="Contact Us Here"
            description="Have questions or need to schedule an appointment? Our team is here to help you."
            buttons={[
              { label: "Book Appointment", path: "/book-appointment", variant: "primary" },
              { label: "Contact Us", path: "/contact", variant: "default" },
            ]}
            bgColor="bg-white"
            textColor="text-blue-900"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
