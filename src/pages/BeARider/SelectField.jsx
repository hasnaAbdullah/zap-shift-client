// SelectField.jsx
import React from "react";

const SelectField = ({
  label,
  name,
  register,
  options = [],
  required = false,
  error,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        {...register(name, { required })}
        className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        disabled={disabled}
      >
        <option value="">Select {label}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-sm mt-1">{label} is required.</p>
      )}
    </div>
  );
};

export default SelectField;
