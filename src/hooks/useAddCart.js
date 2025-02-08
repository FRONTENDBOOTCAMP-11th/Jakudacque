import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";

export const useAddCart = () => {
  const axios = useAxiosInstance();

  const addCart = useMutation({
    mutationFn: products => axios.post("/carts", products),
    onSuccess: () => {},
    onError: err => {
      console.log(err);
    },
  });

  return { addCart };
};
