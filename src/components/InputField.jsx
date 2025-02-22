import PropTypes from "prop-types";
import tw from "tailwind-styled-components";

export default function InputField({
  id,
  label,
  defaultValue,
  register,
  errorMsg,
}) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        className="px-2 py-1 border rounded-md focus:outline-none border-neutral-400"
        defaultValue={defaultValue}
        {...register}
      />
      {errorMsg && <ErrorText>{errorMsg}</ErrorText>}
    </>
  );
}

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  register: PropTypes.object.isRequired,
  errorMsg: PropTypes.string,
};

const ErrorText = tw.p`
  col-start-2 text-sm text-red-500
`;
