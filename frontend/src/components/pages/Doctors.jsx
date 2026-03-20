import React from 'react';
import doctor1 from '../assets/doctors/drdhan keshar khadka.jpg';
import doctor2 from '../assets/doctors/drdipeshguptag.png';
import doctor3 from '../assets/doctors/drpiush kanodia.jpg';
import doctor4 from '../assets/doctors/drpradipmishra.jpg';
import doctor5 from '../assets/doctors/d4_1712726117.jpg';

const Doctors = () => {
  const doctors = [
    {
      name: "Dr. Dhan Keshar Khadka",
      specialty: "Cardiologist",
      experience: "15+ years",
      description: "Specialized in heart diseases, cardiac surgery, and preventive cardiology with extensive experience in complex cardiac procedures.",
      image: doctor1,
      availability: "Mon - Fri: 9:00 AM - 5:00 PM"
    },
    {
      name: "Dr. Dipesh Gupta",
      specialty: "Orthopedic Surgeon",
      experience: "12+ years",
      description: "Expert in joint replacement, sports injuries, and trauma surgery with a focus on minimally invasive techniques.",
      image: doctor2,
      availability: "Mon - Sat: 10:00 AM - 6:00 PM"
    },
    {
      name: "Dr. Piyush Kanodia",
      specialty: "Pediatrician",
      experience: "10+ years",
      description: "Dedicated to child healthcare, vaccination programs, and developmental pediatrics with a compassionate approach.",
      image: doctor3,
      availability: "Mon - Fri: 8:00 AM - 4:00 PM"
    },
    {
      name: "Dr. Pradip Mishra",
      specialty: "General Surgeon",
      experience: "18+ years",
      description: "Experienced in laparoscopic surgery, emergency procedures, and general surgical care with excellent patient outcomes.",
      image: doctor4,
      availability: "Mon - Sat: 9:00 AM - 5:00 PM"
    },
    {
      name: "Dr. Rajesh Sharma",
      specialty: "Neurologist",
      experience: "14+ years",
      description: "Specialized in neurological disorders, stroke management, and neurocritical care with advanced diagnostic expertise.",
      image: doctor5,
      availability: "Tue - Sat: 10:00 AM - 6:00 PM"
    }
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Our Expert Doctors</h2>
          <p className="text-gray-600 text-lg">Meet our team of experienced medical professionals dedicated to your health</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 transform"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2">{doctor.name}</h3>
                <p className="text-green-600 font-semibold mb-2">{doctor.specialty}</p>
                <p className="text-sm text-gray-500 mb-3">Experience: {doctor.experience}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{doctor.description}</p>
                <div className="border-t pt-4">
                  <p className="text-xs text-gray-500 mb-3">
                    <span className="font-semibold">Available:</span> {doctor.availability}
                  </p>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-900 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Looking for a Specialist?</h3>
          <p className="mb-6">Contact us to schedule an appointment with our expert doctors</p>
          <button className="bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-medium">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
