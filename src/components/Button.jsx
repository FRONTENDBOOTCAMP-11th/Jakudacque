import tw from "tailwind-styled-components";
import PropTypes from "prop-types";

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default function Button({ children, ...rest }) {
  return (
    <StyledButton $rest={rest} onClick={rest.onClick}>
      <span className="font-bold ">{children}</span>
    </StyledButton>
  );
}

const StyledButton = tw.button`
  ${({ $rest }) => {
    let className = "";

    if ($rest.color) {
      className += `bg-${$rest.color} `;
    }
    if ($rest.text) {
      className += `text-${$rest.text} `;
    }
    return className;
  }}  
  px-4 py-2 rounded flex-shrink-0 min-w-20
`;
