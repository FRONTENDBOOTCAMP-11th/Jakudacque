import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCaretDown, IoSearch } from "react-icons/io5";
import Product from "../../components/Product";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@components/Spinner";
import useQueryStr from "@hooks/useQueryStr";
import Pagination from "@components/Pagenation";
import useSearchStore from "@zustand/searchStore";

export default function Search() {
  const navigate = useNavigate();
  const axios = useAxiosInstance();
  const location = useLocation();
  const queryStr = useQueryStr();

  const [isOpen, setIsOpen] = useState(false);

  // 현재 입력 중인 키워드와 실제 검색된 키워드를 분리
  const { setKeyword } = useSearchStore();
  const [inputKeyword, setInputKeyword] = useState(
    queryStr.get("keyword") || "",
  );
  const [searchedKeyword, setSearchedKeyword] = useState(
    queryStr.get("keyword") || "",
  );

  // URL이 변경될 때마다 inputKeyword와 searchedKeyword 모두 업데이트
  useEffect(() => {
    const urlKeyword = queryStr.get("keyword") || "";
    setKeyword(urlKeyword);
    setInputKeyword(urlKeyword);
    setSearchedKeyword(urlKeyword);
  }, [location.search, setKeyword]);

  const handleInputChange = e => {
    setInputKeyword(e.target.value);
  };

  // 검색 실행 함수
  const handleSearch = event => {
    event.preventDefault();
    if (!inputKeyword.trim()) return;
    setKeyword(inputKeyword);
    navigate(`/search?keyword=${inputKeyword}`, { replace: true });
    navigate(0); // 페이지 리로드를 항상 실행
  };

  // URL에서 page 파라미터 가져오기
  let page = queryStr.get("page") || 1;
  page = Number(page);

  // 검색 결과 데이터 가져오기
  const { data, isLoading } = useQuery({
    queryKey: ["searchResults", queryStr.get("keyword"), page],
    queryFn: async () => {
      const response = await axios.get("/products", {
        params: {
          keyword: queryStr.get("keyword"),
          page,
          limit: 20,
        },
      });

      // 데이터가 없고 1페이지보다 큰 경우 첫 페이지로 이동
      if (!response.data.item?.length && page > 1) {
        navigate(`/search?keyword=${queryStr.get("keyword")}&page=1`);
        return null;
      }

      return response.data;
    },
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
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm">
              <input
                type="text"
                placeholder="찾으시는 상품을 검색해보세요"
                className="flex-1 px-4 py-2 text-base focus:outline-none"
                value={inputKeyword}
                onChange={e => setInputKeyword(e.target.value)}
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
      {/* 검색바 */}
      <div className="mb-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm">
            <input
              type="text"
              placeholder="찾으시는 상품을 검색해보세요"
              className="flex-1 px-4 py-2 text-base focus:outline-none"
              value={inputKeyword}
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

      {/* 페이지 정보 (검색어 표시) */}
      <div className="mb-8">{searchedKeyword && `${searchedKeyword}`}</div>

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

      {/* 상품리스트 - 반응형 그리드 */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8">
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="mt-8 flex justify-center">
        <Pagination
          maxPage={
            data?.pagination?.totalPages ||
            Math.ceil(data?.item?.length / 20) ||
            1
          }
          currentPage={Number(page)}
        />
      </div>
    </div>
  );
}
