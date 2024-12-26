import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import './assets/css/typography.css';

function App() {
  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
}

export default App;
