import useAxiosInstance from "@hooks/useAxiosInstance";
import { useOrder } from "@hooks/useOrder";
import { useQuery } from "@tanstack/react-query";
import useAddressModalState from "@zustand/AddressModalState";
import useCounterState from "@zustand/counter";
import useUserStore from "@zustand/userStore";
import { useParams } from "react-router-dom";

export const useAddress = () => {
  const axios = useAxiosInstance();

  // 주소 선택 모달 상태 변경
  const handleModal = useAddressModalState(state => state.handleModal);

  // 로그인한 회원 데이터
  // const user = JSON.parse(sessionStorage.getItem("user")).state.user;

  const user = useUserStore(state => state.user);

  // 로그인한 회원 아이디
  const user_id = user?._id;

  // 회원 정보 조회
  const { data } = useQuery({
    queryKey: ["user", user_id],
    queryFn: () => axios.get(`users/${user_id}`),
    select: res => res.data.item,
    enabled: !!user_id,
  });

  const addressBook = data && data.extra && data.extra.addressBook;

  // 상품 구매 훅
  const { orderProduct } = useOrder();

  // 상품 수량
  const { count } = useCounterState();

  // 상품 아이디
  const { _id } = useParams();

  // 구매 상품
  const orderInfo = {
    products: [{ _id: Number(_id), quantity: count }],
  };

  // 주소 추가 후 상품 구매
  const mutateCallback = address => {
    orderInfo.address = address.address;
    orderProduct.mutate(orderInfo);
  };

  return {
    user_id,
    addressBook,
    handleModal,
    mutateCallback,
  };
};
