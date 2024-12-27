import { IoAdd } from "react-icons/io5";
import { IoRemove } from "react-icons/io5";

export default function Detail() {
  return (
    <div className="w-full">
      <div className="max-w-screen-xl mx-auto max-[1000px]:mx-0 mt-10">
        <div className="flex max-[1000px]:flex-col align-middle justify-between gap-x-14 px-20 max-[1000px]:px-0">
          <div className="w-[550px] max-[1000px]:w-screen">
            <img src="/images/sticker1.png" alt="상품 이미지" />
          </div>
          {/* 상품 정보 파트 */}
          <div className="w-[500px] max-[1000px]:w-auto max-[1000px]:px-4 max-[1000px]:mt-5 flex flex-col justify-evenly gap-y-5">
            <div className="border-b border-[#e9e9e9] pb-5">
              <h1 className="text-[1.375rem] max-[425px]:text-[1.05rem] pt-2 pb-1">
                모서리 스튜디오 햄찌세자매 줄줄이 스티커
              </h1>
              <h2 className="text-[1.25rem] max-[425px]:text-[1rem]">
                2,800원
              </h2>
            </div>
            <ul className="text-sm max-[425px]:text-[0.8rem]">
              <li className="flex gap-x-1.5">
                <span className="font-semibold">배송 방법</span>
                <span>택배</span>
              </li>
              <li className="flex gap-x-1.5">
                <span className="font-semibold">배송비</span>
                <span>3,000원(30,000원 이상 무료배송)</span>
              </li>
            </ul>
            <div className="text-[0.99rem] max-[425px]:text-[0.9rem] bg-[#f7f7f7] py-2.5 px-3">
              <p className="border-b border-[#e9e9e9] border-dashed pb-2.5 mb-4">
                수량
              </p>
              <div className="flex justify-between items-center">
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
                <span>2,800원</span>
              </div>
            </div>
            <div className="flex justify-between items-center my-2">
              <span className="text-[1rem] max-[425px]:text-[0.9rem]">
                총 상품금액(1개)
              </span>
              <span className="text-[1.5rem] max-[425px]:text-[1.3rem]">
                2,800원
              </span>
            </div>
            <div className="flex gap-x-2">
              <button className="flex-shrink-0 grow basis-20 py-3 border border-[#ddd] rounded hover:bg-secondary-base">
                구매하기
              </button>
              <button className="flex-shrink-0 grow basis-20 py-3 border border-[#ddd] rounded hover:bg-secondary-base">
                장바구니
              </button>
            </div>
          </div>
        </div>
        {/* 상품 디테일 컷 파트 시작 */}
        <div className="border-y border-[#eee] bg-[#fcfcfc] text-center py-1.5 mt-10">
          <p>상세 정보</p>
        </div>
        {/* 상품 디테일 컷 */}
        <img
          src="/images/sticker1_detail.png"
          alt="상품 디테일 사진"
          className="w-[700px] mx-auto"
        />
      </div>
    </div>
  );
}
