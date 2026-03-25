import { useNavigate } from "react-router-dom";

const CTASection = ({
  title,
  description,
  buttons,
  bgGradient = "from-blue-900 via-blue-700 to-indigo-800",
}) => {
  const navigate = useNavigate();

  return (
    <div className={`relative overflow-hidden rounded-2xl p-10 text-center bg-gradient-to-r ${bgGradient} text-white shadow-xl`}>
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl"></div>

      <div className="relative z-10">
        {/* Title */}
        <h3 className="text-3xl font-extrabold mb-3 tracking-wide">
          {title}
        </h3>

        {/* Description */}
        <p className="mb-8 text-blue-100 max-w-xl mx-auto text-lg">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          {buttons?.map((btn, i) => (
            <button
              key={i}
              onClick={() => navigate(btn.path)}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:scale-105 transform ${
                btn.variant === "primary"
                  ? "bg-white text-blue-900 hover:bg-gray-100"
                  : btn.variant === "success"
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : btn.variant === "outline"
                  ? "border border-white text-white hover:bg-white hover:text-blue-900"
                  : "bg-gray-800 hover:bg-gray-900 text-white"
              }`}
            >
              {btn.icon && <span className="mr-2">{btn.icon}</span>}
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Decorative circles */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-400/30 rounded-full blur-2xl"></div>
    </div>
  );
};

export default CTASection;
