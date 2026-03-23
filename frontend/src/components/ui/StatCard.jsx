const StatCard = ({ icon, value, label }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition">
      <div className="w-20 h-20 mx-auto mb-4 bg-[#1b10e6] rounded-full flex items-center justify-center">
        <span className="text-4xl text-white">{icon}</span>
      </div>
      <h3 className="text-2xl font-bold text-blue-900 mb-2">{value}</h3>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};

export default StatCard;
