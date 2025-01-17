import { Link } from "react-router-dom";
import { IoRemoveOutline } from "react-icons/io5";
import tw from "tailwind-styled-components";

export default function Footer() {
  const List = tw.li`
    flex
    gap-x-1.5
  `;

  const ListTitle = tw.span`
    text-neutral-400
    flex-shrink-0
    w-28
  `;
  return (
    <footer className="w-full mb-6 border-t border-neutral-200">
      <div className="flex flex-col max-w-screen-xl px-5 mx-auto  text-neutral-800 gap-y-5">
        <ul className="flex flex-wrap py-4 text-sm border-b gap-x-5 gap-y-4 border-neutral-200">
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
          <h4 className="font-semibold ">회사정보</h4>

          <IoRemoveOutline color="#333" />

          <ul className="text-sm">
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
