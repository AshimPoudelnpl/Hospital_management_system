import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGetServicesQuery } from "@Redux/features/serviceSlice.js";
import { useGetDoctorsQuery } from "@Redux/features/doctorSlice.js";
import { useGetReviewsQuery } from "@Redux/features/reviewSlice.js";
import Skeleton from "../shared/Skeleton";
import Card from "../shared/Card";
import HeroSection from "../ui/HeroSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import doctorImage from "../../assets/medium-shot-doctor-checking-blood-pressure-female-patient.jpg";
import surgeonImage from "../../assets/ordinary-busy-day-surgeon.jpg";
import doctor from "../../assets/9109683.png";
import chairmanImage from "../../assets/doctors/suman20250822062527.webp";
import contactSvg from "../../assets/svg/Contact us-amico.svg";
import hospitalBedSvg from "../../assets/svg/Hospital bed-bro.svg";
import interviewSvg from "../../assets/svg/Interview-bro.svg";
import service24Svg from "../../assets/svg/Service 24_7-bro.svg";
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
  FaStar,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

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

  const statsRef = useRef([]);
  const quickLinksRef = useRef([]);
  const whyDifferentRef = useRef([]);
  const achievementRef = useRef([]);
  const servicesRef = useRef([]);
  const doctorsRef = useRef([]);
  const reviewsRef = useRef([]);
  const chairmanImageRef = useRef(null);
  const chairmanBadgeRef = useRef(null);
  const chairmanContentRef = useRef(null);
  const specialtyCenterRef = useRef(null);

  const { data: servicesData, isLoading: servicesLoading, error: servicesError } =
    useGetServicesQuery();
  const { data: doctorsData, isLoading: doctorsLoading } = useGetDoctorsQuery();
  const { data: reviewsData = [], isLoading: reviewsLoading } =
    useGetReviewsQuery();

  useEffect(() => {
    // Statistics Cards Animation
    gsap.fromTo(
      statsRef.current,
      { opacity: 0, y: 60, scale: 0.8, rotation: -5 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: statsRef.current[0],
          start: "top 85%",
        },
      }
    );

    // Quick Links Animation
    gsap.fromTo(
      quickLinksRef.current,
      { opacity: 0, scale: 0.5, y: 40, rotation: 10 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotation: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: {
          trigger: quickLinksRef.current[0],
          start: "top 85%",
        },
      }
    );

    // Why We're Different Cards
    gsap.fromTo(
      whyDifferentRef.current,
      { opacity: 0, x: -80, rotationY: -30 },
      {
        opacity: 1,
        x: 0,
        rotationY: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: whyDifferentRef.current[0],
          start: "top 85%",
        },
      }
    );

    // Achievement Stats
    gsap.fromTo(
      achievementRef.current,
      { opacity: 0, y: 40, scale: 0.6 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: achievementRef.current[0],
          start: "top 85%",
        },
      }
    );

    // Services Cards
    gsap.fromTo(
      servicesRef.current,
      { opacity: 0, y: 50, scale: 0.85, rotationX: 20 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: servicesRef.current[0],
          start: "top 85%",
        },
      }
    );

    // Doctors Cards
    gsap.fromTo(
      doctorsRef.current,
      { opacity: 0, scale: 0.7, y: 40, rotation: -8 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotation: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.8)",
        scrollTrigger: {
          trigger: doctorsRef.current[0],
          start: "top 85%",
        },
      }
    );

    // Reviews Cards
    gsap.fromTo(
      reviewsRef.current,
      { opacity: 0, y: 40, rotateY: 20, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "back.out(1.6)",
        scrollTrigger: {
          trigger: reviewsRef.current[0],
          start: "top 85%",
        },
      }
    );

    // Chairman Message Image
    gsap.fromTo(
      chairmanImageRef.current,
      { opacity: 0, x: -100, scale: 0.8, rotation: -10 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: chairmanImageRef.current,
          start: "top 85%",
        },
      }
    );

    // Chairman Badge
    gsap.fromTo(
      chairmanBadgeRef.current,
      { opacity: 0, scale: 0.5, rotation: 15 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: {
          trigger: chairmanImageRef.current,
          start: "top 85%",
        },
      }
    );

    // Chairman Content
    gsap.fromTo(
      chairmanContentRef.current?.children,
      { opacity: 0, x: 80, y: 20 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: chairmanContentRef.current,
          start: "top 85%",
        },
      }
    );

    // Specialty Center
    gsap.fromTo(
      specialtyCenterRef.current,
      { opacity: 0, y: 60, scale: 0.9, rotationX: 15 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: specialtyCenterRef.current,
          start: "top 85%",
        },
      }
    );
  }, [servicesData, doctorsData, reviewsData]);

  if (servicesLoading || doctorsLoading || reviewsLoading)
    return <Skeleton variant="grid" count={6} />;

  const services = (
    servicesData?.length > 0 ? servicesData.slice(0, 6) : fallbackServices
  ).map((s) => ({
    ...s,
    icon: s.icon || <FaHeartbeat />,
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
          <div ref={(el) => (statsRef.current[0] = el)} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-center">
            <div className="text-4xl text-blue-600 mb-3 flex justify-center">
              <FaUserMd />
            </div>
            <p className="text-3xl font-bold text-blue-900 mb-1">50+</p>
            <p className="text-gray-600 text-sm">Medical Professionals</p>
          </div>
          <div ref={(el) => (statsRef.current[1] = el)} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-center">
            <div className="text-4xl text-blue-600 mb-3 flex justify-center">
              <FaAmbulance />
            </div>
            <p className="text-3xl font-bold text-blue-900 mb-1">24/7</p>
            <p className="text-gray-600 text-sm">Emergency Care</p>
          </div>
          <div ref={(el) => (statsRef.current[2] = el)} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-center">
            <div className="text-4xl text-blue-600 mb-3 flex justify-center">
              <FaHospital />
            </div>
            <p className="text-3xl font-bold text-blue-900 mb-1">Modern</p>
            <p className="text-gray-600 text-sm">Facilities & Equipments</p>
          </div>
          <div ref={(el) => (statsRef.current[3] = el)} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-center">
            <div className="text-4xl text-blue-600 mb-3 flex justify-center">
              <FaBriefcaseMedical />
            </div>
            <p className="text-3xl font-bold text-blue-900 mb-1">Expert</p>
            <p className="text-gray-600 text-sm">Medical Consulting</p>
          </div>
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
              ref={(el) => (quickLinksRef.current[0] = el)}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate("/doctors")}
            >
              <div className="w-20 h-20 mx-auto mb-4">
                <img src={interviewSvg} alt="Find Doctors" className="w-full h-full object-contain" />
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
              ref={(el) => (quickLinksRef.current[1] = el)}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate("/departments")}
            >
              <div className="w-20 h-20 mx-auto mb-4">
                <img src={hospitalBedSvg} alt="Departments" className="w-full h-full object-contain" />
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
              ref={(el) => (quickLinksRef.current[2] = el)}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate("/services")}
            >
              <div className="w-20 h-20 mx-auto mb-4">
                <img src={service24Svg} alt="Services" className="w-full h-full object-contain" />
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
              ref={(el) => (quickLinksRef.current[3] = el)}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate("/contact")}
            >
              <div className="w-20 h-20 mx-auto mb-4">
                <img src={contactSvg} alt="Contact Us" className="w-full h-full object-contain" />
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

      {/* Chairman Message */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div ref={chairmanImageRef} className="relative">
              <div className="absolute -top-6 -left-6 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
              <div className="relative z-10">
                <img
                  src={chairmanImage}
                  alt="Chairman"
                  className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
                />
                <div ref={chairmanBadgeRef} className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <FaAward className="text-white text-2xl" />
                    </div>
                    <div>
                      <p className="font-bold text-blue-900">15+ Years</p>
                      <p className="text-sm text-gray-600">Excellence</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div ref={chairmanContentRef}>
              <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
                Message from Leadership
              </span>
              <h2 className="text-4xl font-bold text-blue-900 mb-6">
                Chairman's Message
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Welcome to Swastik Hospital, where compassionate care meets medical excellence. For over 15 years, we have been committed to providing world-class healthcare services to our community.
                </p>
                <p>
                  Our mission is simple yet profound: to deliver exceptional medical care with dignity, respect, and compassion. We believe that every patient deserves access to quality healthcare, and we strive to make that a reality through our dedicated team of medical professionals and state-of-the-art facilities.
                </p>
                <p>
                  At Swastik Hospital, we don't just treat illnesses; we care for people. Our patient-centered approach ensures that you receive personalized attention and comprehensive treatment tailored to your unique needs.
                </p>
                <p className="italic text-blue-900 font-medium">
                  "Your health and well-being are our top priorities. We are honored to serve you and your family."
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="font-bold text-xl text-blue-900">Dr. Rajesh Kumar</p>
                <p className="text-gray-600">Chairman, Swastik Hospital</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specialty Centers */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              Our Expertise
            </span>
            <h2 className="text-4xl font-bold text-blue-900 mb-3">
              Specialty Center
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              State-of-the-art facilities and specialized care
            </p>
          </div>

          {/* Cardiology Center */}
          <div ref={specialtyCenterRef} className="grid md:grid-cols-2 gap-8 items-center bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={doctorImage}
                alt="Cardiology Center"
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                <FaHeartbeat className="inline mr-2" />
                Cardiology
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-blue-900 mb-4">Cardiac Care Center</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Our advanced Cardiac Care Center offers comprehensive heart care services with cutting-edge technology and experienced cardiologists. We provide diagnostic services, interventional procedures, and cardiac rehabilitation programs.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-gray-700">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  24/7 Emergency Cardiac Care
                </li>
                <li className="flex items-center text-gray-700">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  Advanced Cardiac Imaging
                </li>
                <li className="flex items-center text-gray-700">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  Interventional Cardiology
                </li>
              </ul>
              <button
                onClick={() => navigate("/about")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center gap-2"
              >
                See More <FaArrowRight />
              </button>
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
            <div ref={(el) => (whyDifferentRef.current[0] = el)} className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg border-l-4 border-blue-600">
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

            <div ref={(el) => (whyDifferentRef.current[1] = el)} className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg border-l-4 border-green-600">
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

            <div ref={(el) => (whyDifferentRef.current[2] = el)} className="bg-linear-to-br from-blue-50 to-green-50 p-8 rounded-lg border-l-4 border-blue-600">
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
            <div ref={(el) => (achievementRef.current[0] = el)}>
              <FaCalendarAlt className="text-4xl mx-auto mb-3" />
              <p className="text-3xl font-bold">5000+</p>
              <p className="text-blue-100">Appointments Booked</p>
            </div>
            <div ref={(el) => (achievementRef.current[1] = el)}>
              <FaUsers className="text-4xl mx-auto mb-3" />
              <p className="text-3xl font-bold">10000+</p>
              <p className="text-blue-100">Happy Patients</p>
            </div>
            <div ref={(el) => (achievementRef.current[2] = el)}>
              <FaTrophy className="text-4xl mx-auto mb-3" />
              <p className="text-3xl font-bold">15+</p>
              <p className="text-blue-100">Years Experience</p>
            </div>
            <div ref={(el) => (achievementRef.current[3] = el)}>
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
          {servicesError ? (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              <FaHeartbeat className="text-5xl text-gray-300 mb-4" />
              <p className="text-red-600 text-lg mb-4">Failed to connect to server. Please check if the backend is running.</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-8">
                {services.map((service, index) => {
                  const IconComponent = service.icon ? () => service.icon : null;
                  return (
                    <div key={service.id || index} ref={(el) => (servicesRef.current[index] = el)}>
                      <Card
                        image={service.image}
                        title={service.title}
                        description={service.description}
                        icon={IconComponent}
                        buttonText="Book Appointment"
                        onButtonClick={() => navigate("/book-appointment")}
                      />
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => navigate("/services")}
                className="mt-10 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                View All Services
              </button>
            </>
          )}
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
                <div key={doc.id || index} ref={(el) => (doctorsRef.current[index] = el)}>
                  <Card
                    image={doc.image}
                    title={doc.name}
                    subtitle={
                      <span className="flex items-center gap-2">
                        <FaStethoscope className="text-sm flex-shrink-0" />
                        <span className="line-clamp-1">{doc.specialty}</span>
                      </span>
                    }
                    badge={
                      doc.experience && (
                        <span className="flex items-center gap-2">
                          <FaClock className="text-xs flex-shrink-0" />
                          <span className="line-clamp-1">{doc.experience} experience</span>
                        </span>
                      )
                    }
                    description={doc.description}
                    expandable={true}
                    buttonText="Book Appointment"
                    onButtonClick={() => {
                      const params = new URLSearchParams();
                      if (doc.department_id) params.append("department_id", doc.department_id);
                      params.append("doctor_id", doc.id);
                      navigate(`/book-appointment?${params.toString()}`);
                    }}
                  />
                </div>
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
              <div key={review.id || i} ref={(el) => (reviewsRef.current[i] = el)} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                <div className="flex items-center gap-1 text-yellow-400 mb-3">
                  {[...Array(review.rating || 5)].map((_, idx) => (
                    <FaStar key={idx} />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-4 italic">"{review.text}"</p>
                <div>
                  <p className="font-bold text-blue-900">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>
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
