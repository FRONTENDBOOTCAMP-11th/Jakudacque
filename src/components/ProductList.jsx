import PropTypes from 'prop-types';
import { IoCaretDown } from "react-icons/io5";
import { Link } from 'react-router-dom';

export default function ProductList({ 
  title, 
  products, 
  totalItems, 
  isOpen, 
  sortOption, 
  onSortOptionClick, 
  onToggleOpen 
}) {
  return (
    <>
      {/* 타이틀 (카테고리명 또는 검색어) */}
      <div className="mb-8">{title}</div>

      {/* 상품 카운트 및 정렬 옵션 */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-sm font-medium">
          {totalItems || "0"} ITEMS
        </div>
        <div className="relative">
          <button
            onClick={onToggleOpen}
            className="flex items-center gap-2 px-4 py-2 text-sm border rounded-full border-neutral-200 hover:border-neutral-400"
          >
            {sortOption} <IoCaretDown />
          </button>
          {isOpen && (
            <div className="absolute right-0 z-10 w-32 mt-2 bg-white border rounded-lg shadow-lg border-neutral-200">
              <ul className="py-1">
                {["등록순", "인기순", "낮은가격순", "높은가격순", "이름순"].map(option => (
                  <li
                    key={option}
                    className={`px-4 py-2 hover:bg-neutral-100 cursor-pointer text-sm ${
                      sortOption === option ? "text-yellow-300" : ""
                    }`}
                    onClick={() => onSortOptionClick(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* 상품 그리드 */}
      <div className="grid grid-cols-2 gap-4 mb-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 lg:gap-8">
        {products.map(product => (
          <Link key={product.id} to={product.link} className="group">
            <div className="relative mb-2 aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="mb-1 text-sm font-medium">{product.name}</h3>
            <p className="text-sm">{product.price.toLocaleString()}원</p>
          </Link>
        ))}
      </div>
    </>
  );
}

ProductList.propTypes = {
  title: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    })
  ).isRequired,
  totalItems: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  sortOption: PropTypes.string.isRequired,
  onSortOptionClick: PropTypes.func.isRequired,
  onToggleOpen: PropTypes.func.isRequired
};