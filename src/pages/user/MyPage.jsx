import Spinner from "@components/Spinner";
import Product from "@components/Product";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import useUserStore from "@zustand/userStore";
import useWishState from "@zustand/wishState";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartModal from "@components/CartModal";
import OrderProduct from "@components/OrderProduct";
import Address from "@components/Address";
import { useForm } from "react-hook-form";

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
    queryKey: ["wish", user_id],
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

  // 회원 정보 조회
  const { data: userData, isLoading: isLoadingUserData } = useQuery({
    queryKey: ["user", user_id],
    queryFn: () => axios.get(`users/${user_id}`),
    select: res => res.data.item,
  });

  // 기본 정보 폼
  const {
    register: registerBasic,
    handleSubmit: handleBasicSubmit,
    formState: { errors: basicErrors },
  } = useForm({ mode: "onBlur" });

  // 전체 폼 제출
  const addBasic = newProfile => {
    if (!newProfile.extra) {
      newProfile.extra = {};
    }
    if (addressData.length) {
      newProfile.extra.addressBook = addressData;
      console.log("userProfile:", newProfile);
      updateProfile.mutate(newProfile);
    } else {
      setaddAddressMsg("주소를 하나 이상 추가해주세요.");
    }
  };

  // 회원 정보 수정
  const updateProfile = useMutation({
    mutationFn: newProfile => axios.patch(`users/${user_id}`, newProfile),
    onSuccess: () => {
      toast("회원 정보 수정이 완료되었습니다!");
    },
    onError: err => {
      console.log(err);
    },
  });

  // 배송지 추가 폼
  const {
    register: registerAddress,
    handleSubmit: handleAddressSubmit,
    formState: { errors: addressErrors },
    reset: resetAddress,
  } = useForm();

  // 주소 데이터 상태로 관리
  const [addressData, setAddressData] = useState([]);

  useEffect(() => {
    if (userData?.extra.addressBook) {
      setAddressData(userData.extra.addressBook);
    }
  }, [userData]);

  // 주소 추가 함수
  const addAddress = newAddress => {
    setAddressData(prev => [...prev, newAddress]);
  };

  // 배송지 추가 폼 제출
  const onAddressSubmit = data => {
    console.log(addressData);
    if (addressData.length) {
      data.id = addressData[addressData.length - 1].id + 1;
    } else {
      data.id = 1;
    }
    addAddress(data);
    resetAddress();
    setaddAddressMsg("");
  };

  // 주소 삭제 핸들러
  const handleDeleteAddress = selectedIndex => {
    setAddressData(prev => prev.filter((_, index) => index !== selectedIndex));
  };

  const [addAddressMsg, setaddAddressMsg] = useState("");

  return (
    <div className="w-full">
      {isLoading && isLoadingOrderData && isLoadingUserData && <Spinner />}
      {orderData && userData && data && (
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
          {/* 주문내역, 찜 리스트, 회원정보수정 영역 */}
          <div className="flex justify-around gap-x-8 max-[700px]:flex-col">
            {/* 주문내역, 찜 리스트, 회원정보수정 카테고리 */}
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
                  <div className="grid grid-cols-[88px_minmax(200px,300px)]">
                    <label htmlFor="name">이름</label>
                    <input
                      type="text"
                      id="name"
                      className="focus:outline-none border border-[#aaa] rounded-md px-1"
                      defaultValue={userData.name}
                      {...registerBasic("name", {
                        required: "이름은 비워둘 수 없습니다.",
                      })}
                    />
                    {basicErrors.name && (
                      <p className="text-red-500 text-sm mt-1 col-start-2">
                        {basicErrors.name.message}
                      </p>
                    )}

                    <label htmlFor="name" className="mt-2">
                      휴대폰 번호
                    </label>
                    <input
                      type="text"
                      id="phone"
                      className="focus:outline-none border border-[#aaa] rounded-md px-1 mt-2"
                      defaultValue={userData.phone}
                      {...registerBasic("phone", {
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "숫자만 입력해주세요.",
                        },
                      })}
                    />
                    {basicErrors.phone && (
                      <p className="text-red-500 text-sm mt-1 col-start-2">
                        {basicErrors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
              </form>
              {/* 배송지 추가 */}
              <form onSubmit={handleAddressSubmit(onAddressSubmit)}>
                <div className="flex flex-col gap-y-7">
                  <p className="text-[18px] max-[700px]:text-[16px] font-semibold border-b border-[#ccc] pb-4">
                    배송지 추가
                  </p>
                  <div className="grid grid-cols-[88px_minmax(200px,300px)]">
                    <label htmlFor="addressName">배송지명</label>
                    <input
                      type="text"
                      id="addressName"
                      className="focus:outline-none border border-[#aaa] rounded-md px-1"
                      {...registerAddress("name", {
                        required: "배송지명을 입력해주세요.",
                      })}
                    />
                    {addressErrors.name && (
                      <p className="text-red-500 text-sm mt-1 col-start-2">
                        {addressErrors.name.message}
                      </p>
                    )}
                    <label htmlFor="address" className="mt-2">
                      주소
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="focus:outline-none border border-[#aaa] rounded-md px-1 mt-2"
                      {...registerAddress("value", {
                        required: "주소를 입력해주세요.",
                      })}
                    />
                    {addressErrors.value && (
                      <p className="text-red-500 text-sm mt-1 col-start-2">
                        {addressErrors.value.message}
                      </p>
                    )}
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
                  <>
                    <p className="text-red-500 text-sm">{addAddressMsg}</p>
                    {addressData?.map((e, index) => (
                      <Address
                        key={index}
                        address={e}
                        onDelete={() => handleDeleteAddress(index)}
                      />
                    ))}
                  </>
                </div>
              </div>
              <button
                className="border border-[#aaa] px-3 py-2 rounded-[4px] hover:bg-secondary-base"
                onClick={handleBasicSubmit(addBasic)}
              >
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
