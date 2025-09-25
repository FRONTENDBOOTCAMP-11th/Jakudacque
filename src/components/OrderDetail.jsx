import WriteReviewModal from "@components/WriteReviewModal";
import PropTypes from "prop-types";
import { useState } from "react";

export default function OrderDetail({ product, ordererId, onReviewComplete }) {
  // 리뷰 작성 모달 상태
  const [isWriteReviewModalOpen, setIsWriteReviewModalOpen] = useState(false);

  const handleWriteReview = () => {
    setIsWriteReviewModalOpen(true);
  };

  return (
    <>
      <div className="flex items-center gap-x-5">
        <img
          className="w-24 rounded-md "
          src={product.image.path}
          alt={product.name}
        />
        <ul>
          <li>{product.name}</li>
          <li>{product.quantity}개</li>
          <li className="pt-5 font-medium">
            {product.price.toLocaleString()}원
          </li>
        </ul>
        {!product.review_id && (
          <button
            className="ml-auto mt-auto border px-2 py-1.5 rounded text-sm border-neutral-300 hover:border-neutral-400"
            onClick={handleWriteReview}
          >
            리뷰 작성
          </button>
        )}
      </div>
      <WriteReviewModal
        isWriteReviewModalOpen={isWriteReviewModalOpen}
        setIsWriteReviewModalOpen={setIsWriteReviewModalOpen}
        product={product}
        ordererId={ordererId}
        onReviewComplete={onReviewComplete}
      />
    </>
  );
}

OrderDetail.propTypes = {
  product: PropTypes.shape().isRequired,
  ordererId: PropTypes.number.isRequired,
  onReviewComplete: PropTypes.func.isRequired,
};
