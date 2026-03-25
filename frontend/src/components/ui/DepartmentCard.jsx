import { useNavigate } from "react-router-dom";

const DepartmentCard = ({ department, isSelected, onBook }) => {
  const navigate = useNavigate();

  const handleBook = () => {
    if (onBook) {
      onBook(department);
    } else {
      navigate(`/book-appointment?department_id=${department.id}`);
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 flex flex-col lg:flex-row ${
        isSelected ? "ring-2 ring-blue-500 shadow-xl" : "hover:shadow-xl"
      }`}
    >
      {/* Image */}
      <div className="lg:w-1/3 h-64 lg:h-auto overflow-hidden bg-gray-100 flex-shrink-0">
        <img
          src={department.image ? `/${department.image}` : "/default-dept.jpg"}
          alt={department.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="lg:w-2/3 p-6 lg:p-8 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold text-blue-900 mb-3">{department.name}</h3>
          {department.description && <p className="text-gray-600 mb-4 leading-relaxed">{department.description}</p>}

          {department.services && department.services.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2 text-sm">Services Offered:</h4>
              <div className="flex flex-wrap gap-2">
                {department.services.map((s) => (
                  <span key={s.id} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {s.service_name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          {department.head_doctor && (
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Department Head:</span> {department.head_doctor}
            </p>
          )}
          <button
            onClick={handleBook}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm ml-auto"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
