import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const HeroSection = ({ images, title, subtitle, buttons, stats, showDoctorImage, doctorImage, doctorBadge }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const statsRef = useRef(null);
  const doctorImgRef = useRef(null);
  const circle1Ref = useRef(null);
  const circle2Ref = useRef(null);
  const circle3Ref = useRef(null);
  const badgeCardRef = useRef(null);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images?.length]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(badgeRef.current, { opacity: 0, scale: 0.5, rotation: -10 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: "back.out(2)" })
      .fromTo(titleRef.current, { opacity: 0, x: -100, rotationX: -20 }, { opacity: 1, x: 0, rotationX: 0, duration: 1 }, "-=0.5")
      .fromTo(subtitleRef.current, { opacity: 0, y: 30, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.9 }, "-=0.7")
      .fromTo(buttonsRef.current?.children, { opacity: 0, y: 30, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.5)" }, "-=0.5")
      .fromTo(statsRef.current?.children, { opacity: 0, y: 20, scale: 0.5 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: "elastic.out(1, 0.5)" }, "-=0.4");

    if (showDoctorImage) {
      gsap.fromTo(
        [circle1Ref.current, circle2Ref.current, circle3Ref.current],
        { scale: 0, rotation: 180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: "elastic.out(1, 0.6)" }
      );
      
      gsap.fromTo(
        doctorImgRef.current,
        { opacity: 0, y: 100, scale: 0.8, rotation: -5 },
        { opacity: 1, y: 0, scale: 1, rotation: 0, duration: 1.2, delay: 0.6, ease: "back.out(1.4)" }
      );
      
      gsap.fromTo(
        badgeCardRef.current,
        { opacity: 0, x: -50, y: 20, scale: 0.5, rotation: -15 },
        { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0, duration: 1, delay: 1.2, ease: "elastic.out(1, 0.7)" }
      );
    }
  }, [showDoctorImage]);

  return (
    <>
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
            <div ref={badgeRef} className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 text-green-300 text-sm font-medium px-4 py-2 rounded-full mb-6">
              Trusted Healthcare Since 2005
            </div>
            <h1 ref={titleRef} className="text-5xl lg:text-6xl font-extrabold leading-tight mb-5">
              {title}
            </h1>
            <p ref={subtitleRef} className="text-blue-200 text-lg leading-relaxed mb-8">
              {subtitle}
            </p>
            <div ref={buttonsRef} className="flex gap-4 flex-wrap">
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
              <div ref={statsRef} className="flex gap-8 mt-10">
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
              <div ref={circle1Ref} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full border-2 border-green-400/40"></div>
              <div ref={circle2Ref} className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full border-2 border-blue-400/30"></div>
              <div ref={circle3Ref} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[320px] h-[320px] bg-gradient-to-br from-green-500/30 to-blue-600/30 rounded-full"></div>
              <img ref={doctorImgRef} src={doctorImage} alt="Doctor" className="relative z-10 w-[340px] max-w-none self-end drop-shadow-2xl" />
              {doctorBadge && (
                <div ref={badgeCardRef} className="absolute bottom-4 -left-4 bg-white text-blue-900 px-5 py-3 rounded-2xl shadow-xl z-20">
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
