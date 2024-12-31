import tw from "tailwind-styled-components";
import PropTypes from "prop-types";

InputToggle.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default function InputToggle({ label, disabled, checked, onChange }) {
  return (
    <>
      <label className="inline-flex items-center gap-2 mb-4 cursor-pointer">
        <span className="text-sm after:content-['*'] after:text-red-500">
          {label}
        </span>
        <input
          className="sr-only peer"
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={onChange}
        />
        <StyledToggle />
      </label>
    </>
  );
}

const StyledToggle = tw.div`
relative w-11 h-6 bg-gray-200 rounded-full
peer-focus:outline-none peer-checked:after:translate-x-full peer-checked:bg-blue-600 peer-checked:after:border-white 
after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white 
after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
`;
