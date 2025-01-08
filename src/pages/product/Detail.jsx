import Spinner from "@components/Spinner";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import useCounterState from "@zustand/counter";
import useWishState from "@zustand/wishState";
import { IoAdd } from "react-icons/io5";
import { IoRemove } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Detail() {
  // 임시 토큰
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjExLCJ0eXBlIjoidXNlciIsIm5hbWUiOiLqsJXsiJjsoJUiLCJlbWFpbCI6InNqa2FuZ0BqYWt1ZGFjcXVlLmNvbSIsImltYWdlIjoiL2ZpbGVzLzAwLXNhbXBsZS9wcm9maWxlLmpwZyIsImxvZ2luVHlwZSI6ImVtYWlsIiwiaWF0IjoxNzM2MjMyMTYxLCJleHAiOjE3MzYzMTg1NjEsImlzcyI6IkZFU1AifQ.AMJqi0DTCx2YB1Se0ALWxXiR7g90Peq4i1fZav2TYR4";

  const { _id } = useParams();

  const axios = useAxiosInstance();

  // 상품 상세 조회
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products", _id],
    queryFn: () => axios.get(`/products/${_id}`),
    select: res => res.data.item,
  });

  // 상품 수량
  const { count } = useCounterState();

  // 상품 수량 변경
  const countUp = useCounterState(state => state.countUp);
  const countDown = useCounterState(state => state.countDown);

  // 화폐 단위 표시된 가격으로 변경
  const changeNotation = price => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  // 상품 가격(수량 변경시 함께 변경)
  const productPrice = data && changeNotation(data.price * count);

  // 상품 구매
  const orderProduct = useMutation({
    mutationFn: products =>
      axios.post("/orders", products, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    onSuccess: () => {
      toast("주문이 완료되었습니다!");
      refetch();
    },
    onError: err => {
      toast.error(err.message);
      console.log(err);
    },
  });

  // 찜
  const { wish } = useWishState();

  const handleWish = useWishState(state => state.handleWish);

  // 상품 찜 한 건 조회
  const { data: wishData } = useQuery({
    queryKey: ["product", _id],
    queryFn: () =>
      axios.get(`bookmarks/product/${_id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    select: res => res.data.item,
    enabled: wish,
  });

  // 상품 찜하기
  const registerWish = useMutation({
    mutationFn: products =>
      axios.post(`/bookmarks/product/`, products, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    onSuccess: () => {
      toast("상품 찜이 완료되었습니다");
      refetch();
    },
    onError: err => {
      toast.error(err.message);
      console.log(err);
    },
  });

  // 상품 찜 취소하기
  const removeWish = useMutation({
    mutationFn: () =>
      axios.delete(`/bookmarks/${Number(wishData?._id)}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    onSuccess: () => {
      toast("상품 찜이 취소되었습니다");
      refetch();
    },
    onError: err => {
      toast.error(err.message);
      console.log(err);
    },
  });

  const handleToggleWish = () => {
    wish
      ? removeWish.mutate()
      : registerWish.mutate({ target_id: Number(_id) });
    handleWish();
  };

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
              <div className="border-b border-[#e9e9e9] pb-5 max-[900px]:pb-2 max-[900px]:pt-2">
                <h1 className="text-[22px] max-[900px]:text-[16px] pt-2 pb-1 max-[900px]:py-0 max-[700px]:text-[18px] ">
                  {data.name}
                </h1>
                <h2 className="text-[20px] max-[900px]:text-[16px] max-[425px]:text-[1rem]">
                  {changeNotation(data.price)}원
                </h2>
              </div>
              <ul className="text-[14px] max-[900px]:text-[12px] max-[425px]:text-[12px]">
                <li className="flex gap-x-1.5">
                  <span className="font-semibold">배송 방법</span>
                  <span>택배</span>
                </li>
                <li className="flex gap-x-1.5">
                  <span className="font-semibold">배송비</span>
                  <span>
                    {changeNotation(data.shippingFees)}원(30,000원 이상
                    무료배송)
                  </span>
                </li>
              </ul>
              <div className="text-[15px] max-[900px]:text-[14px] max-[425px]:text-[14px] bg-[#f7f7f7] py-[14px] max-[900px]:py-[10px] px-4">
                <p className="border-b border-[#e9e9e9] border-dashed pb-2.5 max-[900px]:pb-1.5 mb-4 max-[900px]:mb-3">
                  수량
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <button
                      className="border-[#aaa] border-y border-l px-2 max-[768px]:px-1.5"
                      onClick={() => countDown(1)}
                    >
                      <IoRemove />
                    </button>
                    <span className="border-[#aaa] border px-4 py-1.5 max-[768px]:px-3 max-[768px]:py-1">
                      {count}
                    </span>
                    <button
                      className="border-[#aaa] border-y border-r px-2 max-[768px]:px-1.5"
                      onClick={() => countUp(1)}
                    >
                      <IoAdd />
                    </button>
                  </div>
                  <span>{productPrice}원</span>
                </div>
              </div>
              <div className="flex justify-between items-center my-2 max-[900px]:my-1">
                <span className="text-[16px] max-[900px]:text-[15px] max-[425px]:text-[14px]">
                  총 상품금액(1개)
                </span>
                <span className="text-[24px] max-[900px]:text-[22px] max-[425px]:text-[20px]">
                  {productPrice}원
                </span>
              </div>
              <div className="flex gap-x-2 max-[900px]:text-[15px]">
                <button
                  className="grow basis-[198px] py-3 max-[900px]:py-2 border border-[#ddd] rounded hover:border-[#999] hover:bg-secondary-base flex justify-center items-center"
                  onClick={() =>
                    orderProduct.mutate({
                      products: [{ _id: Number(_id), quantity: count }],
                    })
                  }
                >
                  구매하기
                </button>
                <button className="grow basis-[198px] border border-[#ddd] rounded hover:border-[#999] flex justify-center items-center">
                  장바구니
                </button>
                <button
                  className="grow basis-[100px] border border-[#ddd] rounded hover:border-[#999] flex justify-center items-center"
                  onClick={handleToggleWish}
                >
                  {wish ? <IoHeartSharp /> : <IoHeartOutline />}찜
                </button>
              </div>
            </div>
          </div>
          {/* 상품 디테일 컷 파트 시작 */}
          <div className="border-y border-[#eee] bg-[#fcfcfc] text-center py-1.5 mt-[40px]">
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
    </div>
  );
}
