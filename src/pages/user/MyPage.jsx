import Spinner from "@components/Spinner";
import Product from "@components/Product";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useUserStore from "@zustand/userStore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import CartModal from "@components/CartModal";
import OrderProduct from "@components/OrderProduct";
import Address from "@components/Address";
import { useForm } from "react-hook-form";
import { FaRegClipboard, FaRegHeart } from "react-icons/fa";
import tw from "tailwind-styled-components";
import AddAddressModal from "@components/AddAddressModal";
import InputField from "@components/InputField";
import { IoStar } from "react-icons/io5";

export default function MyPage() {
  const queryClient = useQueryClient();
  const axios = useAxiosInstance();

  // 배송지 추가 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 배송지 데이터 상태
  const [addressData, setAddressData] = useState([]);

  // 배송지 삭제
  const deleteAddress = id => {
    setAddressData(addressData.filter(e => Number(e.id) !== Number(id)));
  };

  const { resetUser } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = event => {
    event.preventDefault();
    resetUser();
    navigate("/");
    toast("로그아웃 되었습니다!");
  };

  // 쿼리 스트링 추가
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "orderList"; // 기본값: 주문 내역 카테고리
  const [category, setCategory] = useState(initialCategory);
  searchParams.get("category");

  useEffect(() => {
    if (searchParams.get("category") !== category) {
      setSearchParams({ category });
    }
  }, [category]);

  useEffect(() => {
    const paramsCategory = searchParams.get("category");
    setCategory(paramsCategory);
  }, [searchParams]);

  // 로그인한 회원 데이터
  const user = useUserStore(state => state.user);
  const user_id = user?._id;

  // 회원 찜 내역 조회
  const { data, isLoading } = useQuery({
    queryKey: ["wish", user_id],
    queryFn: () => axios.get(`users/${user_id}/bookmarks`),
    select: res => res.data.item.product,
    enabled: !!user_id,
  });

  // 찜 상품 데이터 커스텀
  let product;
  if (data) {
    product = data.map(e => ({
      image: e.product.mainImages[0].path,
      name: e.product.name,
      price: e.product.price,
      id: String(e.product._id),
      link: `/list/${e.product._id}`,
      myBookmarkId: e._id,
    }));
  }

  // 주문 내역 조회
  const { data: orderData, isLoading: isLoadingOrderData } = useQuery({
    queryKey: ["order"],
    queryFn: () => axios.get(`/orders`),
    select: res => res.data.item,
  });

  // 주문 내역 쿼리 무효화(리뷰 작성 후 UI 갱신)
  const refreshOrderData = () => {
    queryClient.invalidateQueries(["order"]);
  };

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
      setaddAddressMsg("");
      newProfile.extra.addressBook = addressData;
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

  useEffect(() => {
    if (userData?.extra?.addressBook) {
      if (!addressData.length) {
        const newAddresses = userData.extra.addressBook;
        if (newAddresses.length === 1) {
          newAddresses.forEach(e => {
            if (!e.id) {
              // 주소를 추가하거나 삭제하지 않은 경우, 기본 주소값에 id 속성 추가
              e.id = 1;
            }
          });
        }
        setAddressData(...addressData, newAddresses);
      }
    }
  }, [userData]);

  const [addAddressMsg, setaddAddressMsg] = useState("");

  return (
    <div className="w-full">
      {isLoading && isLoadingOrderData && isLoadingUserData && <Spinner />}
      {orderData && userData && data && (
        <div className="max-w-screen-xl mx-auto">
          {/* 프로필 영역 */}
          <div className="flex flex-col">
            <div className="relative flex flex-col items-center justify-evenly pt-8 pb-11 bg-neutral-100 md:py-12 md:mt-4 sm:mt-8 md:flex-row gap-y-5">
              <div className="text-lg md:text-xl tracking-wide text-center basis-50">
                <span>{user.name}</span>님, 반갑습니다.
              </div>
              <div className="flex items-center justify-between basis-2/5 min-w-80 md:border-x border-neutral-300">
                <ProfileInfo className="border-r border-neutral-300">
                  주문
                  <span className="pl-3 pr-1 text-xl md:text-2xl">
                    {orderData?.length}
                  </span>
                  건
                </ProfileInfo>
                <ProfileInfo>
                  찜
                  <span className="pl-3 pr-1 text-xl md:text-2xl">
                    {data?.length}
                  </span>
                  건
                </ProfileInfo>
              </div>
              <Link
                to="/user/signin"
                onClick={handleLogout}
                className="absolute md:text-base text-sm md:leading-none leading-none border-b border-neutral-700 bottom-3 right-4 "
              >
                로그아웃
              </Link>
            </div>
          </div>

          {/* 주문내역, 찜 리스트, 회원정보수정 영역 */}
          <div className="flex flex-col gap-x-16 md:flex-row">
            {/* 주문내역, 찜 리스트, 회원정보수정 카테고리 */}
            <ul className="sticky z-40 top-[68px] sm:top-16 md:ml-4 md:text-lg md:py-8 py-4 flex md:flex-col items-start justify-around gap-2 shrink-0 text-base h-max bg-white">
              <button
                className={`${category === "orderList" ? "border-b-2 border-neutral-800 font-semibold" : ""}`}
                onClick={() => setCategory("orderList")}
              >
                주문 내역
              </button>
              <button
                className={`${category === "wishList" ? "border-b-2 border-neutral-800 font-semibold" : ""}`}
                onClick={() => setCategory("wishList")}
              >
                찜 리스트
              </button>
              <button
                className={`${category === "review" ? "border-b-2 border-neutral-800 font-semibold" : ""}`}
                onClick={() => setCategory("review")}
              >
                나의 리뷰
              </button>
              <button
                className={`${category === "editProfile" ? "border-b-2 border-neutral-800 font-semibold" : ""}`}
                onClick={() => setCategory("editProfile")}
              >
                회원 정보 수정
              </button>
            </ul>

            {/* 주문 내역 */}
            <div
              className={`flex-1 md:pt-5 pt-0 pb-6 ${category === "orderList" ? "" : "hidden"}`}
            >
              {orderProducts.length ? (
                <div className="px-4">
                  {orderProducts.map(e => (
                    <OrderProduct
                      key={e.id}
                      orderProducts={e}
                      onReviewComplete={refreshOrderData}
                    />
                  ))}
                </div>
              ) : (
                <EmptyList>
                  <FaRegClipboard size={56} />
                  <p>주문 내역이 없습니다.</p>
                </EmptyList>
              )}
            </div>

            {/* 찜 리스트 */}
            <div
              className={`flex-1 md:pt-5 pt-0 pb-6 ${category === "wishList" ? "" : "hidden"}`}
            >
              <div className="pt-5 px-4">
                {product.length ? (
                  <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 sm:grid-cols-3 justify-center">
                    {product.map(e => (
                      <Product key={String(e.id)} product={e} />
                    ))}
                  </div>
                ) : (
                  <EmptyList>
                    <FaRegHeart size={56} />
                    <p>찜 리스트가 없습니다.</p>
                  </EmptyList>
                )}
              </div>
            </div>

            {/* 리뷰 */}
            <div
              className={`flex-1 md:pt-5 pt-0 pb-6 ${category === "review" ? "" : "hidden"}`}
            >
              <div className="pt-5 px-4">
                <div className="flex gap-x-2 items-center pb-4 mb-4 border-b last:border-b-0">
                  <div className="max-w-32 shrink-0">
                    <img
                      src="/images/review_img.png"
                      alt="자동차 햄스터 키링 리뷰 이미지"
                    />
                  </div>
                  <div className="mr-auto">
                    {/* 상품명 */}
                    <p className="text-sm font-semibold text-neutral-700 mb-1">
                      차냐 자동차 햄스터 키링
                    </p>
                    {/* 작성 일자 */}
                    <p className="text-sm font-medium text-neutral-500 mb-0.5">
                      작성일자 2025.04.22
                    </p>
                    {/* 별점 */}
                    <div className="flex gap-x-1 mb-0.5">
                      <div className="flex">
                        <IoStar size="18" className="text-amber-400" />
                        <IoStar size="18" className="text-amber-400" />
                        <IoStar size="18" className="text-amber-400" />
                        <IoStar size="18" className="text-amber-400" />
                        <IoStar size="18" className="text-neutral-300" />
                      </div>
                      <p className="text-sm">4</p>
                    </div>
                    {/* 리뷰 내용 */}
                    <p className="leading-snug text-sm md:text-base">
                      귀여워요
                    </p>
                  </div>
                  {/* 수정, 삭제 버튼 영역 */}
                  <div className="flex flex-col justify-center gap-y-1.5 text-sm shrink-0">
                    <button className="border border-neutral-300 hover:border-neutral-400 px-4 py-1.5 rounded ">
                      리뷰수정
                    </button>
                    <button className="border border-neutral-300 hover:border-neutral-400 px-4 py-1.5 rounded">
                      리뷰보기
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 회원 정보 수정 */}
            <div
              className={`w-full md:pt-5 pt-0 px-4 pb-6 flex flex-col md:text-base text-sm ${category === "editProfile" ? "" : "hidden"}`}
            >
              <form className="pt-5 mb-8">
                {/* 기본 정보 */}
                <StyledFormContainer>
                  <InfoTitle>기본 정보</InfoTitle>
                  <StyledGridContainer>
                    <InputField
                      id="name"
                      label="이름"
                      defaultValue={userData.name}
                      register={registerBasic("name", {
                        required: "이름은 비워둘 수 없습니다.",
                      })}
                      errorMsg={basicErrors.name?.message}
                    />
                    <InputField
                      id="phone"
                      label="휴대폰 번호"
                      defaultValue={userData.phone}
                      register={registerBasic("phone", {
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "숫자만 입력해주세요.",
                        },
                      })}
                      errorMsg={basicErrors.phone?.message}
                    />
                  </StyledGridContainer>
                </StyledFormContainer>
              </form>

              {/* 배송지 정보 */}
              <StyledFormContainer>
                <InfoTitle>배송지 정보</InfoTitle>
                <div className="flex flex-col gap-y-3">
                  <>
                    <p className="text-sm text-red-500">{addAddressMsg}</p>
                    {addressData.length > 0 &&
                      addressData
                        ?.slice()
                        .reverse()
                        .map(e => (
                          <Address
                            key={e.id}
                            address={e}
                            onDelete={() => deleteAddress(e.id)}
                          />
                        ))}
                  </>
                </div>
                <button
                  className="border py-2 rounded-md"
                  onClick={() => setIsModalOpen(true)}
                >
                  배송지 추가
                </button>
              </StyledFormContainer>
              <button
                className="px-3 py-2 rounded-md bg-secondary-base hover:bg-secondary-dark mt-3"
                onClick={handleBasicSubmit(addBasic)}
              >
                수정 완료
              </button>
            </div>
          </div>
        </div>
      )}
      <CartModal />
      {isModalOpen && (
        <AddAddressModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          address={addressData}
          setAddress={setAddressData}
        />
      )}
    </div>
  );
}

const ProfileInfo = tw.div`
  flex-1 flex items-center justify-center
  py-3 text-center
`;

const EmptyList = tw.div`
  flex flex-col items-center px-2 py-32 gap-y-4
`;

const InfoTitle = tw.p`
  pb-2 text-base md:text-lg md:font-semibold border-b border-neutral-300
`;

const StyledFormContainer = tw.div`
  flex flex-col gap-y-3 pb-3
`;

const StyledGridContainer = tw.div`
  grid grid-cols-[88px_minmax(200px,300px)] gap-y-3 items-center pt-3
`;
