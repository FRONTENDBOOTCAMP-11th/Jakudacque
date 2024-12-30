import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "2025 두들링 다이어리",
    link: "#",
    color: "pink",
    price: "12000",
    quantity: 1,
    imageSrc: "images/diary1.png",
    imageAlt: "2025 두들링 다이어리",
  },
  {
    id: 2,
    name: "유유클로버 플라워토끼 키링",
    link: "#",
    color: "",
    price: "6000",
    quantity: 1,
    imageSrc: "images/keyring1.png",
    imageAlt: "유유클로버 플라워토끼 키링",
  },
];

export default function Cart() {
  const [cartProducts] = useState(products);

  const hasProducts = cartProducts.length > 0;

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-5xl mx-auto mb-6">
        <div className="flex mb-12 justify-between items-center">
          <h1 className="text-2xl font-bold">장바구니</h1>
          <p className="text-xs text-[#999] pl-2 mt-auto">
            30,000원 이상 구매시 배송비 무료
          </p>
        </div>
      </div>

      {hasProducts ? (
        <div className="max-w-5xl mx-auto">
          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 mr-2" />
              <span>전체 선택</span>
            </label>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-28 w-full max-w-5xl">
            {products.map(product => (
              <div
                key={product.id}
                className="flex items-center justify-between border border-gray-00 rounded-lg p-5"
              >
                <div className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 mr-4" />
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-medium">
                      <Link to={product.link}>{product.name}</Link>
                    </h2>
                    <p className="text-sm text-[#555]">
                      수량 : {product.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium">{product.price} 원</p>
                  <button className="text-sm font-medium border rounded-md px-4 py-1 hover:bg-secondary-base mt-2">
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-gray-400 my-52">
          <IoCartOutline size={56} />
          <p className="mt-4 text-lg">장바구니가 비었습니다</p>
        </div>
      )}

      <div className="mt-8 border-t border-[#999] pt-6">
        <div className="flex flex-col items-center text-lg font-medium space-y-3 mb-8">
          <p className="flex justify-between w-full max-w-3xl">
            <span>상품 금액</span>
            <span>+ 18,000 원</span>
          </p>
          <p className="flex justify-between w-full max-w-3xl">
            <span>배송비</span>
            <span>+ 3,500 원</span>
          </p>
          <p className="flex justify-between w-full max-w-3xl text-xl font-bold">
            <span>총 주문 금액</span>
            <span>21,500 원</span>
          </p>
        </div>
        <div className="flex justify-center max-w-3xl mx-auto mt-6 mb-8">
          <div className=" flex gap-8 w-full">
            <button className="flex-1 text-center rounded-md border px-6 py-3 font-medium shadow hover:bg-secondary-base">
              주문하기
            </button>
            <button className="flex-1 text-center rounded-md border px-6 py-3 font-medium shadow hover:bg-secondary-base">
              계속 쇼핑하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
