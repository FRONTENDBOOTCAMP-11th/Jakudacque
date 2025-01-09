import Product from "@components/Product";
import useUserStore from "@zustand/userStore";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function MyPage() {
  const product = {
    image: "images/diary1.png",
    name: "Product 1",
    price: 1500,
    link: "https://example.com/page1",
  };

  const { resetUser } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = event => {
    event.preventDefault();
    resetUser();
    navigate("/");
    toast("로그아웃 되었습니다!");
  };

  return (
    <div className="w-full">
      <div className="max-w-screen-xl mx-auto">
        {/* 프로필 영역 */}
        <div className=" bg-[#f1f1f1] py-12 max-[500px]:py-8 flex items-center gap-x-40 max-[1000px]:gap-x-20 max-[700px]:gap-x-10 justify-center relative max-[500px]:flex-col max-[500px]:gap-y-7">
          <p className="text-[20px] max-[1000px]:text-[18px] max-[700px]:text-[16px] max-[500px]:text-[18px] ml-[-30px] max-[700px]:ml-0 shrink-0 tracking-wide">
            <span>강수정</span>님, 반갑습니다.
          </p>
          <div className="flex items-center pb-4">
            <div className="text-[16px] max-[700px]:text-[14px] border-x border-[#ccc] px-20 max-[900px]:px-14 max-[700px]:px-10 py-3 shrink-0 max-[500px]:border-x-0 max-[500px]:border-r">
              주문
              <span className="text-[22px] max-[700px]:text-[20px] pl-3 pr-1">
                3
              </span>
              건
            </div>
            <div className="text-[16px] max-[700px]:text-[14px] border-r border-[#ccc] px-20 max-[900px]:px-14 max-[700px]:px-10 py-3 shrink-0 max-[500px]:border-x-0">
              찜
              <span className="text-[22px] max-[700px]:text-[20px] pl-3 pr-1">
                2
              </span>
              건
            </div>
          </div>
          <Link
            to="/user/signin"
            onClick={handleLogout}
            className="leading-none border-b border-[#444] absolute bottom-3 right-4 text-[16px] max-[700px]:text-[14px]"
          >
            로그아웃
          </Link>
        </div>
        {/* 주문내역, 찜 리스트 카테고리 */}
        <div className="flex justify-around gap-x-5 max-[700px]:flex-col">
          <ul className="sticky top-0 ml-5 max-[700px]:ml-0 text-[18px] py-8 max-[700px]:my-6 flex flex-col max-[700px]:flex-row max-[700px]:justify-around gap-y-2 shrink-0 max-[700px]:text-[14px] h-11 max-[700px]:py-0 max-[700px]:gap-y-0 max-[700px]:h-6 bg-[#fff]">
            <li className="border-b-2 border-[#333]">주문 내역</li>
            <li>찜 리스트</li>
          </ul>

          {/* 주문 내역 */}
          <div className="last:border-b-0 basis-[1120px] max-[700px]:basis-0 pt-4 max-[500px]:pt-0">
            <div className="flex flex-col gap-y-4 max-w-[1120px] py-5 border-b border-[#ddd] max-[700px]:px-2">
              <p>25/01/01</p>
              <div className="flex items-center gap-x-5">
                <img
                  className="w-[100px]"
                  src="images/sticker1.png"
                  alt="모서리 스튜디오 햄찌세자매 줄줄이 스티커"
                />
                <ul>
                  <li className="text-[16px]">
                    모서리 스튜디오 햄찌세자매 줄줄이 스티커
                  </li>
                  <li className="text-[16px]">1개</li>
                  <li className="text-[20px]">2,800원</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-y-4 max-w-[1120px] py-5 border-b border-[#ddd] max-[700px]:px-2">
              <p>24/12/31</p>
              <div className="flex items-center gap-x-5">
                <img
                  className="w-[100px]"
                  src="images/sticker1.png"
                  alt="모서리 스튜디오 햄찌세자매 줄줄이 스티커"
                />
                <ul>
                  <li className="text-[16px]">
                    모서리 스튜디오 햄찌세자매 줄줄이 스티커
                  </li>
                  <li className="text-[16px]">1개</li>
                  <li className="text-[20px]">2,800원</li>
                </ul>
              </div>
              <div className="flex items-center gap-x-5">
                <img
                  className="w-[100px]"
                  src="images/sticker1.png"
                  alt="모서리 스튜디오 햄찌세자매 줄줄이 스티커"
                />
                <ul>
                  <li className="text-[16px]">
                    모서리 스튜디오 햄찌세자매 줄줄이 스티커
                  </li>
                  <li className="text-[16px]">1개</li>
                  <li className="text-[20px]">2,800원</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-y-4 max-w-[1120px] py-5 border-b border-[#ddd] max-[700px]:px-2">
              <p>24/12/31</p>
              <div className="flex items-center gap-x-5">
                <img
                  className="w-[100px]"
                  src="images/sticker1.png"
                  alt="모서리 스튜디오 햄찌세자매 줄줄이 스티커"
                />
                <ul>
                  <li className="text-[16px]">
                    모서리 스튜디오 햄찌세자매 줄줄이 스티커
                  </li>
                  <li className="text-[16px]">1개</li>
                  <li className="text-[20px]">2,800원</li>
                </ul>
              </div>
              <div className="flex items-center gap-x-5">
                <img
                  className="w-[100px]"
                  src="images/sticker1.png"
                  alt="모서리 스튜디오 햄찌세자매 줄줄이 스티커"
                />
                <ul>
                  <li className="text-[16px]">
                    모서리 스튜디오 햄찌세자매 줄줄이 스티커
                  </li>
                  <li className="text-[16px]">1개</li>
                  <li className="text-[20px]">2,800원</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 찜 리스트 */}
          <div className="max-[600px]:px-2 hidden">
            <div className="max-w-[1120px] grid gap-5 pt-10 grid-cols-4 max-[1000px]:grid-cols-3 max-[600px]:grid-cols-2 max-[700px]:pt-0">
              <Product product={product} />
              <Product product={product} />
              <Product product={product} />
              <Product product={product} />
              <Product product={product} />
              <Product product={product} />
              <Product product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
