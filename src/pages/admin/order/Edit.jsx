import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useState, useEffect, useMemo } from "react";
import useCodeStore from "@zustand/codeStore";
import { produce } from "immer";
import {
  TableTitle,
  StyledTable,
  StyledThead,
  StyledTh,
  StyledTd,
} from "@components/AdminTable";
import Button from "@components/Button";
import Spinner from "@components/Spinner";
import InputGroup from "@components/InputGroup";
import InputSelect from "@components/InputSelect";

export default function Edit() {
  const [order, setOrder] = useState(null);
  const [orderState, setOrderState] = useState({
    state: "OS035",
    memo: "레고 클래식 상품을 구매한 고객님께 서비스로 미니 레고 블럭을 드립니다.",
    delivery: {
      company: "CJ 대한통운",
      trackingNumber: "364746065376",
      url: "https://trace.cjlogistics.com/next/tracking.html?wblNo=364746065376",
    },
  });

  const axios = useAxiosInstance();
  const queryClient = useQueryClient();
  const { _id } = useParams();
  const navigate = useNavigate();

  // 카테고리 코드 데이터 가져오기
  const { codes } = useCodeStore();
  const orderStateOptions = useMemo(() => {
    if (!codes) return [];
    return Object.keys(codes.orderState).map(key => ({
      value: key,
      label: codes.orderState[key],
    }));
  }, [codes]);

  const products = useMemo(() => {
    if (!order || !order.products) return [];
    return order.products;
  }, [order]);

  // 상품 정보 가져오기
  const { data, isLoading } = useQuery({
    queryKey: ["orderItem"],
    // 로그인 기능 완성 후 /seller/products로 변경
    queryFn: () => axios.get(`/seller/orders/${_id}`),
    select: res => res.data,
    staleTime: 1000 * 10,
  });

  // 상품 정보가 로드되면 상품 정보를 상태에 반영
  useEffect(() => {
    if (data) {
      setOrder(data.item);
      setOrderState(prev => {
        return produce(prev, draft => {
          draft.state = data.item.state;
        });
      });
    }
  }, [data]);

  // 주문 정보 수정 시 상품 목록 캐시를 무효화
  useEffect(() => {
    return () => {
      queryClient.invalidateQueries("orderItem");
    };
  }, [_id]);

  // 주문 정보 저장
  const saveOrder = async () => {
    return;
    try {
      await axios.patch(`/seller/orders/${_id}`, order);
      queryClient.invalidateQueries("orderItem");
      navigate("/admin/order");
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen">
        <Spinner />
      </div>
    );
  }
  if (!data || !order) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <>
      <TableTitle>주문 관리</TableTitle>
      <div className="flex items-center justify-end gap-2">
        <Button color="warning" onClick={() => navigate(-1)}>
          목록
        </Button>
        <Button color="info" onClick={saveOrder}>
          저장
        </Button>
      </div>
      {/* table 형태로 상품들을 표시 */}
      <h3 className="mb-2 text-lg font-bold">상품 정보</h3>
      <div className="text-sm">
        <div>
          주문 일시 : <span className="font-bold ">{order.createdAt}</span>
        </div>
        <div>
          주문총액 :{" "}
          <span className="font-bold">
            {order.cost?.total?.toLocaleString() || 0}원
          </span>
        </div>
      </div>
      <>
        <StyledTable className="mt-2">
          <StyledThead>
            <tr>
              <StyledTh>주문상품</StyledTh>
              <StyledTh>가격</StyledTh>
              <StyledTh>수량</StyledTh>
              <StyledTh>결제액</StyledTh>
              <StyledTh>상태</StyledTh>
            </tr>
          </StyledThead>
          <tbody>
            {products.map(item => (
              <tr key={item._id}>
                <StyledTd>
                  <div className="flex items-center gap-2">
                    <img
                      src={"https://11.fesp.shop" + item.image.path}
                      alt={item.image.name}
                      className="w-12 h-12 rounded"
                    />
                    {item.name}
                  </div>
                </StyledTd>
                <StyledTd>{item.price.toLocaleString()}</StyledTd>
                <StyledTd>{item.quantity.toLocaleString()}</StyledTd>
                <StyledTd>
                  {(item.price * item.quantity).toLocaleString()}
                </StyledTd>
                <StyledTd>{codes && codes.orderState[item.state]}</StyledTd>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </>

      {/* 주문 상태 수정*/}
      <>
        <h3 className="mb-2 text-lg font-bold">주문 상태</h3>
        <div className="grid grid-cols-12 gap-4 my-4">
          {/* left */}
          <div className="col-span-6">
            {/* 주문 상태 */}
            {codes?.orderState && (
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
            )}

            {/* 메모 */}
            <label className="mb-1 text-sm" htmlFor="memo">
              메모
            </label>
            <textarea
              id="memo"
              rows="6"
              className="block p-2.5 w-full text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="메모를 입력하세요."
              value={orderState.memo}
              onChange={e => {
                setOrderState(prev => {
                  return produce(prev, draft => {
                    draft.memo = e.target.value;
                  });
                });
              }}
            ></textarea>
          </div>
          {/* right */}
          <div className="col-span-6 col-start-7">
            <InputGroup label="배송사" value={orderState?.delivery?.company} />
            <InputGroup
              label="송장번호"
              value={orderState?.delivery?.trackingNumber}
            />
          </div>
        </div>
      </>

      {/* 주문자/배송자 정보 */}
      <>
        <h3 className="mb-2 text-lg font-bold">주문자/배송지 정보</h3>
        <div className="grid grid-cols-12 gap-4 my-4">
          {/* left */}
          <div className="col-span-6">
            <InputGroup label="주문자명" value={order?.user?.name} disabled />
            <InputGroup label="이메일" value={order?.user?.email} disabled />
            <InputGroup label="주소" value={order?.address?.value} disabled />
          </div>
          {/* right */}
          {order.delivery && (
            <div className="col-span-6 col-start-7">
              <InputGroup
                label="배송사"
                value={order?.delivery?.company}
                disabled
              />
              <InputGroup
                label="송장번호"
                value={order?.delivery?.trackingNumber}
                disabled
              />
            </div>
          )}
        </div>
      </>
    </>
  );
}
