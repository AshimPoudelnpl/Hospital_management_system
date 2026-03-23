import { FaStethoscope, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor, onBook }) => {
  const navigate = useNavigate();

  const handleBook = () => {
    if (onBook) {
      onBook(doctor);
    } else {
      navigate("/book-appointment");
    }
  };

  const imageUrl = doctor.image
    ? `${import.meta.env.VITE_BACKEND_URL}/${doctor.image.replace(/\\\\/g, "/")}`
    : "/default-doctor.jpg";

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
        {doctor.department_name && <p className="text-sm text-blue-500 mb-2">{doctor.department_name}</p>}
        {doctor.experience && (
          <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
            <FaClock className="text-xs" /> {doctor.experience} experience
          </p>
        )}
        {doctor.description && <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{doctor.description}</p>}
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
