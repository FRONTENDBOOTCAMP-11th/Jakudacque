import PropTypes from "prop-types";

export default function Address({ address, onDelete }) {
  return (
    <div className="flex items-center justify-between p-4 bg-neutral-100 gap-x-3">
      <div className="flex flex-col gap-y-1">
        <p className="text-sm max-[700px]:text-xs">{address.name}</p>
        <p>{address.value}</p>
      </div>
      <button
        className="text-sm border border-neutral-400 px-3 py-1 rounded-[4px] bg-white flex-shrink-0 hover:border-neutral-600"
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
