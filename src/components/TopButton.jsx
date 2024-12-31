import { IoChevronUp } from "react-icons/io5";

export default function TopButton() {
  return (
    <div className="border-2 border-[#ccc] rounded-full w-12 h-12 flex flex-col items-center fixed right-[4%] bottom-[5.5%] bg-white/90">
      <IoChevronUp color="#444" size="14px" className="mt-1.5" />
      <span className="text-sm leading-4 text-[#444]">TOP</span>
    </div>
  );
}
