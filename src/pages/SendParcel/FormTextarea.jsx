// components/FormTextarea.js
const FormTextarea = ({ label, name, register }) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-black">{label}</label>
    <textarea
      className="input min-h-30"
      placeholder={`Enter ${label.toLowerCase()}`}
      rows={3}
      {...register(name)}
    />
  </div>
);

export default FormTextarea;
