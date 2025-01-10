import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";

export const useAddCart = () => {
  const axios = useAxiosInstance();

  const addCart = useMutation({
    mutationFn: products => axios.post("/carts", products),
    onSuccess: () => {
      console.log("장바구니 담기 완료");
    },
    onError: err => {
      console.log(err);
    },
  });

  return { addCart };
};
