import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  const menuItems = [
    { name: "전체상품", code: "ALL" },
    { name: "신상" },
    { name: "BEST" },
    { name: "다이어리", code: "PC01" },
    { name: "스티커", code: "PC02" },
    { name: "메모지", code: "PC03" },
    { name: "마스킹 테이프", code: "PC04" },
    { name: "키링", code: "PC05" }
  ];

  const [activeItem, setActiveItem] = useState("전체상품");

  const handleCategoryClick = (item) => {
    if (!item.code) return;
    
    setActiveItem(item.name);
    if (item.code === "ALL") {
      navigate("/list?page=1");
    } else {
      navigate(`/list?category=${item.code}&page=1`);
    }
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-x-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex justify-start items-center h-16 md:h-14">
          <div className="flex gap-12 md:gap-8 sm:gap-2 whitespace-nowrap">
            {menuItems.map(item => (
              <button
                key={item.name}
                className={`relative px-3 py-2 md:py-1.5 text-sm md:text-[15px] sm:text-xs font-medium
                          transition-colors duration-200 border-0 bg-transparent cursor-pointer shrink-0
                          ${
                            activeItem === item.name
                              ? 'text-yellow-300 after:content-[""] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-0.5 after:bg-yellow-300'
                              : "hover:text-yellow-300"
                          }`}
                onClick={() => handleCategoryClick(item)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Category;