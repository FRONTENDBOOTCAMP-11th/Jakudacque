import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@components/Spinner";
import useQueryStr from "@hooks/useQueryStr";
import Pagination from "@components/Pagenation";
import CartModal from "@components/CartModal";
import ProductList from "@components/ProductList";

export default function List() {
  const [isOpen, setIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState("등록순"); // 정렬 상태
  const navigate = useNavigate();
  const axios = useAxiosInstance();
  const queryStr = useQueryStr(); // URL의 query string을 가져오는 custom hook
  const category = queryStr.get("category") || "ALL"; // URL에서 category 파라미터 추출
  const page = Number(queryStr.get("page") || 1); // URL에서 page 파라미터 추출

  // 카테고리 정보 가져오기
  const CATEGORY_MAP = {
    ALL: "전체상품",
    NEW: "신상",
    BEST: "BEST",
    PC01: "다이어리",
    PC02: "스티커",
    PC03: "메모지",
    PC04: "마스킹 테이프",
    PC05: "키링",
  };

  // 정렬 옵션 맵핑
  const SORT_MAP = {
    등록순: { key: "createdAt", order: -1 }, // -1은 내림차순
    인기순: { key: "buyQuantity", order: -1 },
    낮은가격순: { key: "price", order: 1 }, // 1은 오름차순
    높은가격순: { key: "price", order: -1 },
    이름순: { key: "name", order: 1 },
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
          [SORT_MAP[sortOption].key]: SORT_MAP[sortOption].order,
        }),
      };

      // 카테고리별 필터링 조건 설정
      if (category === "NEW") {
        params.custom = JSON.stringify({
          "extra.isNew": true,
          show: true,
        });
      } else if (category === "BEST") {
        params.custom = JSON.stringify({
          "extra.isBest": true,
          show: true,
        });
      } else if (category !== "ALL") {
        params.custom = JSON.stringify({
          "extra.category": category,
          show: true,
        });
      } else {
        params.custom = JSON.stringify({
          show: true,
        });
      }

      const response = await axios.get("/products", { params });
      return response.data;
    },
  });

  if (isLoading) return <Spinner />;
  if (!data?.item?.length) {
    navigate(`/list?category=${category}&page=1`);
    return null;
  }

  // 정렬 옵션 클릭 핸들러
  const handleSortClick = option => {
    setSortOption(option); // 선택된 정렬 옵션 업데이트
    setIsOpen(false);
  };

  const products = data.item.map(item => ({
    id: String(item._id),
    name: item.name,
    price: item.price,
    image: item.mainImages?.[0]?.path
      ? "https://11.fesp.shop" + item.mainImages[0].path
      : "",
    link: `/product/${item._id}`,
  }));

  return (
    <div className="w-full px-4 py-8 mx-auto max-w-7xl">
      <ProductList
        title={currentCategory}
        products={products}
        totalItems={data.pagination.total}
        isOpen={isOpen}
        sortOption={sortOption}
        onSortOptionClick={handleSortClick}
        onToggleOpen={() => setIsOpen(!isOpen)}
      />

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-8">
        <Pagination
          maxPage={data.pagination.totalPages || Math.ceil(data.pagination.totalCount / 20)}
          currentPage={page}
        />
      </div>
      <CartModal />
    </div>
  );
}