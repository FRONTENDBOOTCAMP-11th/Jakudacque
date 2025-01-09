import {
  TableTitle,
  StyledTable,
  StyledThead,
  StyledTh,
  StyledTd,
} from "@components/AdminTable";
import InputSelect from "@components/InputSelect";
import AdminSearchBar from "@components/AdminSearchBar";
import Pagination from "@components/Pagenation.jsx";
import Spinner from "@components/Spinner";
import { useState } from "react";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import useQueryStr from "@hooks/useQueryStr";

export default function List() {
  const [searchParams, setSearchParams] = useState("name");
  const searchParamsOptions = [
    { value: "name", label: "이름" },
    { value: "email", label: "이메일" },
    { value: "phone", label: "전화번호" },
  ];

  let page = useQueryStr().get("page") || 1;
  let keyword = useQueryStr().get("keyword") || "";

  const axios = useAxiosInstance();

  const { data, isLoading } = useQuery({
    queryKey: ["userList", page, keyword],
    // 로그인 기능 완성 후 /seller/products로 변경
    queryFn: () =>
      axios.get("/users", {
        params: { page, limit: 15, [searchParams]: keyword },
      }),
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

      <div className="flex flex-col mt-4">
        <div className="w-1/5">
          <InputSelect
            id="category"
            value={searchParams}
            options={searchParamsOptions}
            onChange={e => {
              setSearchParams(e.target.value);
            }}
          />
        </div>
        <AdminSearchBar />
      </div>

      <>
        <StyledTable>
          <StyledThead>
            <tr>
              <StyledTh>이름</StyledTh>
              <StyledTh>연락처</StyledTh>
              <StyledTh>주소</StyledTh>
              <StyledTh>가입일</StyledTh>
            </tr>
          </StyledThead>
          <tbody>
            {data.item.map(user => (
              <tr key={user._id}>
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
