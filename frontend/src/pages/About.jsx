import React from 'react';
import logo from '../assets/logo.png';
import doctorImg from '../assets/medium-shot-doctor-checking-blood-pressure-female-patient.jpg';
import surgeonImg from '../assets/ordinary-busy-day-surgeon.jpg';

const About = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-16 relative">
        <div className="absolute inset-0 opacity-20">
          <img src={doctorImg} alt="Hospital" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <img src={logo} alt="Swastik Hospital" className="w-24 mx-auto mb-6 bg-white rounded-full p-3" />
          <h1 className="text-4xl font-bold mb-4">About Swastik Hospital</h1>
        </div>
      </div>

      {/* Main About Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">About Swastik Hospital</h2>
          <p className="text-gray-600 leading-relaxed text-lg mb-6">
            Swastik Hospital is a specialized multi-specialty hospital committed to providing high-quality, personalized care 
            for patients with various medical concerns. With a skilled team led by experienced doctors including Dr. Dhan Keshar Khadka, 
            Dr. Dipesh Gupta, and Dr. Piyush Kanodia, we bring cutting-edge technology and years of surgical and clinical experience to your care.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium">
            Contact Us
          </button>
        </div>

        {/* Statistics Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition">
            <div className="text-5xl mb-4">👨‍⚕️</div>
            <h3 className="text-2xl font-bold text-blue-900 mb-2">50+</h3>
            <p className="text-gray-600">Medical Professionals</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition">
            <div className="text-5xl mb-4">🚑</div>
            <h3 className="text-2xl font-bold text-blue-900 mb-2">24/7</h3>
            <p className="text-gray-600">Emergency Care</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition">
            <div className="text-5xl mb-4">🏥</div>
            <h3 className="text-2xl font-bold text-blue-900 mb-2">Modern</h3>
            <p className="text-gray-600">Facilities & Equipments</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition">
            <div className="text-5xl mb-4">💼</div>
            <h3 className="text-2xl font-bold text-blue-900 mb-2">Expert</h3>
            <p className="text-gray-600">Medical Consulting</p>
          </div>
        </div>

        {/* Services Offered Section */}
        

        {/* Medical Experts Section */}
        

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Swastik Hospital?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">✓</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Affordable Healthcare</h3>
                <p className="text-blue-100">Quality medical services at reasonable and transparent pricing</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-3xl">✓</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Experienced Doctors</h3>
                <p className="text-blue-100">Highly qualified medical professionals with years of expertise</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-3xl">✓</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Modern Facilities</h3>
                <p className="text-blue-100">State-of-the-art equipment and comfortable patient care areas</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-3xl">✓</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Patient-Centered Care</h3>
                <p className="text-blue-100">Personalized treatment plans focused on your wellbeing</p>
              </div>
            </div>
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
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium">
              Book Appointment
            </button>
            <button className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition font-medium">
              Call: +977-1-XXXXXXX
            </button>
            <button className="bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition font-medium">
              Email Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
