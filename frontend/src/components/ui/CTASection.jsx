import { useNavigate } from "react-router-dom";

const CTASection = ({ title, description, buttons, bgColor = "bg-blue-900", textColor = "text-white" }) => {
  const navigate = useNavigate();

  return (
    <div className={`${bgColor} ${textColor} rounded-xl p-8 text-center`}>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className={`mb-6 ${bgColor === "bg-blue-900" ? "text-blue-200" : "text-gray-200"}`}>{description}</p>
      <div className="flex gap-4 justify-center flex-wrap">
        {buttons?.map((btn, i) => (
          <button
            key={i}
            onClick={() => navigate(btn.path)}
            className={`px-8 py-3 rounded-lg transition font-medium ${
              btn.variant === "primary"
                ? "bg-white text-blue-900 hover:bg-gray-100"
                : btn.variant === "success"
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-700 text-white hover:bg-gray-800"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CTASection;
