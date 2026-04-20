const StatsCard = ({ label, value, icon: Icon, color = "blue" }) => {
  const colorClasses = {
    blue: "text-blue-900",
    green: "text-green-600",
    red: "text-red-600",
    yellow: "text-yellow-600",
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <p className="text-gray-600 text-xs font-medium mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <p className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</p>
        {Icon && <Icon className={`text-${color}-400`} size={16} />}
      </div>
    </div>
  );
};

export default StatsCard;
