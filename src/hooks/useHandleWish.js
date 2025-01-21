import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import useWishState from "@zustand/wishState";

export const useHandleWish = _id => {
  // 찜 상태 변경
  const toggleWish = useWishState(state => state.toggleWish);

  // 찜 상태 조회
  const isWished = useWishState(state => state.isWished);

  // 찜 상태 불러오기
  const restoreWishState = useWishState(state => state.restoreWishState);

  const axios = useAxiosInstance();

  // 상품 찜 한 건 조회
  const { refetch } = useQuery({
    queryKey: ["bookmarks", _id],
    queryFn: async () => {
      const res = await axios.get(`bookmarks/product/${_id}`);
      return res.data.item;
    },
    enabled: false,
    onSuccess: data => {
      console.log("조회 성공:", data);
    },
    onError: err => {
      console.log("에러", err);
    },
  });

  // 상품 찜 목록 조회
  const { refetch: refetchAll } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      const res = await axios.get(`bookmarks/product`);
      return res.data.item;
    },
    enabled: false,
    onSuccess: data => {
      console.log("조회 성공:", data);
    },
    onError: err => {
      console.log("에러", err);
    },
  });

  // 상품 찜하기
  const registerWish = useMutation({
    mutationFn: products => axios.post(`/bookmarks/product/`, products),
    onSuccess: () => {
      toggleWish(_id);
    },
    onError: err => {
      console.log(err);
    },
  });

  // 상품 찜 취소하기
  const removeWish = useMutation({
    mutationFn: _id => axios.delete(`/bookmarks/${Number(_id)}`),
    onSuccess: () => {
      toggleWish(_id);
    },
    onError: err => {
      console.log(err);
    },
  });

  // 전역 찜 상태 조회 결과에 따라 찜 등록/취소 함수 실행
  const refetchCallbacks = async () => {
    if (isWished(_id)) {
      try {
        const result = await refetch();
        await removeWish.mutateAsync(result.data._id);
      } catch (err) {
        console.err(err);
        throw err;
      }
    } else if (!isWished(_id)) {
      try {
        await registerWish.mutateAsync({ target_id: Number(_id) });
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  };

  // (로그인 시 회원의) 상품 찜 목록 조회하여 상태로 불러옴
  const refetchAllCallbacks = async () => {
    const result = await refetchAll();
    const arr = result.data.map(e => e.product._id);
    restoreWishState(arr);
  };

  return {
    isWished,
    refetchWish: refetchCallbacks,
    refetchAll: refetchAllCallbacks,
  };
};
