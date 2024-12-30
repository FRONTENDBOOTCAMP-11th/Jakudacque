import tw from "tailwind-styled-components";
import {
  TableTitle,
  StyledTable,
  StyledThead,
  StyledTh,
  StyledTd,
} from "@components/AdminTable";
import AdminSearchBar from "@components/AdminSearchBar";
import Pagination from "@components/Pagenation.jsx";
import Spinner from "@components/Spinner";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import useQueryStr from "@hooks/useQueryStr";
import { Link, useLocation } from "react-router-dom";
import { IoOpenOutline } from "react-icons/io5";

export default function List() {
  const location = useLocation();
  let page = useQueryStr().get("page") || 1;
  let keyword = useQueryStr().get("keyword") || "";

  const axios = useAxiosInstance();
  // const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["orderList", page, keyword],
    // 로그인 기능 완성 후 /seller/orders 로 변경
    queryFn: () =>
      axios.get("/seller/orders", { params: { page, keyword, limit: 15 } }),
    select: res => res.data,
    staleTime: 1000 * 10,
  });

  // const handleDelete = id => {
  //   const result = confirm("정말 삭제하시겠습니까?");
  //   if (result) {
  //     console.log("삭제", id);

  //     axios.delete(`/seller/products/${id}`).then(() => {
  //       queryClient.invalidateQueries("productList");
  //     });
  //   }
  // };

  console.log(data);

  if (!data) {
    return (
      <div className="w-full h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <TableTitle>주문 관리</TableTitle>

      <>
        <StyledTable>
          <StyledThead>
            <tr>
              <StyledTh>주문일시</StyledTh>
              <StyledTh>주문상품</StyledTh>
              <StyledTh>상품금액</StyledTh>
              <StyledTh>배송비</StyledTh>
              <StyledTh>총 금액</StyledTh>
              <StyledTh>상태</StyledTh>
              <StyledTh className="w-16"></StyledTh>
            </tr>
          </StyledThead>
          <tbody>
            {data.item.map(item => (
              <tr key={item._id}>
                <StyledTd>{item.createdAt}</StyledTd>
                <StyledTd>
                  <div className="flex items-center gap-2">
                    <img
                      src={"https://11.fesp.shop" + item.products[0].image.path}
                      alt={item.products[0].name}
                      className="w-12 h-12 rounded"
                    />
                    {item.products[0].name}
                    {item.products.length > 1 && (
                      <span> 외 {item.products.length - 1}건</span>
                    )}
                  </div>
                </StyledTd>
                <StyledTd>{item.cost.products.toLocaleString()}</StyledTd>
                <StyledTd>{item.cost.shippingFees.toLocaleString()}</StyledTd>
                <StyledTd>{item.cost.total.toLocaleString()}</StyledTd>
                <StyledTd>{item.state}</StyledTd>
                <StyledTd>
                  <Link to={`${location.pathname}/edit/${item._id}`}>
                    <IoOpenOutline size={24} className=" hover:text-info" />
                  </Link>
                </StyledTd>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </>
      <Pagination
        maxPage={data?.pagination?.totalPages}
        currentPage={Number(page)}
      />
    </>
  );
}
