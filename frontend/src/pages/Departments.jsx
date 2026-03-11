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

const Departments = () => {
  const departments = [
    {
      name: "Cardiology Department",
      description: "Our Cardiology Department offers comprehensive cardiac care with advanced diagnostic facilities, experienced cardiologists, and state-of-the-art treatment options for all heart-related conditions.",
      image: cardiologyImg,
      services: ["ECG", "Echocardiography", "Cardiac Catheterization", "Angioplasty"],
      head: "Dr. Dhan Keshar Khadka"
    },
    {
      name: "Surgery Department",
      description: "Equipped with modern operation theaters and advanced surgical equipment, our Surgery Department provides expert surgical care across various specialties with minimal invasive techniques.",
      image: surgeryImg,
      services: ["General Surgery", "Laparoscopic Surgery", "Emergency Surgery", "Post-operative Care"],
      head: "Dr. Pradip Mishra"
    },
    {
      name: "Orthopedics Department",
      description: "Specialized in treating bone, joint, and muscle disorders with advanced orthopedic surgery, joint replacement, and comprehensive rehabilitation programs.",
      image: orthopedicsImg,
      services: ["Joint Replacement", "Fracture Treatment", "Sports Injury", "Arthroscopy"],
      head: "Dr. Dipesh Gupta"
    },
    {
      name: "Pediatrics Department",
      description: "Dedicated to providing comprehensive healthcare for children from infancy through adolescence in a child-friendly environment with experienced pediatricians.",
      image: pediatricsImg,
      services: ["Child Healthcare", "Vaccination", "Growth Monitoring", "Pediatric Emergency"],
      head: "Dr. Piyush Kanodia"
    },
    {
      name: "Radiology Department",
      description: "Advanced imaging services with latest technology including X-Ray, CT Scan, MRI, and Ultrasound for accurate diagnosis and treatment planning.",
      image: radiologyImg,
      services: ["X-Ray", "CT Scan", "MRI", "Ultrasound"],
      head: "Dr. Rajesh Sharma"
    },
    {
      name: "Laboratory Department",
      description: "Fully equipped diagnostic laboratory providing accurate and timely test results with modern equipment and experienced laboratory technicians.",
      image: laboratoryImg,
      services: ["Blood Tests", "Urine Analysis", "Microbiology", "Pathology"],
      head: "Lab Director"
    },
    {
      name: "Maternity Department",
      description: "Complete maternity care including prenatal checkups, safe delivery, and postnatal care with experienced obstetricians and modern labor rooms.",
      image: maternityImg,
      services: ["Prenatal Care", "Normal Delivery", "C-Section", "Postnatal Care"],
      head: "Dr. Obstetrics Specialist"
    },
    {
      name: "Pharmacy Department",
      description: "24/7 pharmacy services providing quality medicines and healthcare products with expert pharmaceutical consultation and home delivery options.",
      image: pharmacyImg,
      services: ["Prescription Medicines", "OTC Products", "Medical Supplies", "Consultation"],
      head: "Chief Pharmacist"
    },
    {
      name: "Emergency Department",
      description: "Round-the-clock emergency services with trained emergency physicians, modern equipment, and ambulance services for immediate medical attention.",
      image: emergencyImg,
      services: ["24/7 Emergency", "Trauma Care", "Ambulance Service", "Critical Care"],
      head: "Emergency Medical Director"
    }
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Our Departments</h2>
          <p className="text-gray-600 text-lg">Specialized medical departments with expert care and modern facilities</p>
        </div>

        <div className="space-y-8">
          {departments.map((dept, index) => (
            <div 
              key={index}
              className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } flex flex-col lg:flex`}
            >
              <div className="lg:w-1/3">
                <img 
                  src={dept.image} 
                  alt={dept.name} 
                  className="w-full h-64 lg:h-full object-cover"
                />
              </div>
              <div className="lg:w-2/3 p-6 lg:p-8">
                <h3 className="text-2xl font-bold text-blue-900 mb-3">{dept.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{dept.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Services Offered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {dept.services.map((service, idx) => (
                      <span 
                        key={idx}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Department Head:</span> {dept.head}
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-900 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Need More Information?</h3>
          <p className="mb-6">Contact our departments directly for specialized consultation and appointments</p>
          <button className="bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-medium">
            Contact Departments
          </button>
        </div>
      </div>
    </div>
  );
};

export default Departments;
