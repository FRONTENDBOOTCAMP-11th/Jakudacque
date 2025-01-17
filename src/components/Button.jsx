import tw from "tailwind-styled-components";
import PropTypes from "prop-types";

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default function Button({ children, ...rest }) {
  let classNames = "";

  switch (rest.color) {
    case "primary":
      classNames = "bg-primary ";
      break;
    case "secondary":
      classNames = "bg-secondary ";
      break;
    case "success":
      classNames = "bg-success ";
      break;
    case "warning":
      classNames = "bg-warning ";
      break;
    case "error":
      classNames = "bg-error ";
      break;
    case "info":
      classNames = "bg-info ";
      break;
    default:
      classNames = "bg-neutral-500 ";
  }

  return (
    <StyledButton className={` ${classNames}`} onClick={rest.onClick}>
      <span className="font-bold ">{children}</span>
    </StyledButton>
  );
}

const StyledButton = tw.button`  
  px-4 py-2 rounded flex-shrink-0 min-w-20
`;
