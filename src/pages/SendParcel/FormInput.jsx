// components/FormInput.js
const FormInput = ({
  label,
  type = "text",
  register,
  name,
  placeholder,
  required,
}) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-black">{label}</label>
    <input
      type={type}
      className="input"
      placeholder={placeholder}
      {...register(name, { required })}
    />
  </div>
);

export default FormInput;
