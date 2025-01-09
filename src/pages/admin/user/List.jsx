import {
  TableTitle,
  StyledTable,
  StyledThead,
  StyledTh,
  StyledTd,
} from "@components/AdminTable";

import Pagination from "@components/Pagenation.jsx";
import Spinner from "@components/Spinner";
import useCodeStore from "@zustand/codeStore";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import useQueryStr from "@hooks/useQueryStr";

export default function List() {
  let page = useQueryStr().get("page") || 1;

  const { codes } = useCodeStore();

  const axios = useAxiosInstance();

  const { data, isLoading } = useQuery({
    queryKey: ["userList", page],
    // 로그인 기능 완성 후 /seller/products로 변경
    queryFn: () => axios.get("/users", { params: { page, limit: 15 } }),
    select: res => res.data,
    staleTime: 1000 * 10,
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen">
        <Spinner />
      </div>
    );
  }
  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <>
      <TableTitle>회원 목록</TableTitle>

      <>
        <StyledTable>
          <StyledThead>
            <tr>
              <StyledTh>등급</StyledTh>
              <StyledTh>이름</StyledTh>
              <StyledTh>연락처</StyledTh>
              <StyledTh>주소</StyledTh>
              <StyledTh>가입일</StyledTh>
            </tr>
          </StyledThead>
          <tbody>
            {data.item.map(user => (
              <tr key={user._id}>
                <StyledTd>
                  {user.extra?.membershipClass
                    ? codes?.membershipClass[user.extra.membershipClass]
                    : ""}
                </StyledTd>
                <StyledTd>{user.name}</StyledTd>
                <StyledTd>
                  {user.phone} <br />
                  {user.email}
                </StyledTd>
                <StyledTd>{user.address}</StyledTd>
                <StyledTd>{user.createdAt}</StyledTd>
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
