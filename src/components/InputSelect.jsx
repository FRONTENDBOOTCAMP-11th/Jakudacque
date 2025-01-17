import PropTypes from "prop-types";

InputSelect.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default function InputSelect({ id, label, options, value, onChange }) {
  return (
    <div className="min-w-40">
      <label htmlFor={id} className="mb-2 text-sm">
        {label}
      </label>
      <select
        id={id}
        className="bg-neutral-50 border border-neutral-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        value={value}
        onChange={onChange}
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
