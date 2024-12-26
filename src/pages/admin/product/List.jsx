import tw from "tailwind-styled-components";
import PageNation from "@components/Pagenation.jsx";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

function useQueryStr() {
  return new URLSearchParams(useLocation().search);
}

export default function List() {
  let page = useQueryStr().get("page") || 1;
  const axios = useAxiosInstance();

  const { data } = useQuery({
    queryKey: ["productList", page],
    queryFn: () => axios.get("/products", { params: { page } }),
    select: res => res.data,
    staleTime: 1000 * 10,
  });

  console.log(data);

  if (!data) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      <main className="p-10 min-w-80">
        <h1>상품 리스트</h1>
        <div className="flex justify-between">
          <div>Search Bar</div>
          <button>Create</button>
        </div>
        <div>
          <StyledTable>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <StyledTh>상품명</StyledTh>
                <StyledTh>상품 이미지</StyledTh>
                <StyledTh>가격</StyledTh>
                <StyledTh>재고</StyledTh>
                <StyledTh>카테고리</StyledTh>
                <StyledTh></StyledTh>
              </tr>
            </thead>
            <tbody>
              {data.item.map(item => (
                <tr key={item._id}>
                  <StyledTd>{item.name}</StyledTd>
                  <StyledTd>
                    <img
                      src={"https://11.fesp.shop" + item.mainImages[0].path}
                      alt={item.mainImages[0].name}
                      className="w-16 h-16"
                    />
                  </StyledTd>
                  <StyledTd>{item.price}</StyledTd>
                  <StyledTd>{item.quantity}</StyledTd>
                  <StyledTd>
                    {item.extra.category && item.extra.category.join(" / ")}
                  </StyledTd>
                  <StyledTd>
                    <button>수정</button>
                    <button>삭제</button>
                  </StyledTd>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </div>

        <PageNation
          maxPage={data?.pagination.totalPages}
          currentPage={Number(page)}
        />
      </main>
    </>
  );
}

const StyledTable = tw.table`
  w-full
  table-auto
`;
const StyledTh = tw.th`
  p-4
  text-xs text-start
  border-b  
`;
const StyledTd = tw.td`
  p-2
  text-xs text-start
  border-b  
`;
