import React from 'react';
import doctor1 from '../assets/doctors/drdhan keshar khadka.jpg';
import doctor2 from '../assets/doctors/drdipeshguptag.png';
import doctor3 from '../assets/doctors/drpiush kanodia.jpg';
import doctor4 from '../assets/doctors/drpradipmishra.jpg';
import doctor5 from '../assets/doctors/d4_1712726117.jpg';

const Specialists = () => {
  const specialists = [
    {
      name: "Dr. Dhan Keshar Khadka",
      specialty: "Cardiologist",
      qualification: "MBBS, MD (Cardiology)",
      experience: "15+ years",
      expertise: ["Heart Disease", "Cardiac Surgery", "ECG & Echo"],
      image: doctor1,
      fee: "Rs. 1500"
    },
    {
      name: "Dr. Dipesh Gupta",
      specialty: "Orthopedic Surgeon",
      qualification: "MBBS, MS (Orthopedics)",
      experience: "12+ years",
      expertise: ["Joint Replacement", "Sports Injuries", "Trauma Surgery"],
      image: doctor2,
      fee: "Rs. 1200"
    },
    {
      name: "Dr. Piyush Kanodia",
      specialty: "Pediatrician",
      qualification: "MBBS, MD (Pediatrics)",
      experience: "10+ years",
      expertise: ["Child Healthcare", "Vaccination", "Growth Monitoring"],
      image: doctor3,
      fee: "Rs. 1000"
    },
    {
      name: "Dr. Pradip Mishra",
      specialty: "General Surgeon",
      qualification: "MBBS, MS (General Surgery)",
      experience: "18+ years",
      expertise: ["Laparoscopic Surgery", "Emergency Surgery", "Hernia Repair"],
      image: doctor4,
      fee: "Rs. 1300"
    },
    {
      name: "Dr. Rajesh Sharma",
      specialty: "Neurologist",
      qualification: "MBBS, DM (Neurology)",
      experience: "14+ years",
      expertise: ["Stroke Management", "Epilepsy", "Headache Disorders"],
      image: doctor5,
      fee: "Rs. 1600"
    }
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Our Medical Specialists</h1>
          <p className="text-gray-600 text-lg">Expert doctors providing specialized medical care</p>
        </div>

        <div className="space-y-6">
          {specialists.map((specialist, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition flex"
            >
              <img 
                src={specialist.image} 
                alt={specialist.name} 
                className="w-40 h-40 object-cover object-top"
              />
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-blue-900">{specialist.name}</h3>
                    <p className="text-green-600 font-semibold">{specialist.specialty}</p>
                    <p className="text-sm text-gray-600">{specialist.qualification}</p>
                  </div>
                  <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{specialist.experience}</span>
                </div>
                <div className="mb-3">
                  <div className="flex flex-wrap gap-2">
                    {specialist.expertise.map((area, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Fee: <span className="font-semibold">{specialist.fee}</span></span>
                  <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-900 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Need a Specialist Consultation?</h3>
          <p className="mb-6">Contact us for expert medical care</p>
          <button className="bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-medium">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Specialists;
