import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useOrder = () => {
  const axios = useAxiosInstance();
  const orderProduct = useMutation({
    mutationFn: products => axios.post("/orders", products),
    onSuccess: () => {
      toast("주문이 완료되었습니다!");
    },
    onError: err => {
      toast.error(err.message);
      console.log(err);
    },
  });

  return { orderProduct };
};
