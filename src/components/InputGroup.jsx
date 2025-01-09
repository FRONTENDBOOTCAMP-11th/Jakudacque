import PropTypes from "prop-types";

InputGroup.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
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
    <div className="flex flex-col">
      <label className="mb-1 text-sm" htmlFor={id}>
        {label}
      </label>
      <input
        className={`${disabled && "bg-gray-100"} 
          p-2 border border-gray-300 rounded-lg 
          active:outline-none focus:ring-blue-500 focus:border-blue-500
        `}
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
