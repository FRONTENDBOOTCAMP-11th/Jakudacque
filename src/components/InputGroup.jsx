import PropTypes from "prop-types";

InputGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string || PropTypes.number,
  onChange: PropTypes.func,
};

export default function InputGroup({
  id,
  label,
  type = "text",
  placeholder,
  disabled,
  value,
  onChange,
}) {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1 text-sm" htmlFor={id}>
        {label}
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg active:outline-none focus:outline-none focus:border-error"
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
