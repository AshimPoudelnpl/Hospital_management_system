const SearchBar = ({ value, onChange, placeholder = "Search...", className = "" }) => {
  const widthClass = className ? "" : "sm:w-60";

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${widthClass} ${className}`.trim()}
    />
  );
};

export default SearchBar;
