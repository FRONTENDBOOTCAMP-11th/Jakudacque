import { useState } from "react";

const Category = () => {
  const [activeItem, setActiveItem] = useState(null);

  const menuItems = [
    "전체상품",
    "신상",
    "BEST",
    "다이어리",
    "스티커",
    "메모지",
    "마스킹 테이프",
    "키링",
    "고객센터",
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-200 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-x-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex justify-start items-center h-16 md:h-14">
          <div className="flex gap-12 md:gap-8 sm:gap-2 whitespace-nowrap">
            {menuItems.map(item => (
              <button
                key={item}
                className={`relative px-3 py-2 md:py-1.5 text-sm md:text-[15px] sm:text-xs font-medium 
                                transition-colors duration-200 border-0 bg-transparent cursor-pointer shrink-0
                                ${
                                  activeItem === item
                                    ? 'text-yellow-300 after:content-[""] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-0.5 after:bg-yellow-300'
                                    : "hover:text-yellow-300"
                                }`}
                onClick={() => setActiveItem(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Category;
