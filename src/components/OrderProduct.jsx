import OrderDetail from "@components/OrderDetail";
import PropTypes from "prop-types";

export default function OrderProduct({ orderProducts }) {
  return (
    <div className="flex flex-col py-5 border-b last:border-none gap-y-4 border-neutral-300 md:px-0">
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
