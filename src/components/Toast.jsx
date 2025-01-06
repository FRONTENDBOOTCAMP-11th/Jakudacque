import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  return (
    <ToastContainer
      position={"top-center"}
      autoClose={3000}
      hideProgressBar
      newestOnTop
      closeButton={true}
      toastClassName={() =>
        "bg-[white] text-[#333] p-5 border-2 rounded-lg border-warning shadow-lg text-center"
      }
      bodyClassName={() => "text-sm whitespace-normal"}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "auto",
        zIndex: 9999,
      }}
    />
  );
}
