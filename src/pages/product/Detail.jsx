import { IoAdd } from "react-icons/io5";
import { IoRemove } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";

export default function Detail() {
  return (
    <div className="w-full">
      <div className="max-w-[1240px] mx-auto max-[700px]:mx-0 max-[425px]:mt-0">
        <div className="flex max-[700px]:flex-col items-center max-[700px]:items-stretch gap-x-5 px-5 max-[700px]:px-0">
          {/* 상품 이미지 */}
          <div className="basis-[640px] max-[700px]:basis-0  max-[700px]:w-screen">
            <img src="/images/sticker1.png" alt="상품 이미지" />
          </div>
          {/* 상품 정보 파트 */}
          <div className="basis-[580px] max-[700px]:basis-0 max-[700px]:w-auto max-[700px]:px-4 max-[700px]:mt-5 flex flex-col gap-y-11 max-[1100px]:gap-y-4 max-[900px]:gap-y-4">
            <div className="border-b border-[#e9e9e9] pb-5 max-[900px]:pb-2 max-[900px]:pt-2">
              <h1 className="text-[22px] max-[900px]:text-[16px] max-[425px]:text-[16px] pt-2 pb-1  max-[900px]:py-0">
                모서리 스튜디오 햄찌세자매 줄줄이 스티커
              </h1>
              <h2 className="text-[20px] max-[900px]:text-[16px] max-[425px]:text-[1rem]">
                2,800원
              </h2>
            </div>
            <ul className="text-[14px] max-[900px]:text-[12px] max-[425px]:text-[12px]">
              <li className="flex gap-x-1.5">
                <span className="font-semibold">배송 방법</span>
                <span>택배</span>
              </li>
              <li className="flex gap-x-1.5">
                <span className="font-semibold">배송비</span>
                <span>3,000원(30,000원 이상 무료배송)</span>
              </li>
            </ul>
            <div className="text-[15px] max-[900px]:text-[14px] max-[425px]:text-[14px] bg-[#f7f7f7] py-[14px] max-[900px]:py-[10px] px-4">
              <p className="border-b border-[#e9e9e9] border-dashed pb-2.5 max-[900px]:pb-1.5 mb-4 max-[900px]:mb-3">
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
            <div className="flex justify-between items-center my-2 max-[900px]:my-1">
              <span className="text-[16px] max-[900px]:text-[15px] max-[425px]:text-[14px]">
                총 상품금액(1개)
              </span>
              <span className="text-[24px] max-[900px]:text-[22px] max-[425px]:text-[20px]">
                2,800원
              </span>
            </div>
            <div className="flex gap-x-2 max-[900px]:text-[15px]">
              <button className="grow basis-[198px] py-3 max-[900px]:py-2 border border-[#ddd] rounded hover:bg-secondary-base flex justify-center items-center">
                구매하기
              </button>
              <button className="grow basis-[198px] border border-[#ddd] rounded hover:bg-secondary-base flex justify-center items-center">
                장바구니
              </button>
              <button className="grow basis-[100px] border border-[#ddd] rounded hover:bg-secondary-base flex justify-center items-center">
                <IoHeartOutline />찜
              </button>
            </div>
          </div>
        </div>
        {/* 상품 디테일 컷 파트 시작 */}
        <div className="border-y border-[#eee] bg-[#fcfcfc] text-center py-1.5 mt-[40px]">
          <p>상세 정보</p>
        </div>
        {/* 상품 디테일 컷 */}
        <img
          src="/images/sticker1_detail.png"
          alt="상품 디테일 사진"
          className="w-[1240px] mx-auto"
        />
      </div>
    </div>
  );
}
