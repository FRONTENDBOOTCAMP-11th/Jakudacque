import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoChevronBackOutline, IoSearch } from "react-icons/io5";
import Product from "../../components/Product";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@components/Spinner";
import useQueryStr from "@hooks/useQueryStr";
import Pagination from "@components/Pagenation";

export default function Search() {
  const navigate = useNavigate();
  const axios = useAxiosInstance();
  const location = useLocation();
  const queryStr = useQueryStr();

  const [keyword, setKeyword] = useState(queryStr.get("keyword") || "");

  // URL이 변경될 때마다 keyword 업데이트
  useEffect(() => {
    const searchKeyword = queryStr.get("keyword") || "";
    setKeyword(searchKeyword);
  }, [location.search]);

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  // 검색 실행 함수
  const handleSearch = (event) => {
    event.preventDefault();
    if (!keyword.trim()) return;
    navigate(`/search?keyword=${keyword}`, { replace: true });
  };
  
  // URL에서 page 파라미터 가져오기
  let page = queryStr.get("page") || 1;
  page = Number(page);

  // 검색 결과 데이터 가져오기
  const { data, isLoading } = useQuery({
    queryKey: ["searchResults", queryStr.get("keyword"), page], // location.search 대신 실제 검색어와 페이지를 사용
    queryFn: async () => {
      try {
        const currentKeyword = queryStr.get("keyword"); // URL에서 직접 키워드 가져오기
        const response = await axios.get("/products", {
          params: {
            keyword: currentKeyword,
            page,
            limit: 20,
          },
        });
        
        if (!response.data.item?.length && page > 1) {
          navigate(`/search?keyword=${currentKeyword}&page=1`);
          return null;
        }
        
        return response;
      } catch (error) {
        console.error("Error fetching search results:", error);
        throw error;
      }
    },
    select: res => res.data,
    staleTime: 1000 * 10,
  });

  if (isLoading) return <Spinner />;
  if (!data) return null;

  const products = data.item.map(item => ({
    id: item._id,
    name: item.name,
    price: item.price,
    image: "https://11.fesp.shop" + item.mainImages[0].path,
    link: `/product/${item._id}`,
  }));

  // 검색 결과가 없는 경우의 UI
  if (!data?.item?.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm">
              <input
                type="text"
                placeholder="찾으시는 상품을 검색해보세요"
                className="flex-1 px-4 py-2 text-base focus:outline-none"
                value={keyword}
                onChange={handleInputChange}
                onKeyDown={e => e.key === "Enter" && handleSearch(e)}
              />
              <button 
                onClick={handleSearch}
                className="px-6 py-2 text-white bg-secondary-base rounded-full hover:bg-secondary-dark transition-colors"
              >
                <IoSearch className="text-xl" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="text-center py-20">
          <p className="text-lg font-medium mb-2">검색 결과가 없습니다.</p>
          <p className="text-gray-500 mb-8">다른 검색어를 입력해 보세요.</p>
          
          <div className="max-w-md mx-auto">
            <p className="font-medium mb-2">추천 검색어</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["다이어리", "스티커", "메모지", "키링"].map(term => (
                <button
                  key={term}
                  onClick={() => {
                    setKeyword(term);
                    navigate(`/search?keyword=${term}`, { replace: true });
                  }}
                  className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm">
            <input
              type="text"
              placeholder="찾으시는 상품을 검색해보세요"
              className="flex-1 px-4 py-2 text-base focus:outline-none"
              value={keyword}
              onChange={handleInputChange}
              onKeyDown={e => e.key === "Enter" && handleSearch(e)}
            />
            <button 
              onClick={handleSearch}
              className="px-6 py-2 text-white bg-secondary-base rounded-full hover:bg-secondary-dark transition-colors"
            >
              <IoSearch className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <IoChevronBackOutline className="text-xl" />
          다이어리
        </button>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="text-sm font-medium">
          1000 ITEMS
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8 mb-8">
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>

      {data.pagination && (
        <div className="mt-8">
          <Pagination
            maxPage={Math.max(1, Math.ceil(data.pagination.totalCount / 20))}
            currentPage={page}
          />
        </div>
      )}
    </div>
  );
}