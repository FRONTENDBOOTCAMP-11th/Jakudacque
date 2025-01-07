import { Link } from "react-router-dom";
import { IoRemoveOutline } from "react-icons/io5";
import tw from "tailwind-styled-components";

export default function Footer() {
  const List = tw.li`
    flex
    gap-x-1.5
  `;

  const ListTitle = tw.span`
    text-[#999]
    flex-shrink-0
    w-28
  `;
  return (
    <footer className="w-full border-t border-[#eee] mb-6">
      <div className="text-[#333] max-w-screen-xl mx-auto flex flex-col gap-y-5 px-5">
        <ul className="flex flex-wrap gap-x-5 gap-y-4 text-[14px] py-4 border-b border-[#eee]">
          <li>
            <Link to="/">회사소개</Link>
          </li>
          <li>
            <Link to="/">이용약관</Link>
          </li>
          <li>
            <Link to="/">쇼핑몰 이용안내</Link>
          </li>
          <li>
            <Link to="/">개인정보 취급방침</Link>
          </li>
          <li>
            <Link to="/">협업문의</Link>
          </li>
        </ul>
        <div className="flex flex-col gap-y-2">
          <h4 className="text-[16px] font-semibold">회사정보</h4>

          <IoRemoveOutline color="#333" />

          <ul className="text-[14px]">
            <List>
              <ListTitle>회사명</ListTitle>
              <span>자꾸다꾸</span>
            </List>
            <List>
              <ListTitle>대표</ListTitle>
              <span>just3</span>
            </List>
            <List>
              <ListTitle>대표전화</ListTitle>
              <span>010-0562-8465</span>
            </List>
            <List>
              <ListTitle>주소</ListTitle>
              <span>서울특별시 강남구 테헤란로 123 자꾸다꾸빌딩 8층</span>
            </List>
            <List>
              <ListTitle>사업자등록번호</ListTitle>
              <span>123-86-45678</span>
            </List>
            <List>
              <ListTitle>개인정보관리책임자</ListTitle>
              <span>김닥구 (kimdakgu@jakudacque.com)</span>
            </List>
            <List>
              <ListTitle>이메일</ListTitle>
              <span>kimdakgu@jakudacque.com</span>
            </List>
          </ul>
        </div>
      </div>
    </footer>
  );
}
