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
} from "react-icons/fa";

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
      {/* Hero Slider */}
      <div className="relative w-full h-[650px] overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
          >
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover blur-md" />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="absolute inset-0 flex items-center justify-between px-20">
          <div className="flex-1 text-white">
            <h1 className="text-5xl font-bold mb-6 ml-10">Swastik Hospital</h1>
            <p className="text-xl mb-2">Quality healthcare services for your wellbeing</p>
            <p className="text-lg mb-8">Experienced medical professionals dedicated to your health</p>
            <div className="max-w-lg bg-white/80 rounded-xl p-8 shadow-lg">
              <p className="text-lg mb-4 text-gray-800 font-medium">Book your appointment today</p>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate("/book-appointment")}
                  className="bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
                >
                  Book Appointment
                </button>
                <button
                  onClick={() => navigate("/contact")}
                  className="bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 relative flex flex-col items-center z-20">
            <div className="absolute w-[420px] h-[420px] bg-gradient-to-r from-green-400 to-green-300 rounded-full -z-10"></div>
            <img src={doctor} alt="Doctor" className="w-[360px] relative z-10" />
            <div className="absolute bottom-6 left-20 bg-gradient-to-r from-green-500 to-green-300 text-white px-8 py-4 rounded-full shadow-lg text-center z-20">
              <h2 className="text-xl font-bold">Dr. Prapti Sedai</h2>
              <p className="text-sm opacity-90">Orthopaedic Surgeon</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-green-500 scale-125" : "bg-white/60 hover:bg-white"}`}
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
                      src={doc.image ? `/uploads/doctors/${doc.image}` : "/default-doctor.jpg"}
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
