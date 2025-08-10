import Spinner from "@components/Spinner";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import CartModal from "@components/CartModal";
import { IoAdd } from "react-icons/io5";
import { IoRemove } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useHandleWish } from "@hooks/useHandleWish";
import { useAddCart } from "@hooks/useAddCart";
import { useEffect, useState } from "react";
import AddressModal from "@components/AddressModal";
import { useAddress } from "@hooks/useAddress";
import useUserStore from "@zustand/userStore";
import { IoStar } from "react-icons/io5";

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

  // 상품 수량 상태
  const [count, setCount] = useState(1);

  // 상품 가격(수량 변경시 함께 변경)
  const productPrice = data && (data.price * count).toLocaleString();

  const { refetchWish } = useHandleWish();

  // 로컬 찜 상태
  const [localWish, setLocalWish] = useState(false);

  // 데이터(상품 아이디)가 변경될 때 myBookmarkId 속성(숫자)을 불리언 값으로 변경하여 로컬 찜 상태 반영
  useEffect(() => {
    setLocalWish(!!data?.myBookmarkId);
  }, [data]);

  const wishHandle = async () => {
    setLocalWish(localWish => !localWish); // 로컬 찜 상태 변경
    try {
      await refetchWish(_id, data?.myBookmarkId); // 상품 아이디와 찜(북마크) 아이디 전달 및 서버 동기화 처리
    } catch (err) {
      console.log("찜 등록/취소 실패", err);
      setLocalWish(localWish => !localWish); // 로컬 찜 상태 원복
    }
  };

  // 장바구니 추가
  const { addCart } = useAddCart();

  // 사용자가 선택한 주소를 포함하여 구매 요청 보내는 훅
  const { mutateCallback } = useAddress(count);

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

  // 상세 정보로 이동
  const scrollToDetail = () => {
    document.getElementById("detail")?.scrollIntoView({ behavior: "smooth" });
  };

  // 상품 리뷰로 이동
  const scrollToReview = () => {
    document.getElementById("review")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full">
      {isLoading && <Spinner />}
      {data && (
        <div className="mx-auto max-w-7xl min-h-screen">
          <div className="flex flex-col items-stretch gap-8 px-0 md:flex-row md:items-center sm:px-4 md:mt-8">
            {/* 상품 이미지 */}
            <div className="md:max-w-xl">
              <img
                src={data.mainImages[0].path}
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
                      onClick={() =>
                        count === 1 ? setCount(1) : setCount(count - 1)
                      }
                    >
                      <IoRemove />
                    </button>
                    <span className="px-4 py-2 border border-neutral-400">
                      {count}
                    </span>
                    <button
                      className="px-2 border-r border-neutral-400 border-y"
                      onClick={() => setCount(count + 1)}
                    >
                      <IoAdd />
                    </button>
                  </div>
                  <span>{productPrice}원</span>
                </div>
              </div>
              <div className="flex items-center justify-between my-2">
                <span className="text-sm sm:text-base">총 상품금액(1개)</span>
                <span className="text-lg md:text-2xl">{productPrice}원</span>
              </div>
              <div className="flex gap-x-2 text-sm md:text-base">
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
          {/* 상품 상세 정보, 상품 리뷰 카테고리 */}
          <div className="border-y border-neutral-200 bg-neutral-50 mt-8 flex sticky top-16 z-50 text-sm md:text-base">
            <button className="border-r py-1.5 grow" onClick={scrollToDetail}>
              상세 정보
            </button>
            <button className="py-1.5 grow" onClick={scrollToReview}>
              상품 리뷰
            </button>
          </div>
          {/* 상품 상세 정보 */}
          <div
            id="detail"
            className="flex justify-center mt-10 scroll-mt-28"
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
          {/* 상품 리뷰 */}
          <div className="mx-5 mt-10 scroll-mt-28" id="review">
            <h3 className="border-b-2 border-b-neutral-100 text-lg font-medium pb-2 mb-2 md:text-xl">
              상품 리뷰(2)
            </h3>
            {/* 상품 리뷰 목록*/}
            <div className="flex flex-col gap-y-2 mb-6">
              <div className="text-base border-b-2 border-b-neutral-100 pb-1 flex last:border-b-0">
                <div>
                  <p className="flex items-baseline gap-x-2">
                    user1@market.com
                    <span className="text-gray-500 text-sm">25.03.04</span>
                  </p>
                  <div className="flex gap-x-1 items-stretch">
                    <div className="flex">
                      <IoStar size="18" className="text-amber-400" />
                      <IoStar size="18" className="text-amber-400" />
                      <IoStar size="18" className="text-amber-400" />
                      <IoStar size="18" className="text-amber-400" />
                      <IoStar size="18" className="text-neutral-300" />
                    </div>
                    <p className="text-sm">4</p>
                  </div>
                  <div className="max-w-48">
                    <img
                      src="/images/review_img.png"
                      alt="자동차 햄스터 키링 리뷰 이미지"
                    />
                  </div>
                  <p className="pb-1">귀여워요</p>
                </div>
              </div>

              <div className="text-base border-b-2 border-b-neutral-100 pb-1 flex last:border-b-0">
                <div>
                  <p className="flex items-baseline gap-x-2">
                    user1@market.com
                    <span className="text-gray-500 text-sm">25.03.04</span>
                  </p>
                  <div className="flex gap-x-1 items-stretch">
                    <div className="flex">
                      <IoStar size="18" className="text-amber-400" />
                      <IoStar size="18" className="text-amber-400" />
                      <IoStar size="18" className="text-amber-400" />
                      <IoStar size="18" className="text-amber-400" />
                      <IoStar size="18" className="text-neutral-300" />
                    </div>
                    <p className="text-sm">4</p>
                  </div>
                  <div className="max-w-48">
                    <img
                      src="/images/review_img.png"
                      alt="자동차 햄스터 키링 리뷰 이미지"
                    />
                  </div>
                  <p className="pb-1">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Nostrum dolorum consequuntur rem quos, sint nulla, nihil
                    provident aliquam ratione, placeat porro minima esse
                    perspiciatis repudiandae vero! Praesentium inventore ducimus
                    ea.Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="flex flex-col gap-y-2 items-center my-24">
              <p>작성된 리뷰가 없습니다.</p>
            </div> */}
          </div>
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
