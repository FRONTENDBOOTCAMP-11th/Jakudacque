import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";

export const useReview = () => {
  const axios = useAxiosInstance();

  // 개별 파일 업로드
  const uploadFile = useMutation({
    mutationFn: file => {
      return axios.post("/files/", file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 1000 * 30,
      });
    },
    onSuccess: () => {
      console.log("파일 업로드 성공");
    },
    onError: err => {
      console.log("파일 업로드 에러", err);
    },
  });

  // 리뷰 등록
  const registerReview = useMutation({
    mutationFn: data => axios.post("/replies/", data),
    onSuccess: () => {
      console.log("리뷰 등록 완료");
    },
    onError: err => {
      console.log("리뷰 등록 에러:", err);
    },
  });

  // 파일 업로드 후 리뷰 등록하는 함수(순차 처리)
  const uploadFileAndRegisterReview = async (files, reviewData) => {
    try {
      // 파일 업로드
      const uploadResponse = await uploadFile.mutateAsync(files);

      // 파일 업로드 응답 데이터 구조에서 업로드된 파일 경로 가져오기
      const filePathArr = uploadResponse.data.item.map(item => item.path);

      // 업로드한 파일 경로 추가된 리뷰 데이터 객체 생성
      const fullReviewData = {
        ...reviewData,
        extra: {
          image: filePathArr,
        },
      };

      // 리뷰 등록
      await registerReview.mutateAsync(fullReviewData);
    } catch (err) {
      console.error("파일 업로드 또는 리뷰 등록 중 에러:", err);
    }
  };

  return uploadFileAndRegisterReview;
};
