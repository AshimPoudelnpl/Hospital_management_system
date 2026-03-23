import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ service, onAction }) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (onAction) {
      onAction(service);
    } else {
      navigate("/book-appointment");
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center relative min-h-[280px] flex flex-col items-center">
      {/* Icon or Image */}
      {service.icon ? (
        <div className="w-16 h-16 mb-4 bg-[#1b10e6] rounded-full flex items-center justify-center">
          <span className="text-2xl text-white">{service.icon}</span>
        </div>
      ) : service.image ? (
        <div className="w-full h-40 mb-4 rounded-lg overflow-hidden">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
        </div>
      ) : null}

      <h3 className="text-xl font-bold text-blue-900 mb-2">{service.title}</h3>
      <p className="text-gray-500 text-sm flex-grow">{service.description}</p>

      {/* Action Button */}
      <div
        onClick={handleAction}
        className="absolute bottom-0 right-0 w-12 h-12 bg-blue-50 rounded-tl-2xl rounded-br-2xl flex items-center justify-center cursor-pointer hover:bg-[#185FA5] transition group"
      >
        <FaArrowRight className="text-sm text-[#185FA5] group-hover:text-white" />
      </div>
    </div>
  );
};

export default ServiceCard;
