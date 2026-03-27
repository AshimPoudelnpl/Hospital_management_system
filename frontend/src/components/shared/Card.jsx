import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const Card = ({ 
  image, 
  title, 
  subtitle, 
  description, 
  badge,
  tags = [],
  buttonText = "Book Appointment",
  onButtonClick,
  navigateTo,
  icon: Icon,
  expandable = false,
  className = ""
}) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
  
  const imageUrl = image && !imageFailed
    ? image.startsWith('http') 
      ? image 
      : `${backendUrl}/${image.replace(/\\/g, "/").replace(/^\/+/, "")}`
    : null;

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else if (navigateTo) {
      navigate(navigateTo);
    }
  };

  const maxLength = 150;
  const shouldTruncate = expandable && description && description.length > maxLength;
  const displayDescription = isExpanded || !shouldTruncate 
    ? description 
    : description?.substring(0, maxLength);

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full cursor-pointer ${className}`}>
      <div className="h-64 overflow-hidden bg-gray-100 flex-shrink-0">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover object-top"
            onError={() => setImageFailed(true)}
          />
        ) : Icon ? (
          <div className="w-full h-full flex items-center justify-center bg-blue-50">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <Icon className="text-3xl text-white" />
            </div>
          </div>
        ) : null}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-blue-900 mb-1 line-clamp-1">{title}</h3>
          
          {subtitle && (
            <div className="text-green-600 font-semibold mb-1">
              {subtitle}
            </div>
          )}

          {badge && (
            <div className="text-sm text-gray-500 mb-3">
              {badge}
            </div>
          )}

          {description && (
            <div className="mb-4">
              <p className={`text-gray-600 text-sm leading-relaxed whitespace-pre-line ${!isExpanded && shouldTruncate ? 'line-clamp-3' : ''}`}>
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

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <span key={index} className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {buttonText && (
          <button
            onClick={handleButtonClick}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium mt-auto"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
