import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCartCleanUp = () => {
  const axios = useAxiosInstance();

  const cleanupProduct = useMutation({
    mutationFn: products => axios.delete("/carts/cleanup", products),
    onError: err => {
      toast.error(err.message);
      console.log(err);
    },
  });

  return { cleanupProduct };
};
