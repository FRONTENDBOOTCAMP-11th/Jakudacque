import { IoAdd, IoCartOutline, IoRemove } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@components/Spinner";
import { useState } from "react";
import useCounterState from "@zustand/counter";

export default function Cart() {
  const axios = useAxiosInstance();
  const navigate = useNavigate();
  const [checkedIdsSet, setCheckedIdsSet] = useState(new Set());
  const numChecked = checkedIdsSet.size;
  const { countUp, countDown } = useCounterState();

  // 주문완료 Toast 메시지 호출
  const handlePurchase = () => {
    toast("주문이 완료되었습니다!");
  };

  // 장바구니 목록 조회 api (로그인시)
  const { data, isLoading } = useQuery({
    queryKey: ["carts"],
    queryFn: () => axios.get(`/carts`),
    select: res => res.data,
  });

  // 수량 변경 api
  const updateQuantity = async (_id, quantity) => {
    try {
      const response = await axios.patch(`/carts/${_id}`, { quantity });
      return response.data;
    } catch (error) {
      console.error("API 호출 에러:", error);
      throw error;
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  // Set()을 이용한 체크박스 토글 설정
  const updateSet = (set, _id) => {
    const updatedSet = new Set(set);

    if (updatedSet.has(_id)) {
      updatedSet.delete(_id);
    } else {
      updatedSet.add(_id);
    }
    return updatedSet;
  };

  // 개별상품 선택/해제
  const handleOnChange = _id => {
    setCheckedIdsSet(prevSet => updateSet(prevSet, _id));
  };

  // 전체선택/해제
  const toggleAllCheckedById = ({ target: { checked } }) => {
    if (checked) {
      const allChecked = new Set(data.item.map(({ _id }) => _id));
      setCheckedIdsSet(allChecked);
    } else {
      setCheckedIdsSet(new Set());
    }
  };

  // 선택된 상품의 총 금액 계산
  const selectedTotalPrice = data.item
    .filter(item => checkedIdsSet.has(item.product_id))
    .reduce((total, item) => total + item.product.price * item.quantity, 0);

  // 수량 변경 핸들러
  const handleQuantityChange = async (items, increment) => {
    const newQuantity = items.quantity + increment;
    if (newQuantity < 1 || newQuantity > 9999) return;

    try {
      await updateQuantity(items._id, newQuantity);
      if (increment > 0) {
        countUp(increment);
      } else {
        countDown(-increment);
      }
    } catch (error) {
      console.error("수량 변경 중 에러 발생:", error);
    }
  };

  return (
    <div className="max-w-7xl container mx-auto px-5 py-6">
      <div className=" mx-auto px-10mb-6">
        <div className="flex mb-12 justify-between items-center">
          <h1 className="text-4xl font-bold">장바구니</h1>
          <p className="text-sm text-[#999] pl-2 mt-auto">
            30,000원 이상 구매시 배송비 무료
          </p>
        </div>
      </div>
      {data.item && data.item.length > 0 ? (
        <div className=" mx-auto">
          <div className="mb-4 text-xl">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 mr-3"
                onChange={toggleAllCheckedById}
                checked={numChecked === data.item.length}
              />
              <span>전체 선택</span>
            </label>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-28 w-full">
            {data.item.map(items => (
              <div
                key={items.product_id}
                className="flex items-center justify-between border rounded-lg p-5"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mr-4"
                    checked={checkedIdsSet.has(items.product_id)}
                    onChange={() => handleOnChange(items.product_id)}
                  />
                  <img
                    src={`https://11.fesp.shop/${items.product.image.path}`}
                    alt={items.product.name}
                    className="w-36 h-36 object-cover rounded-md"
                  />
                  <div className="ml-4">
                    <h2 className="text-2xl font-medium">
                      <Link to={`/product/${items.product_id}`}>
                        {items.product.name}
                      </Link>
                    </h2>
                    <div className="flex items-center mt-2">
                      <span className="text-xl text-[#555] mr-2">수량 :</span>
                      <div className="flex">
                        <button
                          className="border-[#aaa] border-y border-l px-2 max-[768px]:px-1.5"
                          onClick={() => handleQuantityChange(items, -1)}
                          disabled={items.quantity === 1}
                        >
                          <IoRemove />
                        </button>
                        <span className="border-[#aaa] border px-4 py-1.5 max-[768px]:px-3 max-[768px]:py-1">
                          {items.quantity}
                        </span>
                        <button
                          className="border-[#aaa] border-y border-r px-2 max-[768px]:px-1.5"
                          onClick={() => handleQuantityChange(items, 1)}
                          disabled={items.quantity === 9999}
                        >
                          <IoAdd />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-medium">
                    {(items.product.price * items.quantity).toLocaleString()} 원
                  </p>
                  <button className="font-medium border rounded-md shadow px-4 py-1 hover:bg-secondary-base mt-2">
                    삭제
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-8 border-t border-[#999] px-10 pt-6">
              <div className="flex flex-col items-center text-2xl font-medium space-y-5 mb-8">
                <p className="flex justify-between w-full">
                  <span>상품 금액</span>
                  <span>+ {selectedTotalPrice.toLocaleString()} 원</span>
                </p>
                <p className="flex justify-between w-full">
                  <span>배송비</span>
                  <span>
                    +{" "}
                    {selectedTotalPrice >= 30000
                      ? 0
                      : data.cost.shippingFees.toLocaleString()}{" "}
                    원
                  </span>
                </p>
                <p className="flex justify-between w-full text-3xl font-semibold">
                  <span>총 주문 금액</span>
                  <span>
                    {" "}
                    {(
                      selectedTotalPrice +
                      (selectedTotalPrice >= 30000 ? 0 : data.cost.shippingFees)
                    ).toLocaleString()}{" "}
                    원
                  </span>
                </p>
              </div>
              <div className="flex justify-center mx-auto mt-6 mb-8">
                <div className=" flex gap-8 w-full text-xl">
                  <button
                    onClick={handlePurchase}
                    className="flex-1 text-center rounded-md border px-6 py-3 font-semibold shadow hover:bg-secondary-base"
                  >
                    주문하기
                  </button>
                  <button
                    onClick={() => navigate(-1)}
                    className="flex-1 text-center rounded-md border px-6 py-3 font-semibold shadow hover:bg-secondary-base"
                  >
                    계속 쇼핑하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-[#999] my-52">
          <IoCartOutline size={56} />
          <p className="mt-4 text-lg">장바구니가 비었습니다</p>
        </div>
      )}
    </div>
  );
}
