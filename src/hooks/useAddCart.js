import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";

export const useAddCart = setIsCartModalOpen => {
  const axios = useAxiosInstance();

  const addCart = useMutation({
    mutationFn: products => axios.post("/carts", products),
    onSuccess: () => {
      setIsCartModalOpen(true);
    },
    onError: err => {
      console.log(err);
    },
  });

  return { addCart };
};
