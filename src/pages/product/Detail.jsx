import Spinner from "@components/Spinner";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import CartModal from "@components/CartModal";
import useCounterState from "@zustand/counter";
import { IoAdd } from "react-icons/io5";
import { IoRemove } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useHandleWish } from "@hooks/useHandleWish";
import useWishState from "@zustand/wishState";
import { useAddCart } from "@hooks/useAddCart";
import { useOrder } from "@hooks/useOrder";
import { useState } from "react";

export default function Detail() {
  const { _id } = useParams();

  const axios = useAxiosInstance();

  // 상품 상세 조회
  const { data, isLoading } = useQuery({
    queryKey: ["products", _id],
    queryFn: () => axios.get(`/products/${_id}`),
    select: res => res.data.item,
  });

  // 상품 수량
  const { count } = useCounterState();

  // 상품 수량 변경
  const countUp = useCounterState(state => state.countUp);
  const countDown = useCounterState(state => state.countDown);

  // 상품 가격(수량 변경시 함께 변경)
  const productPrice = data && (data.price * count).toLocaleString();

  // 상품 구매
  const { orderProduct } = useOrder();

  const { refetchWish } = useHandleWish(_id);

  // 전역 찜 상태 조회
  const isWished = useWishState(state => state.isWished);

  // 로컬 찜 상태
  const [localWish, setLocalWish] = useState(isWished(_id));

  const wishHandle = async () => {
    setLocalWish(localWish => !localWish); // 로컬 찜 상태 변경
    try {
      await refetchWish(); // 전역 상태 변경 및 서버 동기화 처리(비동기)
    } catch (err) {
      console.log("찜 등록/취소 실패", err);
      setLocalWish(localWish => !localWish); // 로컬 찜 상태 원복
    }
  };

  // 장바구니 추가
  const { addCart } = useAddCart();

  return (
    <div className="w-full">
      {isLoading && <Spinner />}
      {data && (
        <div className="max-w-[1240px] mx-auto max-[700px]:mx-0 max-[425px]:mt-0">
          <div className="flex max-[700px]:flex-col items-center max-[700px]:items-stretch gap-x-5 px-5 max-[700px]:px-0">
            {/* 상품 이미지 */}
            <div className="basis-[640px] max-[700px]:basis-0  max-[700px]:w-screen">
              <img
                src={`https://11.fesp.shop/${data.mainImages[0].path}`} // 데이터 형식 변경 후 수정 예정
                alt="상품 이미지"
              />
            </div>
            {/* 상품 정보 파트 */}
            <div className="basis-[580px] max-[700px]:basis-0 max-[700px]:w-auto max-[700px]:px-4 max-[700px]:mt-0 flex flex-col gap-y-11 max-[1100px]:gap-y-4 max-[900px]:gap-y-4">
              <div className="border-b border-neutral-200 pb-5 max-[900px]:pb-2 max-[900px]:pt-2">
                <h1 className="text-[22px] max-[900px]:text-[16px] pt-2 pb-1 max-[900px]:py-0 max-[700px]:text-[18px] ">
                  {data.name}
                </h1>
                <h2 className="text-xl max-[900px]:text-base max-[425px]:text-base">
                  {data.price.toLocaleString()}원
                </h2>
              </div>
              <ul className="text-sm max-[900px]:text-xs max-[425px]:text-xs">
                <li className="flex gap-x-1.5">
                  <span className="font-semibold">배송 방법</span>
                  <span>택배</span>
                </li>
                <li className="flex gap-x-1.5">
                  <span className="font-semibold">배송비</span>
                  <span>
                    {data.shippingFees.toLocaleString()}원(30,000원 이상
                    무료배송)
                  </span>
                </li>
              </ul>
              <div className="text-[15px] max-[900px]:text-[14px] max-[425px]:text-[14px] bg-[#f7f7f7] py-[14px] max-[900px]:py-[10px] px-4">
                <p className="border-b border-neutral-200 border-dashed pb-2.5 max-[900px]:pb-1.5 mb-4 max-[900px]:mb-3">
                  수량
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex">
                    <button
                      className="border-neutral-400 border-y border-l px-2 max-[768px]:px-1.5"
                      onClick={() => countDown(1)}
                    >
                      <IoRemove />
                    </button>
                    <span className="border-neutral-400 border px-4 py-1.5 max-[768px]:px-3 max-[768px]:py-1">
                      {count}
                    </span>
                    <button
                      className="border-neutral-400 border-y border-r px-2 max-[768px]:px-1.5"
                      onClick={() => countUp(1)}
                    >
                      <IoAdd />
                    </button>
                  </div>
                  <span>{productPrice}원</span>
                </div>
              </div>
              <div className="flex justify-between items-center my-2 max-[900px]:my-1">
                <span className="text-base max-[900px]:text-[15px] max-[425px]:text-sm">
                  총 상품금액(1개)
                </span>
                <span className="text-2xl max-[900px]:text-[22px] max-[425px]:text-xl">
                  {productPrice}원
                </span>
              </div>
              <div className="flex gap-x-2 max-[900px]:text-[15px]">
                <button
                  className="grow basis-[198px] py-3 max-[900px]:py-2 border border-neutral-300 rounded hover:border-[#999] hover:bg-secondary-base flex justify-center items-center"
                  onClick={() =>
                    orderProduct.mutate({
                      products: [{ _id: Number(_id), quantity: count }],
                    })
                  }
                >
                  구매하기
                </button>
                <button
                  className="grow basis-[198px] border border-neutral-300 rounded hover:border-[#999] flex justify-center items-center"
                  onClick={() =>
                    addCart.mutate({ product_id: Number(_id), quantity: count })
                  }
                >
                  장바구니
                </button>
                <button
                  className="grow basis-[100px] border border-neutral-300 rounded hover:border-[#999] flex justify-center items-center"
                  onClick={wishHandle}
                >
                  {localWish ? <IoHeartSharp /> : <IoHeartOutline />}찜
                </button>
              </div>
            </div>
          </div>
          {/* 상품 디테일 컷 파트 시작 */}
          <div className="border-y border-neutral-200 bg-[#fcfcfc] text-center py-1.5 mt-[40px]">
            <p>상세 정보</p>
          </div>
          {/* 상품 디테일 컷 */}
          <img
            src={`https://11.fesp.shop/${data.mainImages[1].path}`} // 데이터 형식 변경 후 수정 예정(content 필드)
            alt="상품 디테일 사진"
            className="w-[1240px] mx-auto"
          />
        </div>
      )}
      <CartModal />
    </div>
  );
}
