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

  let page = useQueryStr().get("page") || 1;
  page = Number(page);

   // API로 상품 데이터 가져오기 - 페이지네이션 추가
   const { data, isLoading } = useQuery({
    queryKey: ["productList", page],
    queryFn: async () => {
      try {
        const response = await axios.get("/products", {
          params: {
            page,
            limit: 20,
            category: ["PC01"],
          },
        });
        
        // 데이터가 없고, 페이지가 1보다 크면 첫 페이지로 이동
        if (!response.data.item?.length && page > 1) {
          navigate('/list?page=1');
          return null;
        }
        
        return response;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    },
    select: res => res.data,
    staleTime: 1000 * 10,
  });

  if (isLoading) return <Spinner />;
  if (!data) return null;
  

  // API 데이터를 Product 컴포넌트에 맞는 형식으로 변환
  const products = data.item.map(item => ({
    id: item._id,
    name: item.name,
    price: item.price,
    image: "https://11.fesp.shop" + item.mainImages[0].path,
    link: `/product/${item._id}`,
  }));

  // 상품이 없을 경우 처리
  if (!data?.item?.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <IoChevronBackOutline className="text-xl" />
            다이어리
          </button>
        </div>
        <div className="text-center py-20">상품이 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* 뒤로가기 */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <IoChevronBackOutline className="text-xl" />
          다이어리
        </button>
      </div>

      {/* 상품 카운트, 정렬 */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-sm font-medium">{data.pagination.totalCount} ITEMS</div>
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
      {/* 상품리스트 - 4*5 */}
      <div className="grid grid-cols-4 gap-8 mb-8">
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-8">
        <Pagination
          maxPage={data.pagination.totalPages || Math.ceil(data.pagination.totalCount / 20)}
          currentPage={Number(page)}
        />
      </div>
    </div>
  );
}