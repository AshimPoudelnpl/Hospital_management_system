import { FaStethoscope, FaClock, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DoctorCard = ({ doctor, onBook }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleBook = () => {
    if (onBook) {
      onBook(doctor);
    } else {
      const params = new URLSearchParams();
      if (doctor.department_id) params.append("department_id", doctor.department_id);
      params.append("doctor_id", doctor.id);
      navigate(`/book-appointment?${params.toString()}`);
    }
  };

  const imageUrl = doctor.image
    ? `${import.meta.env.VITE_BACKEND_URL}/${doctor.image.replace(/\\\\/g, "/")}`
    : "/default-doctor.jpg";

  const maxLength = 100;
  const shouldTruncate = doctor.description && doctor.description.length > maxLength;
  const displayDescription = isExpanded ? doctor.description : doctor.description?.substring(0, maxLength);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="h-64 overflow-hidden bg-gray-100">
        <img src={imageUrl} alt={doctor.name} className="w-full h-full object-cover object-top" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-1">{doctor.name}</h3>
        <p className="text-green-600 font-semibold mb-1 flex items-center gap-2">
          <FaStethoscope className="text-sm" /> {doctor.specialty}
        </p>
        {doctor.experience && (
          <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
            <FaClock className="text-xs" /> {doctor.experience} experience
          </p>
        )}
        {doctor.description && (
          <div className="mb-4">
            <p className="text-gray-600 text-sm leading-relaxed">
              {displayDescription}
              {shouldTruncate && !isExpanded && "..."}
            </p>
            {shouldTruncate && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-600 text-sm font-semibold mt-2 flex items-center gap-1 hover:text-blue-700 transition"
              >
                {isExpanded ? "See Less" : "See More"}
                <FaChevronDown className={`text-xs transition-transform ${isExpanded ? "rotate-180" : ""}`} />
              </button>
            )}
          </div>
        )}
        <button
          onClick={handleBook}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
