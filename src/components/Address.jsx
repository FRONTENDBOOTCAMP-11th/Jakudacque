import PropTypes from "prop-types";

export default function Address({ address, onDelete }) {
  return (
    <div className="flex items-center justify-between p-4 text-xs bg-neutral-100 gap-x-2 sm:text-sm">
      <div className="flex flex-col gap-y-1">
        <p>{address.name}</p>
        <p>{address.value}</p>
      </div>
      <button
        className="px-3 py-1 bg-white border rounded border-neutral-400 hover:border-neutral-600"
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
