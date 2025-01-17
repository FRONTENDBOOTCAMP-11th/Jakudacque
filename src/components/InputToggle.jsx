import tw from "tailwind-styled-components";
import PropTypes from "prop-types";

InputToggle.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default function InputToggle({ label, disabled, checked, onChange }) {
  return (
    <>
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <span className="text-sm">{label}</span>
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
relative w-11 h-6 bg-neutral-200 rounded-full
peer-focus:outline-none peer-checked:after:translate-x-full peer-checked:bg-blue-600 peer-checked:after:border-white 
after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white 
after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
`;
