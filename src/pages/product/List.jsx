import { useState } from "react";
import { IoCaretDown } from "react-icons/io5";
import Product from "../../components/Product";
import { useNavigate } from "react-router-dom";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@components/Spinner";
import useQueryStr from "@hooks/useQueryStr";
import Pagination from "@components/Pagenation";

export default function List() {
  const [isOpen, setIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState("등록순");  // 정렬 상태
  const navigate = useNavigate();
  const axios = useAxiosInstance();
  const queryStr = useQueryStr();  // URL의 query string을 가져오는 custom hook
  const category = queryStr.get("category") || "ALL";  // URL에서 category 파라미터 추출
  const page = Number(queryStr.get("page") || 1);  // URL에서 page 파라미터 추출
  
  // 카테고리 정보 가져오기
  const CATEGORY_MAP = {
    ALL: "전체상품",
    PC01: "다이어리",
    PC02: "스티커",
    PC03: "메모지",
    PC04: "마스킹 테이프",
    PC05: "키링"
  };

  // 정렬 옵션 맵핑
  const SORT_MAP = {
    "등록순": { key: "createdAt", order: -1 }, // -1은 내림차순
    "인기순": { key: "buyQuantity", order: -1 },
    "낮은가격순": { key: "price", order: 1 }, // 1은 오름차순 
    "높은가격순": { key: "price", order: -1 },
    "이름순": { key: "name", order: 1 }
  };

  // 현재 카테고리명 찾기
  const currentCategory = CATEGORY_MAP[category] || "전체상품";

 // 상품 데이터 가져오기
 const { data, isLoading } = useQuery({
  queryKey: ["productList", category, page, sortOption],
  queryFn: async () => {
    const params = {
      page,
      limit: 20,
      sort: JSON.stringify({
        [SORT_MAP[sortOption].key]: SORT_MAP[sortOption].order
      })
    };

    // custom 파라미터를 사용하여 카테고리 필터링
    if (category !== "ALL") {
      params.custom = JSON.stringify({
        "extra.category": category
      });
    }

    const response = await axios.get("/products", { params });
    return response.data;
  }
});

  if (isLoading) return <Spinner />;
  if (!data?.item?.length) {
    navigate(`/list?category=${category}&page=1`);
    return null;
  }

  // 정렬 옵션 클릭 핸들러
  const handleSortClick = (option) => {
    setSortOption(option); // 선택된 정렬 옵션 업데이트
    setIsOpen(false);
  };

  const products = data?.item?.map(item => ({
    id: item._id,
    name: item.name,
    price: item.price,
    image: item.mainImages?.[0]?.path ? "https://11.fesp.shop" + item.mainImages[0].path : "",
    link: `/product/${item._id}`,
  })) || [];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        {/* 현재 페이지 정보 (카테고리명) */}
        {currentCategory} 
      </div>

      {/* 상품 카운트, 정렬 */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-sm font-medium">
          {data?.pagination?.total || "0"} ITEMS
        </div>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 border border-gray-200 rounded-full text-sm hover:border-gray-400 flex items-center gap-2"
          >
            {sortOption} <IoCaretDown />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <ul className="py-1">
                {Object.keys(SORT_MAP).map(option => (
                  <li
                    key={option}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm ${
                      sortOption === option ? 'text-yellow-300' : ''
                    }`}
                    onClick={() => handleSortClick(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* 상품리스트 */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8">
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="mt-8 flex justify-center">
        <Pagination
          maxPage={data.pagination.totalPages || Math.ceil(data.pagination.totalCount / 20)}
          currentPage={Number(page)}
        />
      </div>
    </div>
  );
}