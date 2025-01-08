// import tw from "tailwind-styled-components";
import {
  TableTitle,
  StyledTable,
  StyledThead,
  StyledTh,
  StyledTd,
} from "@components/AdminTable";
import InputSelect from "@components/InputSelect";
import PeriodCalendar from "@components/PeriodCalendar/CalendarContainer";
// import AdminSearchBar from "@components/AdminSearchBar";
import Pagination from "@components/Pagenation.jsx";
import Spinner from "@components/Spinner";
import { produce } from "immer";
import useCodeStore from "@zustand/codeStore";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useQueryStr from "@hooks/useQueryStr";
import { Link, useLocation } from "react-router-dom";
import { IoCalendarClearOutline } from "react-icons/io5";
import { IoOpenOutline } from "react-icons/io5";

export default function List() {
  const [period, setPeriod] = useState({
    startDate: new Date().setMonth(new Date().getMonth() - 1),
    endDate: new Date(),
  });
  const [calendarOpen, setCalendarOpen] = useState(false);
  const startDate = useMemo(
    () => new Date(period.startDate).toISOString().slice(0, 10),
    [period.startDate],
  );
  const endDate = useMemo(
    () => new Date(period.endDate).toISOString().slice(0, 10),
    [period.endDate],
  );

  const [orderState, setOrderState] = useState({
    state: "",
  });

  // 카테고리 코드 데이터 가져오기

  const location = useLocation();
  let page = useQueryStr().get("page") || 1;

  const { codes } = useCodeStore();
  const orderStateOptions = useMemo(() => {
    if (!codes) return [];
    return Object.keys(codes.orderState).map(key => ({
      value: key,
      label: codes.orderState[key],
    }));
  }, [codes]);

  const axios = useAxiosInstance();
  // const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["orderList", page],
    // 로그인 기능 완성 후 /seller/orders 로 변경
    queryFn: () => axios.get("/seller/orders", { params: { page, limit: 15 } }),
    select: res => res.data,
    staleTime: 1000 * 10,
  });

  console.log(data);

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
      <TableTitle>주문 관리</TableTitle>
      {/* date-input */}
      <div className="flex gap-4 mt-4">
        <InputSelect
          id="category"
          label="주문 상태"
          value={orderState.state}
          options={orderStateOptions}
          onChange={e => {
            setOrderState(prev => {
              return produce(prev, draft => {
                draft.state = e.target.value;
              });
            });
          }}
        />

        <div className="relative">
          <span className="text-sm">기간</span>
          <button
            className="bg-gray-50 top- border flex items-center gap-4 border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
            onClick={() => setCalendarOpen(prev => !prev)}
          >
            <div>
              {startDate} ~ {endDate}
            </div>
            <IoCalendarClearOutline size={18} />
          </button>

          {calendarOpen && (
            <PeriodCalendar
              period={period}
              setPeriod={setPeriod}
              onClose={() => setCalendarOpen(false)}
            />
          )}
        </div>
      </div>

      <>
        <StyledTable>
          <StyledThead>
            <tr>
              <StyledTh>주문일시</StyledTh>
              <StyledTh>주문자</StyledTh>
              <StyledTh>주문상품</StyledTh>
              <StyledTh>상품금액 합계</StyledTh>
              <StyledTh>배송비</StyledTh>
              <StyledTh>총 금액</StyledTh>
              {/* <StyledTh>결제수단</StyledTh> */}
              <StyledTh>주소</StyledTh>
              <StyledTh>배송정보</StyledTh>
              <StyledTh>상태</StyledTh>
              <StyledTh className="w-16"></StyledTh>
            </tr>
          </StyledThead>
          <tbody>
            {data.item.map(item => (
              <tr key={item._id}>
                <StyledTd>{item.createdAt}</StyledTd>
                <StyledTd>
                  {item.user.name}
                  <br />
                  {item.user.email}
                </StyledTd>
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
                {/* <StyledTd>결제수단</StyledTd> */}
                <StyledTd>
                  {item.address.name} <br />
                  {item.address.value}
                </StyledTd>
                <StyledTd>
                  {item.delivery ? (
                    <>
                      {item.delivery.company} <br />
                      {item.delivery.trackingNumber}
                    </>
                  ) : (
                    "배송 준비중"
                  )}
                </StyledTd>
                <StyledTd>{codes && codes.orderState[item.state]}</StyledTd>
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
