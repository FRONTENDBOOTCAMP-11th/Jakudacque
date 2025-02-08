import Header from "@components/layout/Header";
import Category from "@components/layout/Category";
import Footer from "@components/layout/Footer";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import TopButton from "@components/layout/TopButton";
import ChannelTalk from "@components/ChannelTalk";

export default function Layout() {
  const location = useLocation();
  const IS_ADMIN = location.pathname.includes("/admin");

  return (
    <div className="flex flex-col min-h-screen duration-500 ease-in-out transition-color">
      {!IS_ADMIN && (
        <>
          <Header />

          <Category />
        </>
      )}

      <ChannelTalk />

      <Outlet />

      {!IS_ADMIN && <Footer />}

      <TopButton />
    </div>
  );
}
