import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useOrder = () => {
  const axios = useAxiosInstance();
  const navigate = useNavigate();

  const orderProduct = useMutation({
    mutationFn: products => axios.post("/orders", products),
    onSuccess: () => {
      toast("주문이 완료되었습니다!");
      navigate("/user/mypage?category=orderList");
    },
    onError: err => {
      toast.error(err.message);
      console.log(err);
    },
  });

  return { orderProduct };
};
