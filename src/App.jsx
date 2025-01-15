import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import "./assets/css/typography.css";
import ToastProvider from "@components/Toast";
import ChannelTalk from "@components/ChannelTalk";

function App() {
  return (
    <>
      <ChannelTalk />
      <ToastProvider />
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </>
  );
}

export default App;
