import PropTypes from "prop-types";
import { useState } from "react";
import { IoStar } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { IoAddSharp } from "react-icons/io5";
import tw from "tailwind-styled-components";
import { useReview } from "@hooks/useReview";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function WriteReviewModal({
  isWriteReviewModalOpen,
  setIsWriteReviewModalOpen,
  product,
  ordererId,
  onReviewComplete,
}) {
  const closeReviewModal = () => {
    setIsWriteReviewModalOpen(false);
  };

  const [rating, setRating] = useState(0);
  const [previewImg, setPreviewImg] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const uploadFileAndRegisterReview = useReview();

  const onSubmit = async data => {
    closeReviewModal(); // 리뷰 작성 모달 닫기
    try {
      const formData = new FormData();

      imgFiles.forEach(file => {
        formData.append("attach", file);
      });

      const uploadPromise = uploadFileAndRegisterReview(formData, {
        order_id: ordererId,
        product_id: product._id,
        rating: data.rating,
        content: data.content,
      });

      await toast.promise(uploadPromise, {
        pending: "리뷰 업로드 중...",
        success: "리뷰가 등록되었습니다!",
        error: "리뷰 등록에 실패했습니다. 잠시 후 다시 시도해주세요.",
      });

      onReviewComplete(); // 리뷰 작성 완료에 따라 주문 내역 쿼리 무효화
    } catch (err) {
      console.log(err);
    }
  };

  const printStarRating = () => {
    let result = [];
    result = [1, 2, 3, 4, 5].map(e => (
      <IoStar
        key={e}
        size={`24`}
        className={`${rating >= e ? "text-yellow-400" : ""}`}
        onClick={() => handleRating(e)}
      />
    ));
    return result;
  };

  const handleRating = value => {
    setRating(value);
    setValue("rating", value, { shouldValidate: true });
  };

  // 사진 첨부 핸들링
  const handleAddImages = event => {
    // 현재 선택한 사진 파일
    const selectedFiles = Array.from(event.target.files);

    // 기존에 선택한 파일과 현재 선택한 파일의 합계가 10개 이상이면 업로드 불가
    if (imgFiles.length + selectedFiles.length > 10) {
      alert("사진은 최대 10개까지 업로드할 수 있습니다.");
      return;
    }

    // 이미지 파일 상태 업데이트(기존 선택한 파일 + 현재 선택한 파일)
    const imgArray = [...imgFiles, ...selectedFiles];
    setImgFiles(imgArray);

    // 프리뷰 이미지 상태 업데이트
    const relativeUrlArr = selectedFiles.map(
      e => URL.createObjectURL(e), // 상대경로 생성
    );
    const previewImgUrlArr = [...previewImg, ...relativeUrlArr];
    setPreviewImg(previewImgUrlArr);
  };

  const printPreviewImg = () => {
    let newPreview = [];
    if (previewImg.length > 0) {
      newPreview = previewImg.map((e, i) => {
        return (
          <div key={i} className="relative flex-shrink-0 w-28 flex">
            <img
              src={e}
              alt={`사진 첨부(${i + 1})`}
              className="object-contain"
            />
            <button
              className="absolute right-1 top-1 bg-black/20 rounded-full"
              onClick={() => removeImg(i)}
            >
              <IoCloseOutline size={16} />
            </button>
          </div>
        );
      });
    }
    return newPreview;
  };

  const removeImg = selectedIndex => {
    // 프리뷰 이미지 삭제
    const newPreviewImgArr = [...previewImg];
    const result = newPreviewImgArr.filter((e, i) => i !== selectedIndex);
    setPreviewImg(result);

    // 이미지 배열에서 삭제
    const newImgArr = [...imgFiles];
    const resultArr = newImgArr.filter((_, i) => i !== selectedIndex);
    setImgFiles(resultArr);

    console.log(`${selectedIndex + 1}번 삭제`);
  };

  return (
    isWriteReviewModalOpen && (
      <Container>
        <ModalWindow>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalMsgArea>
              <div className="flex py-2 items-center">
                <h1 className="text-lg font-semibold">리뷰 작성</h1>
                <button className="ml-auto" onClick={closeReviewModal}>
                  <IoCloseOutline size={24} color="black" />
                </button>
              </div>
              <div className="flex items-center gap-x-5 border-gray-300 border-y py-3">
                <img
                  className="w-20 rounded-md"
                  src={product.image.path}
                  alt={product.name}
                />
                <p>{product.name}</p>
              </div>
              {/* 별점 */}
              <div className="border-b pt-3 pb-2 divide-dashed">
                <div className="grid grid-cols-[160px_auto] grid-rows-1">
                  <h2 className="flex font-semibold leading-none items-center">
                    상품은 어떠셨나요? (필수)
                  </h2>
                  <div className="flex gap-x-0.5 text-neutral-300">
                    <input
                      type="hidden"
                      {...register("rating", {
                        required: "별점을 선택해주세요.",
                      })}
                    />
                    {printStarRating()}
                  </div>
                  {
                    <ErrorText className="pl-1 pt-1.5">
                      {errors.rating?.message}
                    </ErrorText>
                  }
                </div>
              </div>
              {/* 리뷰 작성 */}
              <div className="py-3 flex flex-col gap-y-2">
                <h2 className="font-semibold">리뷰를 작성해주세요 (필수)</h2>
                <textarea
                  {...register("content", {
                    required: "리뷰 내용을 입력해주세요.",
                  })}
                  className="px-3 py-3 border-neutral-300 rounded border w-full h-40 resize-none focus:outline-none"
                />
                {<ErrorText>{errors.content?.message}</ErrorText>}
              </div>
              {/* 사진 등록 */}
              <div className="flex flex-col gap-y-1.5">
                <h2 className="font-semibold">사진 첨부</h2>
                <div className="flex overflow-x-auto">
                  <div className="flex gap-x-0.5">{printPreviewImg()}</div>
                  <label htmlFor="reviewImg" className="flex z-10 shrink-0">
                    <div className="flex flex-col items-center gap-y-1 cursor-pointer border w-fit px-8 pt-8 rounded border-neutral-300 hover:border-neutral-400 bg-white ml-1 box-content min-h-20">
                      <IoAddSharp size={20} />
                      <p className="text-xs">{previewImg.length}/10</p>
                    </div>
                    <input
                      type="file"
                      id="reviewImg"
                      multiple
                      accept="images/*"
                      className="hidden"
                      onChange={handleAddImages}
                    />
                  </label>
                </div>
              </div>
            </ModalMsgArea>
            <ModalBtnArea>
              <button
                className="border py-2 rounded text-sm text-center cursor-pointer grow basis-0 border-neutral-300 hover:border-neutral-400"
                onClick={closeReviewModal}
              >
                닫기
              </button>
              <button
                className="border py-2 rounded text-sm text-center cursor-pointer grow basis-0 bg-secondary-base border-secondary-base hover:bg-secondary-dark"
                type="submit"
              >
                리뷰 등록하기
              </button>
            </ModalBtnArea>
          </form>
        </ModalWindow>
      </Container>
    )
  );
}

WriteReviewModal.propTypes = {
  isWriteReviewModalOpen: PropTypes.bool.isRequired,
  setIsWriteReviewModalOpen: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  ordererId: PropTypes.number.isRequired,
  onReviewComplete: PropTypes.func.isRequired,
};

// 전체 컨테이너
const Container = tw.div`
  fixed
  z-50
  inset-0
  bg-neutral-800/80
  flex
  justify-center
  items-center
`;

// 모달창
const ModalWindow = tw.div`
  basis-1/3
  min-w-96
  min-h-44
  bg-white
  flex
  flex-col
  px-6
  py-4
  rounded
  text-sm
  gap-y-2
`;

// 모달 메시지 영역
const ModalMsgArea = tw.div`
  mb-4
`;

// 모달 버튼 영역
const ModalBtnArea = tw.div`
  flex
  justify-center
  items-center
  w-2/3
  mx-auto
  gap-x-1.5
  text-sm
`;

const ErrorText = tw.p`
  col-start-2 text-sm text-red-500
`;
