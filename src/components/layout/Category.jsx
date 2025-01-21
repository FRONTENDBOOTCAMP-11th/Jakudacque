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
    currentCategory === "ALL" ? "전체상품" : currentCategory,
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
        
        // 데이터 형식 변환
        const formattedCodes = {};
        fetchedCodes.forEach(item => {
          formattedCodes[item.code] = item.value;
        });

        // Zustand에 저장
        setCodes({ productCategory: formattedCodes });
      } catch (error) {
        console.error("카테고리 데이터를 불러오는 중 오류 발생:", error);
    }
  };

  // Zustand의 codes가 없을 때만 호출
  if (!codes) {
      fetchCodes();
    }
  }, [axios, setCodes, codes]);

  // location 변화를 감지하여 activeItem 업데이트
  useEffect(() => {
    // 홈페이지인 경우
    if (location.pathname === "/") {
      setActiveItem("");
      return;
    }
  
    // 카테고리 페이지인 경우
    if (currentCategory === "ALL") {
      setActiveItem("전체상품");
    } else if (currentCategory === "NEW") {
      setActiveItem("신상");
    } else if (currentCategory === "BEST") {
      setActiveItem("BEST");
    } else {
      // 일반 카테고리의 경우
      const categoryValue = codes?.productCategory?.[currentCategory];
      if (categoryValue) {
        setActiveItem(categoryValue);
      }
    }
  }, [location, currentCategory, codes]);

  // 전체 메뉴 아이템 준비
  const menuItems = [
    ...defaultItems,
    ...(codes?.productCategory 
      ? Object.entries(codes.productCategory).map(([code, value]) => ({
          name: value,
          code: code,
        }))
      : []),
  ];

  const handleCategoryClick = item => {
    if (!item?.code) return;

    setActiveItem(item.name);
    const newPath =
      item.code === "ALL"
        ? "/list?page=1"
        : `/list?category=${item.code}&page=1`;

    navigate(newPath);
  };

  return (
    <nav className="w-full overflow-x-auto bg-white border-b border-neutral-200">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-start h-16">
          <div className="flex gap-12 whitespace-nowrap">
            {menuItems.map(item => (
              <button
                key={item.name}
                className={`relative px-3 py-2 text-sm font-medium
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
