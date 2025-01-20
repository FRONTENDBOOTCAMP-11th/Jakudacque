import { IoAdd, IoCartOutline, IoRemove } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "@components/Spinner";
import { useState } from "react";
import useCounterState from "@zustand/counter";
import AddressModal from "@components/AddressModal";
import useAddressModalState from "@zustand/AddressModalState";
import { useOrder } from "@hooks/useOrder";
import { useCartCleanUp } from "@hooks/useCartCleanUp";

export default function Cart() {
  const axios = useAxiosInstance();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [checkedIdsSet, setCheckedIdsSet] = useState(new Set());
  const numChecked = checkedIdsSet.size;
  const { countUp, countDown } = useCounterState();
  const { modalIsOpen, handleModal, selectedAddress, setSelectedAddress } =
    useAddressModalState();

  // 장바구니 목록 조회(로그인시) api
  const { data, isLoading } = useQuery({
    queryKey: ["carts"],
    queryFn: () => axios.get(`/carts`),
    select: res => res.data,
  });

  // 상품 구매
  const { orderProduct } = useOrder();

  // 장바구니 비우기
  const { cleanupProduct } = useCartCleanUp();

  // 상품을 배열로 만들어 구매api로 넘기기
  const orderCart = data => {
    const products = data.item
      .filter(item => checkedIdsSet.has(item._id)) // 선택된 상품만 주문
      .map(item => ({
        _id: Number(item.product_id),
        quantity: item.quantity,
      }));

    orderProduct.mutate(
      {
        products,
        address: selectedAddress, // 선택된 주소 포함하기
      },
      {
        onSuccess: () => {
          cleanupProduct.mutate(); // 장바구니 비우기
        },
      },
    );
  };

  const handleOrder = () => {
    handleModal();
  };

  const handleAddressSelect = address => {
    setSelectedAddress(address);
    handleModal(); // 모달 닫기
    orderCart(data); // 주문 처리
  };

  // 장바구니 상품 삭제(한건) api
  const deleteItem = useMutation({
    mutationFn: async _id => {
      await axios.delete(`/carts/${_id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
  });

  // 상품 수량 변경 api
  const updateQuantity = async (_id, quantity) => {
    try {
      const response = await axios.patch(`/carts/${_id}`, { quantity });
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      return response.data;
    } catch (error) {
      console.error("API 호출 에러:", error);
      throw error;
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  // 수량 변경 핸들러
  const handleQuantityChange = async (items, increment) => {
    const newQuantity = items.quantity + increment;
    if (newQuantity < 1) return;

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

  // 전체 선택/해제
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
    .filter(item => checkedIdsSet.has(item._id))
    .reduce((total, item) => total + item.product.price * item.quantity, 0);

  // 배송비 계산
  const shippingFee = selectedTotalPrice >= 30000 ? 0 : data.cost.shippingFees;

  // 최종 금액 계산
  const finalTotalPrice =
    selectedTotalPrice === 0 ? 0 : selectedTotalPrice + shippingFee;

  return (
    <div
      className="container px-5 py-6 mx-auto max-w-7xl"
      style={{ whiteSpace: "nowrap" }}
    >
      <div className="px-10 mx-auto mb-6 ">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-xl font-bold sm:text-3xl">장바구니</h1>
          <p className="pl-2 mt-auto sm:text-xs text-neutral-400">
            30,000원 이상 구매시 배송비 무료
          </p>
        </div>
      </div>
      {data.item && data.item.length > 0 ? (
        <div className="mx-auto ">
          <div className="mb-4 text-lg">
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

          <div className="grid w-full grid-cols-1 gap-6 mb-28">
            {data.item.map(items => (
              <div
                key={items.product_id}
                className="flex items-center justify-between p-5 border rounded-lg"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mr-4"
                    checked={checkedIdsSet.has(items._id)}
                    onChange={() => handleOnChange(items._id)}
                  />
                  <Link to={`/list/${items.product_id}`}>
                    <img
                      src={`https://11.fesp.shop/${items.product.image.path}`}
                      alt={items.product.name}
                      className="object-cover w-24 h-24 rounded-md sm:w-36 sm:h-36"
                    />
                  </Link>

                  <div className="mx-4">
                    <h2
                      className="pb-2 font-medium sm:text-xl"
                      style={{ whiteSpace: "wrap" }}
                    >
                      <Link to={`/list/${items.product_id}`}>
                        {items.product.name}
                      </Link>
                    </h2>
                    <div className="flex items-center mt-2">
                      <div className="flex">
                        <button
                          className="border-neutral-400 border-y border-l md:px-2 px-1.5"
                          onClick={() => handleQuantityChange(items, -1)}
                          disabled={items.quantity === 1}
                        >
                          <IoRemove />
                        </button>
                        <span className="px-3 py-1 border border-neutral-400 md:px-4">
                          {items.quantity}
                        </span>
                        <button
                          className="border-neutral-400  border-y border-r md:px-2 px-1.5"
                          onClick={() => handleQuantityChange(items, 1)}
                          disabled={items.quantity === 9999}
                        >
                          <IoAdd />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end mt-4 sm:text-lg">
                  <p className="pb-1 font-medium sm:text-xl">
                    {(items.product.price * items.quantity).toLocaleString()} 원
                  </p>
                  <button
                    className="px-4 py-1 mt-2 border rounded-md shadow hover:bg-secondary-dark"
                    onClick={() => deleteItem.mutate(items._id)}
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
            <div className="px-8 pt-6 mt-8 border-t border-neutral-400">
              <div className="flex flex-col items-center mb-8 space-y-5 font-medium sm:text-xl">
                <p className="flex justify-between w-full">
                  <span>상품 금액</span>
                  <span>+ {selectedTotalPrice.toLocaleString()} 원</span>
                </p>
                <p className="flex justify-between w-full">
                  <span>배송비</span>
                  <span>+ {shippingFee.toLocaleString()} 원</span>
                </p>
                <p className="flex justify-between w-full text-lg font-semibold sm:text-2xl">
                  <span>총 주문 금액</span>
                  <span>{finalTotalPrice.toLocaleString()} 원</span>
                </p>
              </div>
              <div className="flex justify-center mx-auto mt-6 mb-8">
                <div className="flex w-full gap-8 sm:text-xl">
                  <button
                    onClick={() => handleOrder(data)}
                    className="flex-1 px-6 py-3 text-center border rounded bg-secondary-base hover:bg-secondary-dark"
                  >
                    구매하기
                  </button>
                  <button
                    onClick={() => navigate(-1)}
                    className="flex-1 px-6 py-3 text-center border rounded border-neutral-300 hover:border-neutral-400"
                  >
                    계속 쇼핑하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-neutral-400 my-52">
          <IoCartOutline size={56} />
          <p className="mt-4 text-lg">장바구니가 비었습니다</p>
        </div>
      )}
      {modalIsOpen && <AddressModal onAddressSelect={handleAddressSelect} />}
    </div>
  );
}
