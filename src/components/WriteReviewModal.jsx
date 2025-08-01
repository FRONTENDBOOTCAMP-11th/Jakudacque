import PropTypes from "prop-types";
import { useState } from "react";
import { IoStar } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { IoAddSharp } from "react-icons/io5";
import tw from "tailwind-styled-components";

export default function WriteReviewModal({
  isWriteReviewModalOpen,
  setIsWriteReviewModalOpen,
  product,
}) {
  const closeReviewModal = () => {
    setIsWriteReviewModalOpen(false);
  };

  const [score, setScore] = useState([false, false, false, false, false]);

  const printRating = () => {
    let result = [];
    for (let i = 0; i < 5; i++) {
      result.push(
        <IoStar
          key={i}
          size="24"
          className={score[i] ? "text-yellow-400" : ""}
          onClick={() => setRating(i)}
        />,
      );
    }
    return result;
  };

  const setRating = val => {
    let newScore = [...score];
    for (let i = 0; i < 5; i++) {
      if (i <= val) {
        newScore[i] = true;
      } else {
        newScore[i] = false;
      }
    }
    console.log(`별점: ${val + 1}`);
    setScore(newScore);
  };

  const [previewImg, setPreviewImg] = useState([]);

  const handleAddImages = event => {
    const imgLists = event.target.files;
    let imgUrlArr = [...previewImg];
    for (let i = 0; i < imgLists.length; i++) {
      const relativeUrl = URL.createObjectURL(imgLists[i]); // 상대경로 생성
      imgUrlArr.push(relativeUrl);
    }
    setPreviewImg(imgUrlArr);
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
            <button className="absolute right-1 top-1 bg-black/20 rounded-full">
              <IoCloseOutline size={16} />
            </button>
          </div>
        );
      });
    }
    return newPreview;
  };

  return (
    isWriteReviewModalOpen && (
      <Container>
        <ModalWindow>
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
                src={`https://fesp-api.koyeb.app/market/${product.image.path}`}
                alt={product.name}
              />
              <p>{product.name}</p>
            </div>
            {/* 별점 */}
            <div className="flex gap-x-4 items-center border-b py-3 divide-dashed">
              <h2 className="font-semibold pt-0.5">상품은 어떠셨나요?</h2>
              <div className="flex gap-x-0.5 text-neutral-300">
                {printRating()}
              </div>
            </div>
            {/* 리뷰 작성 */}
            <div className="py-3 flex flex-col gap-y-2">
              <h2 className="font-semibold">리뷰를 작성해주세요.</h2>
              <textarea
                name="review"
                id="review"
                className="px-3 py-2 border-neutral-300 rounded border w-full h-40 resize-none focus:outline-none"
              ></textarea>
            </div>
            {/* 사진 등록 */}
            <div className="flex flex-col gap-y-1.5">
              <h2 className="font-semibold">사진 첨부</h2>
              <div className="flex overflow-x-auto gap-x-2 ">
                <div className="flex">{printPreviewImg()}</div>
                <label
                  htmlFor="reviewImg"
                  className="flex z-10 shrink-0"
                  onChange={handleAddImages}
                >
                  <div className="flex flex-col items-center gap-y-1 cursor-pointer border w-fit px-8 pt-8 rounded   border-neutral-300 hover:border-neutral-400 h-28 bg-white">
                    <IoAddSharp size={20} />
                    <p className="text-xs">0/10</p>
                  </div>
                  <input
                    type="file"
                    id="reviewImg"
                    multiple
                    accept="images/*"
                    className="hidden"
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
            <button className="border py-2 rounded text-sm text-center cursor-pointer grow basis-0 bg-secondary-base border-secondary-base hover:bg-secondary-dark">
              리뷰 등록하기
            </button>
          </ModalBtnArea>
        </ModalWindow>
      </Container>
    )
  );
}

WriteReviewModal.propTypes = {
  isWriteReviewModalOpen: PropTypes.bool,
  setIsWriteReviewModalOpen: PropTypes.func,
  product: PropTypes.object,
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
