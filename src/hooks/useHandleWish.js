import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";

export const useHandleWish = () => {
  const axios = useAxiosInstance();

  // 상품 찜 등록
  const registerWish = useMutation({
    mutationFn: products => axios.post(`/bookmarks/product/`, products),
    onSuccess: () => {},
    onError: err => {
      console.log(err);
    },
  });

  // 상품 찜 취소
  const removeWish = useMutation({
    mutationFn: _id => axios.delete(`/bookmarks/${Number(_id)}`),
    onSuccess: () => {},
    onError: err => {
      console.log(err);
    },
  });

  // 전역 찜 상태 조회 결과에 따라 찜 등록/취소 함수 실행
  const refetchCallbacks = async (id, bookmarkId) => {
    if (bookmarkId) {
      try {
        await removeWish.mutateAsync(bookmarkId);
      } catch (err) {
        console.err(err);
        throw err;
      }
    } else {
      try {
        await registerWish.mutateAsync({ target_id: Number(id) });
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  };

  return {
    refetchWish: refetchCallbacks,
  };
};
