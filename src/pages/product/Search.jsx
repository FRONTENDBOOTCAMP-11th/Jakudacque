import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@components/Spinner";
import useQueryStr from "@hooks/useQueryStr";
import Pagination from "@components/Pagenation";
import ProductList from "@components/ProductList";

export default function Search() {
  const navigate = useNavigate();
  const axios = useAxiosInstance();
  const location = useLocation();
  const queryStr = useQueryStr();
  const [sortOption, setSortOption] = useState("등록순");
  const [isOpen, setIsOpen] = useState(false);

  const [inputKeyword, setInputKeyword] = useState(
    queryStr.get("keyword") || "" // URL 쿼리 사용
  );
  const [searchedKeyword, setSearchedKeyword] = useState(
    queryStr.get("keyword") || "",
  );

  useEffect(() => {
    const urlKeyword = queryStr.get("keyword") || "";
    setInputKeyword(urlKeyword);
    setSearchedKeyword(urlKeyword);
  }, [location.search]); 

  const handleSearch = event => {
    event.preventDefault();
    if (!inputKeyword.trim()) return;
    navigate(`/search?keyword=${inputKeyword}`, { replace: true });
  };

  // 정렬 옵션 클릭 핸들러 추가
  const handleSortClick = option => {
    setSortOption(option);
    setIsOpen(false);
  };

  // 정렬 옵션 맵핑
  const SORT_MAP = {
    등록순: { key: "createdAt", order: -1 }, // -1은 내림차순
    인기순: { key: "buyQuantity", order: -1 },
    낮은가격순: { key: "price", order: 1 }, // 1은 오름차순
    높은가격순: { key: "price", order: -1 },
    이름순: { key: "name", order: 1 },
  };

  let page = Number(queryStr.get("page") || 1);

  const { data, isLoading } = useQuery({
    queryKey: ["searchResults", queryStr.get("keyword"), page, sortOption],
    queryFn: async () => {
      const response = await axios.get("/products", {
        params: {
          keyword: queryStr.get("keyword"),
          page,
          limit: 20,
          sort: JSON.stringify({
            [SORT_MAP[sortOption].key]: SORT_MAP[sortOption].order,
          }),
        },
      });

      if (!response.data.item?.length && page > 1) {
        navigate(`/search?keyword=${queryStr.get("keyword")}&page=1`);
        return null;
      }

      return response.data;
    },
  });

  if (isLoading) return <Spinner />;
  if (!data) return null;

  const products = data.item.map(item => ({
    id: String(item._id),
    name: item.name,
    price: item.price,
    image: "https://11.fesp.shop" + item.mainImages[0].path,
    link: `/product/${item._id}`,
  }));

  if (!products.length) {
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
          <p className="text-neutral-500 mb-8">다른 검색어를 입력해 보세요.</p>
          <div className="max-w-md mx-auto">
            <p className="font-medium mb-2">추천 검색어</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["다이어리", "스티커", "메모지", "키링"].map(term => (
                <button
                  key={term}
                  onClick={() => navigate(`/search?keyword=${term}`)}
                  className="px-4 py-2 bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors"
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

      <ProductList
        title={searchedKeyword}
        products={products}
        totalItems={data.pagination.total}
        isOpen={isOpen}
        sortOption={sortOption}
        onSortOptionClick={handleSortClick}
        onToggleOpen={() => setIsOpen(!isOpen)}
      />

      <div className="mt-8 flex justify-center">
        <Pagination
          maxPage={
            data?.pagination?.totalPages ||
            Math.ceil(data?.item?.length / 20) ||
            1
          }
          currentPage={page}
        />
      </div>
    </div>
  );
}
