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
          className="border-2 border-neutral-300 box-border rounded-full w-14 h-14 flex flex-col gap-y-0.5 items-center fixed right-6 bottom-24 bg-white/90 shadow-md shadow-neutral-200"
          onClick={scrollToTop}
        >
          <IoChevronUp color="#444" size="14px" className="mt-2" />
          <span className="leading-4  text-neutral-700">TOP</span>
        </button>
      )}
    </>
  );
}
