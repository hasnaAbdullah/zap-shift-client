// components/FormSelect.js
const FormSelect = ({ label, name, register, options = [], required }) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-black">{label}</label>
    <select className="input" {...register(name, { required })}>
      <option value="">Select {label.toLowerCase()}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default FormSelect;
