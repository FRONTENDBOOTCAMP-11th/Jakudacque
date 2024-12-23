import Header from "@components/layout/Header";
import Category from "@components/layout/Category";
import Footer from "@components/layout/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen transition-color duration-500 ease-in-out">
      <Header />

      <Category />

      <Outlet />

      <Footer />
    </div>
  );
}
