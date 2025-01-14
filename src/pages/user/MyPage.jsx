import Spinner from "@components/Spinner";
import Product from "@components/Product";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "@zustand/userStore";
import useWishState from "@zustand/wishState";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartModal from "@components/CartModal";
import OrderProduct from "@components/OrderProduct";

export default function MyPage() {
  const axios = useAxiosInstance();

  const { resetUser } = useUserStore();
  const { resetWishState } = useWishState();
  const navigate = useNavigate();

  const handleLogout = event => {
    event.preventDefault();
    resetUser();
    resetWishState();
    navigate("/");
    toast("로그아웃 되었습니다!");
  };

  const [category, setCategory] = useState("orderList");

  // 로그인한 회원 데이터
  const user = JSON.parse(sessionStorage.getItem("user")).state.user;
  const user_id = user._id;

  // 회원 찜 내역 조회
  const { data, isLoading } = useQuery({
    queryKey: ["user", user_id],
    queryFn: () => axios.get(`users/${user_id}/bookmarks`),
    select: res => res.data.item.product,
  });

  // 찜 상품 데이터 커스텀
  let product;
  if (data) {
    product = data.map(e => ({
      image: `https://11.fesp.shop/${e.product.mainImages[0].path}`,
      name: e.product.name,
      price: e.product.price,
      id: e.product._id,
    }));
  }

  // 주문 내역 조회
  const { data: orderData, isLoading: isLoadingOrderData } = useQuery({
    queryKey: ["order"],
    queryFn: () => axios.get(`/orders`),
    select: res => res.data.item,
  });

  // 주문 내역 데이터 커스텀
  let orderProducts;
  if (orderData) {
    orderProducts = orderData.map(e => ({
      id: e._id,
      date: e.createdAt.slice(2, 10).split(".").join("/"),
      products: e.products,
    }));
  }

  return (
    <div className="w-full">
      {isLoading && isLoadingOrderData && <Spinner />}
      {orderData && data && (
        <div className="max-w-screen-xl mx-auto">
          {/* 프로필 영역 */}
          <div className=" bg-[#f1f1f1] py-12 max-[500px]:py-8 flex items-center gap-x-40 max-[1000px]:gap-x-20 max-[700px]:gap-x-10 justify-center relative max-[500px]:flex-col max-[500px]:gap-y-7">
            <p className="text-[20px] max-[1000px]:text-[18px] max-[700px]:text-[16px] max-[500px]:text-[18px] ml-[-30px] max-[700px]:ml-0 shrink-0 tracking-wide">
              <span>{user.name}</span>님, 반갑습니다.
            </p>
            <div className="flex items-center pb-4">
              <div className="text-[16px] max-[700px]:text-[14px] border-x border-[#ccc] px-20 max-[900px]:px-14 max-[700px]:px-10 py-3 shrink-0 max-[500px]:border-x-0 max-[500px]:border-r">
                주문
                <span className="text-[22px] max-[700px]:text-[20px] pl-3 pr-1">
                  {orderData?.length}
                </span>
                건
              </div>
              <div className="text-[16px] max-[700px]:text-[14px] border-r border-[#ccc] px-20 max-[900px]:px-14 max-[700px]:px-10 py-3 shrink-0 max-[500px]:border-x-0">
                찜
                <span className="text-[22px] max-[700px]:text-[20px] pl-3 pr-1">
                  {data?.length}
                </span>
                건
              </div>
            </div>
            <Link
              to="/user/signin"
              onClick={handleLogout}
              className="leading-none border-b border-[#444] absolute bottom-3 right-4 text-[16px] max-[700px]:text-[14px]"
            >
              로그아웃
            </Link>
          </div>
          {/* 주문내역, 찜 리스트, 회원정보수정 카테고리 */}
          <div className="flex justify-around gap-x-8 max-[700px]:flex-col">
            <ul className="sticky top-0 ml-5 max-[700px]:ml-0 text-[18px] py-8 max-[700px]:my-6 flex flex-col items-start max-[700px]:flex-row max-[700px]:justify-around gap-y-2 shrink-0 max-[700px]:text-[14px] h-11 max-[700px]:py-0 max-[700px]:gap-y-0 max-[700px]:h-6 bg-[#fff]">
              <button
                className={`${category === "orderList" ? "border-b-2 border-[#333]" : ""}`}
                onClick={() => setCategory("orderList")}
              >
                주문 내역
              </button>
              <button
                className={`${category === "wishList" ? "border-b-2 border-[#333]" : ""}`}
                onClick={() => setCategory("wishList")}
              >
                찜 리스트
              </button>
              <button
                className={`${category === "editProfile" ? "border-b-2 border-[#333]" : ""}`}
                onClick={() => setCategory("editProfile")}
              >
                회원 정보 수정
              </button>
            </ul>

            {/* 주문 내역 */}
            <div
              className={`last:border-b-0 basis-[1120px] max-[700px]:basis-0 pt-5 max-[500px]:pt-0 pb-6 ${category === "orderList" ? "" : "hidden"}`}
            >
              {orderProducts ? (
                <>
                  {orderProducts.map(e => (
                    <OrderProduct key={e.id} orderProducts={e} />
                  ))}
                </>
              ) : (
                <></>
              )}
            </div>

            {/* 찜 리스트 */}
            <div
              className={`max-[600px]:px-2 pb-6 ${category === "wishList" ? "" : "hidden"}`}
            >
              <div className="max-w-[1120px] grid gap-5 pt-10 grid-cols-4 max-[1000px]:grid-cols-3 max-[600px]:grid-cols-2 max-[700px]:pt-0">
                {Array.isArray(product) ? (
                  <>
                    {product.map(e => (
                      <Product key={e.id} product={e} />
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>

            {/* 회원 정보 수정 */}
            <div
              className={`w-full pt-10 max-[700px]:pt-2 px-4 pb-6 flex flex-col gap-y-10 text-[16px] max-[700px]:text-[14px] ${category === "editProfile" ? "" : "hidden"}`}
            >
              <form>
                {/* 기본 정보 */}
                <div className="flex flex-col gap-y-7">
                  <p className="text-[18px] max-[700px]:text-[16px] font-semibold border-b border-[#ccc] pb-4">
                    기본 정보
                  </p>
                  <div className="grid grid-cols-[88px_minmax(200px,300px)] gap-y-2">
                    <label htmlFor="name">이름</label>
                    <input
                      type="text"
                      id="name"
                      className="focus:outline-none border border-[#aaa] rounded-md px-1"
                    />

                    <label htmlFor="name">휴대폰 번호</label>
                    <input
                      type="text"
                      id="phone"
                      className="focus:outline-none border border-[#aaa] rounded-md px-1"
                    />
                  </div>
                </div>
              </form>
              {/* 배송지 추가 */}
              <form>
                <div className="flex flex-col gap-y-7">
                  <p className="text-[18px] max-[700px]:text-[16px] font-semibold border-b border-[#ccc] pb-4">
                    배송지 추가
                  </p>
                  <div className="grid grid-cols-[88px_minmax(200px,300px)] gap-y-2">
                    <label htmlFor="addressName">배송지명</label>
                    <input
                      type="text"
                      id="phone"
                      className="focus:outline-none border border-[#aaa] rounded-md px-1"
                    />
                    <label htmlFor="addressName">주소</label>
                    <input
                      type="text"
                      id="phone"
                      className="focus:outline-none border border-[#aaa] rounded-md px-1"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-5 border border-[#aaa] rounded-md px-4 py-1 w-[388px] max-[388px]:w-full hover:border-[#555]"
                >
                  추가
                </button>
              </form>

              {/* 배송지 정보 */}
              <div className="flex flex-col gap-y-2">
                <p className="text-[18px] font-semibold border-b border-[#ccc] pb-4 max-[700px]:text-[16px]">
                  배송지 정보
                </p>
                <div className="flex flex-col gap-y-3">
                  <div className="bg-[#f8f8f8] flex justify-between gap-x-3 p-4 items-center">
                    <div className="flex flex-col gap-y-1">
                      <p className="text-[14px] max-[700px]:text-[12px]">집</p>
                      <p>경기도 남양주시 별내3로 63 (별내동, 쌍용예가아파트)</p>
                    </div>
                    <button className="text-[14px] border border-[#aaa] px-3 py-1 rounded-[4px] bg-white flex-shrink-0 hover:border-[#555]">
                      삭제
                    </button>
                  </div>
                  <div className="bg-[#f8f8f8] flex justify-between gap-x-3 p-4 items-center">
                    <div className="flex flex-col gap-y-1">
                      <p className="text-[14px] max-[700px]:text-[12px]">
                        회사
                      </p>
                      <p>서울특별시 강남구 강남대로62길 21</p>
                    </div>
                    <button className="text-[14px] border border-[#aaa] px-3 py-1 rounded-[4px] bg-white flex-shrink-0 hover:border-[#555]">
                      삭제
                    </button>
                  </div>
                </div>
              </div>
              <button className="border border-[#aaa] px-3 py-2 rounded-[4px] hover:bg-secondary-base">
                수정 완료
              </button>
            </div>
          </div>
        </div>
      )}
      <CartModal />
    </div>
  );
}
