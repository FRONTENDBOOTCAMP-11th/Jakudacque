import { useEffect, useState } from "react";
import { IoChevronUp } from "react-icons/io5";

export default function TopButton() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 700) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {showButton && (
        <button
          className="border-2 border-[#ccc] rounded-full w-12 h-12 flex flex-col items-center fixed right-[4%] bottom-[5.5%] bg-white/90"
          onClick={scrollToTop}
        >
          <IoChevronUp color="#444" size="14px" className="mt-1.5" />
          <span className="text-sm leading-4 text-[#444]">TOP</span>
        </button>
      )}
    </>
  );
}
