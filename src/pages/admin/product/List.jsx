import {
  TableTitle,
  StyledTable,
  StyledThead,
  StyledTh,
  StyledTd,
} from "@components/AdminTable";
import AdminSearchBar from "@components/\bAdminSearchBar";
import Pagination from "@components/Pagenation.jsx";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useQueryStr from "@hooks/useQueryStr";
import Spinner from "@components/Spinner";
import { IoTrashOutline } from "react-icons/io5";
import { IoOpenOutline } from "react-icons/io5";

export default function List() {
  let page = useQueryStr().get("page") || 1;
  let keyword = useQueryStr().get("keyword") || "";

  const axios = useAxiosInstance();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["productList", page, keyword],
    // 로그인 기능 완성 후 /seller/products로 변경
    queryFn: () => axios.get("/products", { params: { page, keyword } }),
    select: res => res.data,
    staleTime: 1000 * 10,
  });

  const handleDelete = id => {
    const result = confirm("정말 삭제하시겠습니까?");
    if (result) {
      console.log("삭제", id);

      axios.delete(`/seller/products/${id}`).then(() => {
        queryClient.invalidateQueries("productList");
      });
    }
  };

  console.log(data);

  if (!data) {
    return <Spinner />;
  }

  return (
    <>
      <main className="p-10 min-w-80">
        <TableTitle>상품 리스트</TableTitle>

        <AdminSearchBar>
          <button>상품 등록</button>
        </AdminSearchBar>

        <>
          <StyledTable>
            <StyledThead>
              <tr>
                <StyledTh>상품명</StyledTh>
                <StyledTh>상품 이미지</StyledTh>
                <StyledTh>가격</StyledTh>
                <StyledTh>재고</StyledTh>
                <StyledTh>카테고리</StyledTh>
                <StyledTh className="w-16"></StyledTh>
              </tr>
            </StyledThead>
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
                    <div className="flex justify-end gap-2">
                      <button>
                        <IoOpenOutline size={24} className="" />
                      </button>
                      <button onClick={() => handleDelete(item._id)}>
                        <IoTrashOutline size={24} className="text-error" />
                      </button>
                    </div>
                  </StyledTd>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </>
        <Pagination
          // maxPage={data?.pagination.totalPages}
          maxPage={10}
          currentPage={Number(page)}
        />
      </main>
    </>
  );
}
