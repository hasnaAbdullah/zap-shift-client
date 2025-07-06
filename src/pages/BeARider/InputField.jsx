import React from "react";

const InputField = ({
  label,
  name,
  register,
  required = false,
  placeholder = "",
  readOnly = false,
  value = "",
  type = "text",
}) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={name}
          className="mb-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        readOnly={readOnly}
        defaultValue={value}
        {...(register && register(name, { required }))}
        className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
          readOnly ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
};

export default InputField;
