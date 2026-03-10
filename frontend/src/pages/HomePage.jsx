import { useState, useEffect } from "react";
import doctorImage from "../assets/medium-shot-doctor-checking-blood-pressure-female-patient.jpg";
import surgeonImage from "../assets/ordinary-busy-day-surgeon.jpg";
import doctor from "../assets/9109683.png";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [doctorImage, surgeonImage];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[650px] overflow-hidden">
      {/* Background Slider */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover blur-md"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-between px-20">
        {/* Left Side Text */}
        <div className="flex-1 text-white">
          <h1 className="text-5xl font-bold mb-6">Swastik Hospital</h1>

          <p className="text-xl mb-2">
            Quality healthcare services for your wellbeing
          </p>

          <p className="text-lg mb-8">
            Experienced medical professionals dedicated to health
          </p>

          <div className="max-w-lg bg-white/80 rounded-xl p-8 shadow-lg">
            <p className="text-lg mb-4 text-gray-800 font-medium">
              Book your appointment today
            </p>

            <div className="flex gap-4">
              <button className="bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
                Book Appointment
              </button>
              <button className="bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Doctor */}
        <div className="flex-shrink-0 relative flex flex-col items-center z-20">
          {/* Green Circle Background */}
          <div className="absolute w-[420px] h-[420px] bg-gradient-to-r from-green-400 to-green-300 rounded-full -z-10"></div>

          {/* Doctor Image */}
          <img src={doctor} alt="Doctor" className="w-[360px] relative z-10" />

          {/* Doctor Name Card */}
          <div className="absolute bottom-6 left-20 bg-gradient-to-r from-green-500 to-green-300 text-white px-8 py-4 rounded-full shadow-lg text-center z-20">
            <h2 className="text-xl font-bold">Dr. Prapti Sedai</h2>
            <p className="text-sm opacity-90">Orthopaedic Surgeon</p>
          </div>
        </div>
      </div>

      {/* Slider Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-green-500 scale-125"
                : "bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
