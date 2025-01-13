import { formatPrice } from "@utils/formatPrice";
import PropTypes from "prop-types";

export default function OrderDetail({ product }) {
  return (
    <>
      <div className="flex items-center gap-x-5">
        <img
          className="w-[100px] rounded-md"
          src={`https://11.fesp.shop/${product.image.path}`}
          alt={product.name}
        />
        <ul className="text-[16px]">
          <li>{product.name}</li>
          <li>{product.quantity}개</li>
          <li className="pt-5 font-medium">{formatPrice(product.price)}원</li>
        </ul>
      </div>
    </>
  );
}

OrderDetail.propTypes = {
  product: PropTypes.shape().isRequired,
};
