import tw from "tailwind-styled-components";
//import useUserStore from "@zustand/userStore";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";

function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = event => {
    event.preventDefault();
    if (!keyword.trim()) return;
  
    // 현재 URL이 /search인 경우
    if (location.pathname === '/search') {
      // URL을 변경하고 페이지 리로드
      navigate(`/search?keyword=${keyword}`, { replace: true });
      navigate(0); 
    } else {
      // 다른 페이지에서 검색하는 경우
      navigate(`/search?keyword=${keyword}`);
    }
  };

  return (
    <div className="flex items-center justify-between w-full p-2 pl-4 text-sm bg-white border rounded-full shadow-sm">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        className="flex-1 focus:outline-none"
        value={keyword}
        onChange={event => setKeyword(event.target.value)}
        onKeyDown={event => event.key === "Enter" && handleSearch(event)}
      />
      <button className="p-1" onClick={handleSearch}>
        <IoSearch />
      </button>
    </div>
  );
}

export default function Header() {
  // 권한에 따른 리다이렉트 로직 추가
  // const { user, resetUser } = useUserStore();
  const user = { id: 1, username: "test", type: "admin" };
  // const user = null;

  const handleLogout = event => {
    event.preventDefault();
    // resetUser();
  };

  return (
    <header className="relative px-2 py-4 border-b sm:py-2 md:px-8 min-w-80">
      <nav className="flex flex-wrap items-center justify-between">
        <Link to="/">
          <img
            className="h-9 sm:h-12"
            src="/images/logo.png"
            alt="로고 이미지"
          />
        </Link>

        <div className="flex items-center gap-2 text-sm font-semibold">
          <div className="hidden mr-4 sm:flex">
            <SearchBar />
          </div>
          {user ? (
            <form onSubmit={handleLogout}>
              <button type="submit" className="p-1 rounded hover:bg-gray-200">
                로그아웃
              </button>
            </form>
          ) : (
            <>
              <LinkButton to="/signin">로그인</LinkButton>
              <LinkButton to="/signup">회원가입</LinkButton>
            </>
          )}
          <LinkButton to="/cart">
            <span className="hidden">장바구니</span>
            <IoCartOutline size={24} />
          </LinkButton>
          {user && user.type !== "user" && (
            <LinkButton to="/admin">
              <span className="hidden">관리자 페이지</span>
              <IoSettingsOutline size={24} />
            </LinkButton>
          )}
        </div>
      </nav>
      <div className="mt-4 sm:hidden">
        <SearchBar />
      </div>
    </header>
  );
}

const LinkButton = tw(Link)`
  p-1 rounded hover:bg-gray-200 flex-shrink-0
`;
