import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import useModalState from "@zustand/modalState";

export const useAddCart = () => {
  const axios = useAxiosInstance();

  // 장바구니 모달 상태 변경
  const handleModal = useModalState(state => state.handleModal);

  const addCart = useMutation({
    mutationFn: products => axios.post("/carts", products),
    onSuccess: () => {
      handleModal();
    },
    onError: err => {
      console.log(err);
    },
  });

  return { addCart };
};
