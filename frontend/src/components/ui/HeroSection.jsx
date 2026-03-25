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
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .anim-fade-up-1 { animation: fadeUp 0.8s ease forwards; }
        .anim-fade-up-2 { animation: fadeUp 0.8s 0.2s ease both; }
        .anim-fade-up-3 { animation: fadeUp 0.8s 0.4s ease both; }
        .anim-fade-up-4 { animation: fadeUp 0.8s 0.6s ease both; }
      `}</style>

      <div className="relative w-full min-h-[560px] overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800">
        {/* Animated background blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>

        {/* Sliding background image */}
        {images?.map((image, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-20" : "opacity-0"}`}>
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-12 lg:pb-0 min-h-[560px] flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8">
          {/* Left Content */}
          <div className="flex-1 text-white max-w-xl lg:pb-10">
            <div className="anim-fade-up-1 inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 text-green-300 text-sm font-medium px-4 py-2 rounded-full mb-6">
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
            <div className="relative hidden lg:flex flex-shrink-0 self-end items-end justify-center w-[400px] h-[470px]">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full border-2 border-green-400/40"></div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full border-2 border-blue-400/30"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[320px] h-[320px] bg-gradient-to-br from-green-500/30 to-blue-600/30 rounded-full"></div>
              <img src={doctorImage} alt="Doctor" className="relative z-10 w-[340px] max-w-none self-end drop-shadow-2xl" />
              {doctorBadge && (
                <div className="absolute bottom-4 -left-4 bg-white text-blue-900 px-5 py-3 rounded-2xl shadow-xl z-20">
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
