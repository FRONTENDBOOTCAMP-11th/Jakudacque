import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import tw from "tailwind-styled-components";

export default function ToastProvider() {
  return (
    <StyledToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar
      newestOnTop
      closeButton={false}
      toastClassName={() =>
        "bg-[white] text-[#333] p-5 border-2 rounded-lg border-warning shadow-lg text-center"
      }
      bodyClassName={() => "text-sm whitespace-normal"}
    />
  );
}

const StyledToastContainer = tw(ToastContainer)`
  flex 
  items-center 
  justify-center 
  fixed 
  inset-0 
  z-50 
  pointer-events-none
`;
