import PropTypes from "prop-types";

export default function OrderDetail({ product }) {
  return (
    <>
      <div className="flex items-center gap-x-5">
        <img
          className="w-24 rounded-md "
          src={`https://11.fesp.shop/${product.image.path}`}
          alt={product.name}
        />
        <ul className="">
          <li>{product.name}</li>
          <li>{product.quantity}개</li>
          <li className="pt-5 font-medium">
            {product.price.toLocaleString()}원
          </li>
        </ul>
      </div>
    </>
  );
}

OrderDetail.propTypes = {
  product: PropTypes.shape().isRequired,
};
