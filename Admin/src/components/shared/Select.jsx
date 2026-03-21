const Select = ({ options, placeholder, onChange }) => (
  <select
    defaultValue=""
    onChange={onChange}
    className="px-2 py-1.5 border rounded-md text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="" disabled>{placeholder}</option>
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);

export default Select;
