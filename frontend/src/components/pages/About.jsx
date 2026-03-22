import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import doctorImg from "../../assets/medium-shot-doctor-checking-blood-pressure-female-patient.jpg";
import surgeryImg from "../../assets/ordinary-busy-day-surgeon.jpg";
import {
  FaCheckCircle, FaUserMd, FaAmbulance, FaHospital,
  FaBriefcaseMedical, FaHeartbeat, FaShieldAlt, FaClock,
  FaAward, FaHandHoldingHeart, FaMicroscope, FaPhoneAlt
} from "react-icons/fa";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50">

      {/* Hero */}
      <div className="bg-blue-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={doctorImg} alt="Hospital" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <img src={logo} alt="Swastik Hospital" className="w-24 mx-auto mb-6 rounded-full p-3" />
          <h1 className="text-5xl font-bold mb-4">About Swastik Hospital</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Dedicated to excellence in healthcare — serving our community with compassion, innovation, and integrity since 2005.
          </p>
          <div className="flex gap-4 justify-center mt-8 flex-wrap">
            <button onClick={() => navigate("/book-appointment")} className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
              Book Appointment
            </button>
            <button onClick={() => navigate("/contact")} className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white py-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <FaUserMd />, value: "50+", label: "Expert Doctors", color: "text-blue-600" },
              { icon: <FaAmbulance />, value: "24/7", label: "Emergency Care", color: "text-blue-500" },
              { icon: <FaHospital />, value: "15+", label: "Years of Service", color: "text-blue-700" },
              { icon: <FaBriefcaseMedical />, value: "10+", label: "Medical Services", color: "text-blue-400" },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6">
                <div className={`text-4xl mb-3 flex justify-center ${stat.color}`}>{stat.icon}</div>
                <h3 className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</h3>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-20">

        {/* Who We Are */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Who We Are</span>
            <h2 className="text-4xl font-bold text-blue-900 mt-2 mb-6">A Hospital Built on Trust & Compassion</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Swastik Hospital is a multi-specialty hospital committed to providing high-quality, personalized care for patients with various medical concerns. With a skilled team led by experienced doctors, we bring cutting-edge technology and years of surgical and clinical experience to your care.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Founded in 2005, we have grown from a small clinic to a full-fledged hospital serving thousands of patients every year. Our state-of-the-art facilities and compassionate staff ensure that every patient receives the best possible treatment in a comfortable and safe environment.
            </p>
            <div className="space-y-3">
              {["Accredited multi-specialty hospital", "Patient-first approach in every decision", "Transparent pricing with no hidden costs", "Continuous medical education for our staff"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <FaCheckCircle className="text-blue-500 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl h-96">
            <img src={surgeryImg} alt="Our Hospital" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div>
          <div className="text-center mb-10">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Our Foundation</span>
            <h2 className="text-4xl font-bold text-blue-900 mt-2">Mission, Vision & Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaHeartbeat className="text-3xl text-blue-500" />,
                title: "Our Mission",
                desc: "To provide accessible, affordable, and high-quality healthcare services to every individual in our community, ensuring the best possible health outcomes through compassionate and evidence-based care.",
                bg: "bg-blue-50 border-blue-100",
              },
              {
                icon: <FaAward className="text-3xl text-blue-600" />,
                title: "Our Vision",
                desc: "To be the most trusted and preferred healthcare institution in the region, recognized for clinical excellence, patient satisfaction, and innovation in medical services.",
                bg: "bg-blue-50 border-blue-100",
              },
              {
                icon: <FaShieldAlt className="text-3xl text-blue-700" />,
                title: "Our Values",
                desc: "Integrity, compassion, excellence, and respect form the core of everything we do. We believe every patient deserves dignity, transparency, and the highest standard of medical care.",
                bg: "bg-blue-50 border-blue-100",
              },
            ].map((item, i) => (
              <div key={i} className={`rounded-xl border p-8 ${item.bg}`}>
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-2xl p-10">
          <div className="text-center mb-10">
            <span className="text-blue-300 font-semibold text-sm uppercase tracking-widest">Why Us</span>
            <h2 className="text-4xl font-bold mt-2">Why Choose Swastik Hospital?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <FaClock />, title: "24/7 Emergency Care", desc: "Round-the-clock emergency services with rapid response teams always on standby." },
              { icon: <FaUserMd />, title: "Expert Specialists", desc: "Highly qualified doctors with decades of experience across all medical specialties." },
              { icon: <FaMicroscope />, title: "Advanced Technology", desc: "State-of-the-art diagnostic and treatment equipment for accurate and efficient care." },
              { icon: <FaHandHoldingHeart />, title: "Compassionate Care", desc: "We treat every patient with empathy, dignity, and personalized attention." },
              { icon: <FaShieldAlt />, title: "Safe & Hygienic", desc: "Strict infection control protocols and hygiene standards maintained at all times." },
              { icon: <FaBriefcaseMedical />, title: "Affordable Pricing", desc: "Transparent and reasonable pricing with flexible payment options for all patients." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white/10 rounded-xl p-5">
                <div className="text-2xl text-blue-300 flex-shrink-0 mt-1">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-blue-100 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* CTA */}
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FaPhoneAlt className="text-4xl mx-auto mb-4 text-blue-400" />
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-blue-200 mb-8 text-lg">Have questions or need to schedule an appointment? Our team is here to help you 24/7.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => navigate("/book-appointment")} className="bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-semibold">
              Book Appointment
            </button>
            <a href="tel:0815403520" className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition font-semibold">
              Call: 081-5403520
            </a>
            <a href="https://mail.google.com/mail/?view=cm&to=swastikhospital@gmail.com" target="_blank" rel="noreferrer" className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-900 transition font-semibold">
              Email Us
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
