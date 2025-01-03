// List.jsx
import { useState } from "react";
import { IoCaretDown, IoChevronBackOutline } from "react-icons/io5";
import Product from "../../components/Product";
import { useNavigate } from "react-router-dom";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@components/Spinner";
import useQueryStr from "@hooks/useQueryStr";
import Pagination from "@components/Pagenation";

export default function List() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const axios = useAxiosInstance();
  const queryStr = useQueryStr();

  // URL에서 카테고리 코드 가져오기
  const category = queryStr.get("category") || "PC01";
  let page = queryStr.get("page") || 1;
  page = Number(page);

  // 카테고리 정보 가져오기
  const { data: categoryList } = useQuery({
    queryKey: ["codes", "productCategory"],
    queryFn: () => axios.get("/codes/productCategory"),
    staleTime: 1000 * 60 * 5,
  });

  // 현재 카테고리명 찾기
  const currentCategory = categoryList?.data?.codes?.find(
    cat => cat.code === category
  )?.value || "전체상품";

  // 상품 데이터 가져오기
  const { data, isLoading } = useQuery({
    queryKey: ["productList", category, page],
    queryFn: async () => {
      const response = await axios.get("/products", {
        params: {
          category: [category],
          page,
          limit: 20,
        },
      });
      return response.data;
    },
  });
  
  
  if (isLoading) return <Spinner />;
  if (!data?.item?.length) {
    navigate(`/list?category=${category}&page=1`);
    return null;
  }

  const products = data.item.map(item => ({
    id: item._id,
    name: item.name,
    price: item.price,
    image: "https://11.fesp.shop" + item.mainImages[0].path,
    link: `/product/${item._id}`,
  }));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <IoChevronBackOutline className="text-xl" />
          {currentCategory} {/* 카테고리명 */}
        </button>
      </div>

      {/* 상품 카운트, 정렬 */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-sm font-medium">
          {data?.item?.length ? `${data.item.length} ITEMS` : "0 ITEMS"}
        </div>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 border border-gray-200 rounded-full text-sm hover:border-gray-400 flex items-center gap-2"
          >
            정렬방식 <IoCaretDown />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <ul className="py-1">
                {["등록순", "인기순", "낮은가격순", "높은가격순", "이름순"].map(
                  option => (
                    <li
                      key={option}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      {option}
                    </li>
                  ),
                )}
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
          maxPage={data?.pagination?.totalPages || Math.ceil(data?.item?.length / 20) || 1}
          currentPage={Number(page)}
        />
      </div>
    </div>
  );
}