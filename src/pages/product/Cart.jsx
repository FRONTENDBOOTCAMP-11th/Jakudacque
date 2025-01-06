import { useState } from "react";
import { IoAdd, IoCartOutline, IoRemove } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const products = [
  {
    id: 1,
    name: "2025 두들링 다이어리",
    link: "#",
    price: "12000",
    quantity: 1,
    imageSrc: "images/diary1.png",
    imageAlt: "2025 두들링 다이어리",
  },
  {
    id: 2,
    name: "유유클로버 플라워토끼 키링",
    link: "#",
    price: "6000",
    quantity: 1,
    imageSrc: "images/keyring1.png",
    imageAlt: "유유클로버 플라워토끼 키링",
  },
];

export default function Cart() {
  const [cartProducts] = useState(products);

  const hasProducts = cartProducts.length > 0;

  const handlePurchase = () => {
    toast("주문이 완료되었습니다!"); // 주문완료 Toast 메시지 호출
  };

  return (
    <div className="max-w-7xl container mx-auto px-5 py-6">
      <div className=" mx-auto px-10mb-6">
        <div className="flex mb-12 justify-between items-center">
          <h1 className="text-4xl font-bold">장바구니</h1>
          <p className="text-sm text-[#999] pl-2 mt-auto">
            30,000원 이상 구매시 배송비 무료
          </p>
        </div>
      </div>

      {hasProducts ? (
        <div className=" mx-auto">
          <div className="mb-4 text-xl">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 mr-3" />
              <span>전체 선택</span>
            </label>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-28 w-full">
            {products.map(product => (
              <div
                key={product.id}
                className="flex items-center justify-between border rounded-lg p-5"
              >
                <div className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 mr-4" />

                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="w-36 h-36 object-cover rounded-md"
                  />
                  <div className="ml-4">
                    <h2 className="text-2xl font-medium">
                      <Link to={product.link}>{product.name}</Link>
                    </h2>
                    <div className="flex items-center mt-2">
                      <span className="text-xl text-[#555] mr-2">수량 :</span>
                      <div className="flex">
                        <button className="border-[#aaa] border-y border-l px-2 max-[768px]:px-1.5 ">
                          <IoRemove />
                        </button>
                        <span className="border-[#aaa] border px-4 py-1.5 max-[768px]:px-3 max-[768px]:py-1">
                          1
                        </span>
                        <button className="border-[#aaa] border-y border-r px-2 max-[768px]:px-1.5">
                          <IoAdd />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-medium">{product.price} 원</p>
                  <button className="font-medium border rounded-md shadow px-4 py-1 hover:bg-secondary-base mt-2">
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-[#999] my-52">
          <IoCartOutline size={56} />
          <p className="mt-4 text-lg">장바구니가 비었습니다</p>
        </div>
      )}

      <div className="mt-8 border-t border-[#999] px-10 pt-6">
        <div className="flex flex-col items-center text-2xl font-medium space-y-5 mb-8">
          <p className="flex justify-between w-full">
            <span>상품 금액</span>
            <span>+ 18,000 원</span>
          </p>
          <p className="flex justify-between w-full">
            <span>배송비</span>
            <span>+ 3,500 원</span>
          </p>
          <p className="flex justify-between w-full text-3xl font-semibold">
            <span>총 주문 금액</span>
            <span>21,500 원</span>
          </p>
        </div>
        <div className="flex justify-center mx-auto mt-6 mb-8">
          <div className=" flex gap-8 w-full text-xl">
            <button
              onClick={handlePurchase}
              className="flex-1 text-center rounded-md border px-6 py-3 font-semibold shadow hover:bg-secondary-base"
            >
              주문하기
            </button>
            <button className="flex-1 text-center rounded-md border px-6 py-3 font-semibold shadow hover:bg-secondary-base">
              계속 쇼핑하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
