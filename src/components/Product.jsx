import CartModal from "@components/CartModal";
import { useAddCart } from "@hooks/useAddCart";
import { useHandleWish } from "@hooks/useHandleWish";
import useWishState from "@zustand/wishState";
import PropTypes from "prop-types";
import { useState } from "react";
import { IoCartOutline, IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Product({ product, setIsCartModalOpen }) {
  const { refetchWish } = useHandleWish(product.id);

  // 전역 찜 상태 조회
  const isWished = useWishState(state => state.isWished);

  // 로컬 찜 상태
  const [localWish, setLocalWish] = useState(isWished(product.id));

  const wishHandle = async () => {
    setLocalWish(localWish => !localWish); // 로컬 찜 상태 변경
    try {
      await refetchWish(); // 전역 상태 변경 및 서버 동기화 처리(비동기)
    } catch (err) {
      console.log("찜 등록/취소 실패", err);
      setLocalWish(localWish => !localWish); // 로컬 찜 상태 원복
    }
  };

  // 장바구니 추가
  const { addCart } = useAddCart();

  // 장바구니에 상품 추가
  const handleAddCart = () => {
    addCart.mutate({ product_id: Number(product.id), quantity: 1 });
    setIsCartModalOpen(true);
  };

  return (
    <>
      <div className="px-1">
        <Link to={`/list/${product.id}`} className="relative block mx-auto">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover my-2 transition-transform duration-300 rounded-lg min-w-40 min-h-40 lg:w-72 lg:h-72 hover:scale-105"
          />
          <div className="flex flex-col px-1 pb-3">
            <p className="text-sm">{product.name}</p>
            <div className="flex items-center text-sm">
              <p className="font-medium">{product.price.toLocaleString()}원</p>
            </div>
          </div>
        </Link>
        <div className="flex gap-2 px-1 mb-3">
          <button onClick={handleAddCart}>
            <IoCartOutline size={20} />
          </button>
          <button onClick={wishHandle}>
            {localWish ? (
              <IoHeartSharp size={20} className="text-primary-dark" />
            ) : (
              <IoHeartOutline size={20} className="text-primary-dark" />
            )}
          </button>
        </div>
      </div>
      <CartModal setIsCartModalOpen={setIsCartModalOpen} />
    </>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  setIsCartModalOpen: PropTypes.func,
};
