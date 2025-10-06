import { Bounce, ToastContainer } from "react-toastify";

export default function ToastProvider() {
  return (
    <ToastContainer
      position={"bottom-left"}
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeButton={true}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
      toastClassName={() =>
        "bg-white text-neutral-800 min-w-60 p-4 border-2 rounded-lg border-warning shadow-lg flex"
      }
      bodyClassName={() => "text-sm whitespace-normal"}
    />
  );
}
