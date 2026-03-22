import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetServicesQuery } from "@Redux/features/serviceSlice.js";
import { useGetDoctorsQuery } from "@Redux/features/doctorSlice.js";
import Loading from "../shared/Loading";
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
  FaArrowRight,
  FaStar,
  FaQuoteLeft,
} from "react-icons/fa";

const reviews = [
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [doctorImage, surgeonImage];

  const { data: servicesData, isLoading: servicesLoading } = useGetServicesQuery();
  const { data: doctorsData, isLoading: doctorsLoading } = useGetDoctorsQuery();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (servicesLoading || doctorsLoading) return <Loading />;

  const services = (servicesData?.length > 0 ? servicesData.slice(0, 6) : fallbackServices).map(
    (s) => ({ ...s, icon: s.icon || <FaHeartbeat /> })
  );

  const doctors = (doctorsData || []).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideRight { from { opacity: 0; transform: translateX(60px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes pulse-ring { 0%, 100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.08); opacity: 0.3; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes badgeSlide { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        .anim-fade-up-1 { animation: fadeUp 0.8s ease forwards; }
        .anim-fade-up-2 { animation: fadeUp 0.8s 0.2s ease both; }
        .anim-fade-up-3 { animation: fadeUp 0.8s 0.4s ease both; }
        .anim-fade-up-4 { animation: fadeUp 0.8s 0.6s ease both; }
        .anim-slide-right { animation: slideRight 0.9s 0.3s ease both; }
        .anim-float { animation: float 3.5s ease-in-out infinite; }
        .anim-badge { animation: badgeSlide 0.8s 0.8s ease both; }
        .pulse-ring { animation: pulse-ring 2.5s ease-in-out infinite; }
      `}</style>

      <div className="relative w-full min-h-[650px] overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800">
        {/* Animated background blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>

        {/* Sliding background image */}
        {images.map((image, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-20" : "opacity-0"}`}>
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 flex items-center justify-between gap-10">
          {/* Left Content */}
          <div className="flex-1 text-white max-w-xl">
            <div className="anim-fade-up-1 inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 text-green-300 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Trusted Healthcare Since 2005
            </div>
            <h1 className="anim-fade-up-2 text-5xl lg:text-6xl font-extrabold leading-tight mb-5">
              Your Health,<br />
              <span className="text-green-400">Our Priority</span>
            </h1>
            <p className="anim-fade-up-3 text-blue-200 text-lg leading-relaxed mb-8">
              Swastik Hospital delivers world-class medical care with compassion, cutting-edge technology, and experienced specialists — all under one roof.
            </p>
            <div className="anim-fade-up-4 flex gap-4 flex-wrap">
              <button onClick={() => navigate("/book-appointment")} className="bg-green-500 hover:bg-green-400 text-white px-7 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-green-500/30 hover:scale-105">
                Book Appointment
              </button>
              <button onClick={() => navigate("/contact")} className="border border-white/40 hover:border-white text-white px-7 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-white/10">
                Contact Us
              </button>
            </div>

            {/* Mini stats */}
            <div className="anim-fade-up-4 flex gap-8 mt-10">
              {[{ val: "50+", label: "Doctors" }, { val: "24/7", label: "Emergency" }, { val: "15+", label: "Years" }].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-white">{s.val}</div>
                  <div className="text-blue-300 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Doctor Image */}
          <div className="anim-slide-right flex-shrink-0 relative flex items-end justify-center w-[380px] hidden lg:flex">
            {/* Pulse rings */}
            <div className="pulse-ring absolute w-[380px] h-[380px] rounded-full border-2 border-green-400/40"></div>
            <div className="pulse-ring absolute w-[320px] h-[320px] rounded-full border-2 border-blue-400/30" style={{animationDelay:"0.8s"}}></div>
            {/* Circle bg */}
            <div className="absolute w-[300px] h-[300px] bg-gradient-to-br from-green-500/30 to-blue-600/30 rounded-full bottom-0"></div>
            {/* Doctor */}
            <img src={doctor} alt="Doctor" className="anim-float relative z-10 w-[320px] drop-shadow-2xl" />
            {/* Badge */}
            <div className="anim-badge absolute bottom-4 -left-4 bg-white text-blue-900 px-5 py-3 rounded-2xl shadow-xl z-20">
              <p className="font-bold text-sm">Dr. Prapti Sedai</p>
              <p className="text-xs text-green-600 font-medium">Orthopaedic Surgeon</p>
            </div>
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {images.map((_, index) => (
            <button key={index} onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${index === currentSlide ? "w-8 h-3 bg-green-400" : "w-3 h-3 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: <FaUserMd />, value: "50+", label: "Medical Professionals" },
            { icon: <FaAmbulance />, value: "24/7", label: "Emergency Care" },
            { icon: <FaHospital />, value: "Modern", label: "Facilities & Equipments" },
            { icon: <FaBriefcaseMedical />, value: "Expert", label: "Medical Consulting" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition">
              <div className="w-20 h-20 mx-auto mb-4 bg-[#1b10e6] rounded-full flex items-center justify-center">
                <span className="text-4xl text-white">{stat.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id || index}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center relative min-h-[280px] flex flex-col items-center"
              >
                <div className="w-16 h-16 mb-4 bg-[#1b10e6] rounded-full flex items-center justify-center">
                  <span className="text-2xl text-white">{service.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm">{service.description}</p>
                <div
                  onClick={() => navigate("/services")}
                  className="absolute bottom-0 right-0 w-12 h-12 bg-blue-50 rounded-tl-2xl rounded-br-2xl flex items-center justify-center cursor-pointer hover:bg-[#185FA5] transition group"
                >
                  <FaArrowRight className="text-sm text-[#185FA5] group-hover:text-white" />
                </div>
              </div>
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
                <div
                  key={doc.id || index}
                  className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition overflow-hidden text-center"
                >
                  <div className="h-56 overflow-hidden">
                    <img
                      src={doc.image ? `${import.meta.env.VITE_BACKEND_URL}/${doc.image.replace(/\\/g, "/")}` : "/default-doctor.jpg"}
                      alt={doc.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-blue-900">{doc.name}</h3>
                    <p className="text-green-600 text-sm font-medium mb-1">{doc.specialty}</p>
                    <p className="text-gray-500 text-xs">{doc.qualification || ""}</p>
                  </div>
                </div>
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
              <div key={i} className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4 hover:shadow-lg transition">
                <FaQuoteLeft className="text-blue-100 text-4xl" />
                <p className="text-gray-600 text-sm leading-relaxed -mt-2">{review.text}</p>
                <div className="flex gap-0.5 mt-auto">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <FaStar key={s} className={s < review.rating ? "text-yellow-400" : "text-gray-200"} size={14} />
                  ))}
                </div>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{review.name}</p>
                    <p className="text-xs text-gray-400">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Contact Us Here</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Have questions or need to schedule an appointment? Our team is here to help you.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate("/book-appointment")}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Book Appointment
            </button>
            <button className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition font-medium">
              Call: +977-985665655
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
    </>
  );
};

export default Home;
