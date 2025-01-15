import PropTypes from "prop-types";

export default function Address({ address, onDelete }) {
  return (
    <div className="bg-[#f8f8f8] flex justify-between gap-x-3 p-4 items-center">
      <div className="flex flex-col gap-y-1">
        <p className="text-[14px] max-[700px]:text-[12px]">{address.name}</p>
        <p>{address.value}</p>
      </div>
      <button
        className="text-[14px] border border-[#aaa] px-3 py-1 rounded-[4px] bg-white flex-shrink-0 hover:border-[#555]"
        onClick={onDelete}
      >
        삭제
      </button>
    </div>
  );
}

Address.propTypes = {
  address: PropTypes.shape().isRequired,
  onDelete: PropTypes.func.isRequired,
};
