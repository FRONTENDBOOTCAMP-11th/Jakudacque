import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function BackButton({ text = "다이어리" }) {
  const navigate = useNavigate();
  
  return (
    <div className="mb-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2"
      >
        <IoChevronBackOutline className="text-xl" />
        {text}
      </button>
    </div>
  );
}