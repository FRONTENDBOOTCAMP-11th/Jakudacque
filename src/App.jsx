import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import "./assets/css/typography.css";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "@components/Toast";

function App() {
  return (
    <>
      <ToastProvider position="bottom-left" />
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </>
  );
}

export default App;
