import Spinner from "@components/Spinner";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import CartModal from "@components/CartModal";
import useCounterState from "@zustand/counter";
import { IoAdd } from "react-icons/io5";
import { IoRemove } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useHandleWish } from "@hooks/useHandleWish";
import useWishState from "@zustand/wishState";
import { useAddCart } from "@hooks/useAddCart";
import { useEffect, useState } from "react";
import AddressModal from "@components/AddressModal";
import { useAddress } from "@hooks/useAddress";
import useUserStore from "@zustand/userStore";

export default function Detail() {
  const { _id } = useParams();

  const axios = useAxiosInstance();

  const location = useLocation();

  const navigate = useNavigate();

  function navigateLogin() {
    const gotoLogin = confirm(
      "로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?",
    );
    gotoLogin &&
      navigate("/user/signin", { state: { from: location.pathname } });
  }

  // 상품 상세 조회
  const { data, isLoading } = useQuery({
    queryKey: ["products", _id],
    queryFn: () => axios.get(`/products/${_id}`),
    select: res => res.data.item,
  });

  // 상품 수량
  const { count, countUp, countDown, reset } = useCounterState();

  useEffect(() => {
    return () => {
      // 상세 페이지에서 벗어날 때 reset 호출
      reset();
    };
  }, [location]);

  // 상품 가격(수량 변경시 함께 변경)
  const productPrice = data && (data.price * count).toLocaleString();

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

  // 사용자가 선택한 주소를 포함하여 구매 요청 보내는 훅
  const { mutateCallback } = useAddress();

  // 주소 선택 모달 상태
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const sendInfo = () => {
    if (user) {
      setIsAddressModalOpen(true); // 주소 선택 모달 열기
    } else {
      navigateLogin();
    }
  };

  // 장바구니 모달 상태
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  // 장바구니에 상품 추가
  const handleAddCart = () => {
    addCart.mutate({ product_id: Number(_id), quantity: count });
    setIsCartModalOpen(true);
  };

  // 로그인한 회원 데이터
  const user = useUserStore(state => state.user);

  return (
    <div className="w-full">
      {isLoading && <Spinner />}
      {data && (
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-stretch gap-4 px-0 md:flex-row md:items-center sm:px-4">
            {/* 상품 이미지 */}
            <div className="md:max-w-xl">
              <img
                src={`https://11.fesp.shop/${data.mainImages[0].path}`}
                alt="상품 이미지"
                className="object-cover"
              />
            </div>

            {/* 상품 정보 파트 */}
            <div className="flex-1 md:basis-[580px] px-4 md:px-0 flex flex-col self-stretch justify-around gap-y-4">
              {/* 상품명 */}
              <div className="py-2 border-b md:pb-5 border-neutral-200">
                <h1 className="text-lg md:text-2xl ">{data.name}</h1>
              </div>
              {/* 배송방법 */}
              <ul className="text-xs md:text-sm">
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
              {/* 수량 */}
              <div className="px-4 py-2 text-sm bg-neutral-100 md:py-3">
                <p className="pb-2 mb-4 border-b border-dashed border-neutral-200">
                  수량
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex">
                    <button
                      className="px-2 border-l border-neutral-400 border-y"
                      onClick={() => countDown(1)}
                    >
                      <IoRemove />
                    </button>
                    <span className="px-4 py-2 border border-neutral-400">
                      {count}
                    </span>
                    <button
                      className="px-2 border-r border-neutral-400 border-y"
                      onClick={() => countUp(1)}
                    >
                      <IoAdd />
                    </button>
                  </div>
                  <span>{productPrice}원</span>
                </div>
              </div>
              <div className="flex items-center justify-between my-2">
                <span className="text-sm sm:text-base">총 상품금액(1개)</span>
                <span className="text-xl md:text-2xl">{productPrice}원</span>
              </div>
              <div className="flex gap-x-2">
                <button
                  className="flex items-center justify-center py-2 rounded grow basis-48 lg:py-3 bg-secondary-base hover:bg-secondary-dark"
                  onClick={sendInfo}
                >
                  구매하기
                </button>
                <button
                  className="flex items-center justify-center border rounded grow basis-48 border-neutral-300 hover:border-neutral-400"
                  onClick={handleAddCart}
                >
                  장바구니
                </button>
                <button
                  className="flex items-center justify-center gap-1 border rounded grow basis-24 border-neutral-300 hover:border-neutral-400"
                  onClick={wishHandle}
                >
                  {localWish ? (
                    <IoHeartSharp className="text-primary-dark" />
                  ) : (
                    <IoHeartOutline className="text-primary-dark" />
                  )}
                  찜
                </button>
              </div>
            </div>
          </div>
          {/* 상품 디테일 컷 파트 시작 */}
          <div className="border-y border-neutral-200 bg-neutral-50 text-center py-1.5 mt-10">
            <p>상세 정보</p>
          </div>
          {/* 상품 디테일 컷 */}
          <div
            className="flex justify-center"
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
        </div>
      )}
      <CartModal
        isCartModalOpen={isCartModalOpen}
        setIsCartModalOpen={setIsCartModalOpen}
      />
      <AddressModal
        onAddressSelect={mutateCallback}
        isAddressModalOpen={isAddressModalOpen}
        setIsAddressModalOpen={setIsAddressModalOpen}
      />
    </div>
  );
}
