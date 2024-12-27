import { useState } from 'react'
import { IoCaretDown, IoCartOutline, IoChevronBackOutline, IoHeartOutline } from "react-icons/io5";

export default function List() {
  // 정렬 방식 상태 (나중에 개발)
  // const [sortMethod, setSortMethod] = useState('latest')
  
  // 드롭다운 메뉴의 열림/닫힘 상태를 관리하는 state
  const [isOpen, setIsOpen] = useState(false)
  
  // 상품 데이터 (샘플)
  const products = [
    {
      id: 1,
      name: '심플 멍냥이 다이어리',
      price: 2200,
      reviews: 0,
      image: '/api/dbinit-sample/jakudacque/uploadFiles/diary1.png'
    },
    {
      id: 2, 
      name: 'Daisy diary',
      price: 1700,
      reviews: 0,
      image: '/api/dbinit-sample/jakudacque/uploadFiles/diary2.png'
    },
    {
      id: 3,
      name: 'ioneco diary',
      price: 2800,
      reviews: 0,
      image: '/api/dbinit-sample/jakudacque/uploadFiles/diary3.png'
    },
    {
      id: 4,
      name: 'blahblah diary',
      price: 4500,
      reviews: 0,
      image: '/api/dbinit-sample/jakudacque/uploadFiles/diary4.png'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
    {/* 뒤로가기 */}
    <div className="mb-8">
      <button className="flex items-center gap-2">
        <IoChevronBackOutline  className="text-xl" />
        다이어리
      </button>
    </div>

     {/* 상품 카운트 */}
     <div className="flex justify-between items-center mb-8">
        <div className="text-sm font-medium">1000 ITEMS</div>
        {/* 상품 정렬 */}
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 border border-gray-200 rounded-full text-sm hover:border-gray-400 flex items-center gap-2"
          >
            정렬방식 <IoCaretDown />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <ul className="py-1">
                {['등록순', '인기순', '낮은가격순', '높은가격순', '이름순'].map((option) => (
                  <li 
                    key={option}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* 상품 그리드 - 1줄에 4개씩 */}
      <div className="grid grid-cols-4 gap-8">
        {products.map(product => (
          <div key={product.id} className="group cursor-pointer">
            {/* 이미지 */}
            <div className="w-full aspect-[1/1] overflow-hidden bg-gray-100 mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            {/* 상품 정보 */}
            <div>
              <h3 className="text-sm font-medium mb-2">{product.name}</h3>
              <p className="text-sm font-medium mb-1">
                {product.price.toLocaleString()}원
              </p>
              <IoHeartOutline /><IoCartOutline />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}