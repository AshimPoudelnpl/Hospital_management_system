const Select = ({ options = [], placeholder, onChange, className = "" }) => (
  <select
    defaultValue=""
    onChange={onChange}
    className={`min-h-[38px] rounded-md border px-2 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  >
    <option value="" disabled>
      {placeholder}
    </option>
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

export default Select;
