import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = ({ images, title, subtitle, buttons, stats, showDoctorImage, doctorImage, doctorBadge }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images?.length]);

  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideRight { from { opacity: 0; transform: translateX(60px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes pulse-ring { 0%, 100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.08); opacity: 0.3; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes badgeSlide { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        .anim-fade-up-1 { animation: fadeUp 0.8s ease forwards; }
        .anim-fade-up-2 { animation: fadeUp 0.8s 0.2s ease both; }
        .anim-fade-up-3 { animation: fadeUp 0.8s 0.4s ease both; }
        .anim-fade-up-4 { animation: fadeUp 0.8s 0.6s ease both; }
        .anim-slide-right { animation: slideRight 0.9s 0.3s ease both; }
        .anim-float { animation: float 3.5s ease-in-out infinite; }
        .anim-badge { animation: badgeSlide 0.8s 0.8s ease both; }
        .pulse-ring { animation: pulse-ring 2.5s ease-in-out infinite; }
      `}</style>

      <div className="relative w-full min-h-[650px] overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800">
        {/* Animated background blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>

        {/* Sliding background image */}
        {images?.map((image, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-20" : "opacity-0"}`}>
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 flex items-center justify-between gap-10">
          {/* Left Content */}
          <div className="flex-1 text-white max-w-xl">
            <div className="anim-fade-up-1 inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 text-green-300 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Trusted Healthcare Since 2005
            </div>
            <h1 className="anim-fade-up-2 text-5xl lg:text-6xl font-extrabold leading-tight mb-5">
              {title}
            </h1>
            <p className="anim-fade-up-3 text-blue-200 text-lg leading-relaxed mb-8">
              {subtitle}
            </p>
            <div className="anim-fade-up-4 flex gap-4 flex-wrap">
              {buttons?.map((btn, i) => (
                <button
                  key={i}
                  onClick={() => navigate(btn.path)}
                  className={`px-7 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    btn.variant === "primary"
                      ? "bg-green-500 hover:bg-green-400 text-white shadow-lg shadow-green-500/30 hover:scale-105"
                      : "border border-white/40 hover:border-white text-white hover:bg-white/10"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Mini stats */}
            {stats && (
              <div className="anim-fade-up-4 flex gap-8 mt-10">
                {stats.map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-white">{s.val}</div>
                    <div className="text-blue-300 text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right — Doctor Image */}
          {showDoctorImage && doctorImage && (
            <div className="anim-slide-right flex-shrink-0 relative flex items-end justify-center w-[380px] hidden lg:flex">
              <div className="pulse-ring absolute w-[380px] h-[380px] rounded-full border-2 border-green-400/40"></div>
              <div className="pulse-ring absolute w-[320px] h-[320px] rounded-full border-2 border-blue-400/30" style={{animationDelay:"0.8s"}}></div>
              <div className="absolute w-[300px] h-[300px] bg-gradient-to-br from-green-500/30 to-blue-600/30 rounded-full bottom-0"></div>
              <img src={doctorImage} alt="Doctor" className="anim-float relative z-10 w-[320px] drop-shadow-2xl" />
              {doctorBadge && (
                <div className="anim-badge absolute bottom-4 -left-4 bg-white text-blue-900 px-5 py-3 rounded-2xl shadow-xl z-20">
                  <p className="font-bold text-sm">{doctorBadge.name}</p>
                  <p className="text-xs text-green-600 font-medium">{doctorBadge.title}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Slide dots */}
        {images && images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide ? "w-8 h-3 bg-green-400" : "w-3 h-3 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HeroSection;
