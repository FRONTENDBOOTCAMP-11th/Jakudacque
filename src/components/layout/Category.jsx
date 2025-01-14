import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useCodeStore from "../../zustand/codeStore";
import useAxiosInstance from "@/hooks/useAxiosInstance";

const Category = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { codes, setCodes } = useCodeStore(); // Zustand에서 codes 상태와 setter 가져오기
  const axios = useAxiosInstance();

  // URL에서 현재 카테고리 코드 추출
  const currentCategory =
    new URLSearchParams(location.search).get("category") || "ALL";

  // 초기 활성 아이템 설정
  const [activeItem, setActiveItem] = useState(
    currentCategory === "ALL" ? "전체상품" : currentCategory
  );

  // 기본 메뉴 아이템
  const defaultItems = [
    { name: "전체상품", code: "ALL" },
    { name: "신상", code: "NEW" },
    { name: "BEST", code: "BEST" },
  ];

  // 데이터 가져오기: 컴포넌트가 처음 렌더링될 때 호출
  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const response = await axios.get("/codes/productCategory"); // API 호출
        const fetchedCodes = response.data.item.productCategory.codes;

        // Zustand에 저장
        setCodes(fetchedCodes);
      } catch (error) {
        console.error("카테고리 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    // Zustand의 codes가 없을 때만 호출
    if (!codes) {
      fetchCodes();
    }
  }, [axios, setCodes, codes]);

  // 전체 메뉴 아이템 준비
  const menuItems = [
    ...defaultItems,
    ...(Array.isArray(codes)
      ? codes.map((category) => ({
          name: category.value,
          code: category.code,
        }))
      : []),
  ];

  const handleCategoryClick = (item) => {
    if (!item?.code) return;

    setActiveItem(item.name);
    const newPath =
      item.code === "ALL"
        ? "/list?page=1"
        : `/list?category=${item.code}&page=1`;

    navigate(newPath, { replace: true });
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 overflow-x-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex justify-start items-center h-16 md:h-14">
          <div className="flex gap-12 md:gap-8 sm:gap-2 whitespace-nowrap">
            {menuItems.map((item) => (
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