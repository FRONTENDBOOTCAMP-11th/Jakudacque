import { useHandleWish } from "@hooks/useHandleWish";
import useWishState from "@zustand/wishState";
import PropTypes from "prop-types";
import { IoCartOutline, IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Product({ product }) {
  const { refetchWish } = useHandleWish(product.id);

  // 찜 상태 조회하는 함수
  const isWished = useWishState(state => state.isWished);

  return (
    <Link to={`/list/${product.id}`} className="relative px-1 mx-auto">
      <img
        src={product.image}
        alt={product.name}
        className="min-w-40 min-h-40 object-cover rounded-lg my-2 lg:w-72 lg:h-72 hover:scale-105 transition-transform duration-300"
      />
      <div className="flex flex-col pb-3 px-1">
        <p className="text-sm font-medium">{product.name}</p>
        <div className="flex items-center">
          <p className="text-sm font-medium">{product.price}</p>
          <span className="ml-1">원</span>
        </div>
      </div>
      <div className="flex gap-2 px-1 mb-3">
        <IoCartOutline size={20} />
        <button onClick={refetchWish}>
          {isWished(product.id) ? (
            <IoHeartSharp size={20} />
          ) : (
            <IoHeartOutline size={20} />
          )}
        </button>
      </div>
    </Link>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    // link: PropTypes.string.isRequired,
  }).isRequired,
};
