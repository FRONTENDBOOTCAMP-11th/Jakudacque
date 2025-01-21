import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCartCleanUp = () => {
  const axios = useAxiosInstance();
  const queryClient = useQueryClient();

  // 장바구니 비우기
  const cleanupProduct = useMutation({
    mutationFn: products => axios.delete("/carts/cleanup", products),
    onError: err => {
      toast.error(err.message);
      console.log(err);
    },
  });

  // 장바구니 상품 삭제(한건)
  const deleteItem = useMutation({
    mutationFn: async _id => {
      await axios.delete(`/carts/${_id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
  });

  // 장바구니 상품 여러건 삭제
  const deleteItems = useMutation({
    mutationFn: async ({ carts }) => {
      await axios.delete(`/carts/`, {
        data: {
          carts,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
  });

  return { cleanupProduct, deleteItem, deleteItems };
};
