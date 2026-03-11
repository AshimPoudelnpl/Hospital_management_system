import React from 'react';
import cardiologyImg from '../assets/cardiology.jpg';
import surgeryImg from '../assets/surgery.jpg';
import orthopedicsImg from '../assets/orthopedics.jpg';
import pediatricsImg from '../assets/pedratics.jpg';
import radiologyImg from '../assets/Radiology.jpg';
import laboratoryImg from '../assets/laboratory.jpg';
import maternityImg from '../assets/maternity care.jpg';
import pharmacyImg from '../assets/pharmacy.jpg';
import emergencyImg from '../assets/emergency services.jpg';

const Services = () => {
  const services = [
    {
      title: "Emergency Care",
      description: "24/7 emergency medical services with state-of-the-art facilities and experienced emergency physicians ready to handle critical situations.",
      image: emergencyImg
    },
    {
      title: "Surgery",
      description: "Advanced surgical procedures with modern operation theaters and highly skilled surgeons specializing in various surgical disciplines.",
      image: surgeryImg
    },
    {
      title: "Cardiology",
      description: "Comprehensive heart care services including diagnostics, treatment, and cardiac rehabilitation programs for all heart conditions.",
      image: cardiologyImg
    },
    {
      title: "Orthopedics",
      description: "Expert treatment for bone, joint, and muscle conditions with advanced orthopedic surgery and rehabilitation services.",
      image: orthopedicsImg
    },
    {
      title: "Pediatrics",
      description: "Specialized healthcare for infants, children, and adolescents with child-friendly environment and experienced pediatricians.",
      image: pediatricsImg
    },
    {
      title: "Radiology",
      description: "Advanced imaging services including X-Ray, CT Scan, MRI, and Ultrasound with latest technology and expert radiologists.",
      image: radiologyImg
    },
    {
      title: "Laboratory",
      description: "Comprehensive diagnostic laboratory services with accurate and timely test results using modern equipment and techniques.",
      image: laboratoryImg
    },
    {
      title: "Maternity Care",
      description: "Complete maternity services including prenatal care, delivery, and postnatal care with experienced obstetricians and midwives.",
      image: maternityImg
    },
    {
      title: "Pharmacy",
      description: "24/7 pharmacy services providing quality medicines and healthcare products with expert pharmaceutical consultation.",
      image: pharmacyImg
    }
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Our Medical Services</h2>
          <p className="text-gray-600 text-lg">Comprehensive healthcare services for your wellbeing</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 transform"
            >
              <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
                <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-900 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Need Medical Assistance?</h3>
          <p className="mb-6">Our team is available 24/7 to help you with any medical emergency or consultation</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-blue-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition font-medium">
              Book Appointment
            </button>
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition font-medium">
              Emergency: +977-986568345
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
