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
          className="border-2 border-[#ccc] box-border rounded-[24px] w-[56px] h-[56px] flex flex-col gap-y-0.5 items-center fixed right-[24px] bottom-[88px] bg-[#fff]/90 shadow-md shadow-[#eee]"
          onClick={scrollToTop}
        >
          <IoChevronUp color="#444" size="14px" className="mt-2" />
          <span className="text-[16px] leading-4 text-[#444]">TOP</span>
        </button>
      )}
    </>
  );
}
