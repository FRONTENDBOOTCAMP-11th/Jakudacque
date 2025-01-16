import OrderDetail from "@components/OrderDetail";
import PropTypes from "prop-types";

export default function OrderProduct({ orderProducts }) {
  return (
    <div className="flex flex-col gap-y-4 max-w-[1120px] py-5 border-b border-neutral-300 max-[700px]:px-2">
      <p>{orderProducts.date}</p>
      {orderProducts.products ? (
        <>
          {orderProducts.products.map((e, index) => (
            <OrderDetail key={index} product={e} />
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

OrderProduct.propTypes = {
  orderProducts: PropTypes.shape(
    {
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      products: PropTypes.array.isRequired,
    }.isRequired,
  ),
};
