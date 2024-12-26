import tw from "tailwind-styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";

function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = event => {
    event.preventDefault();
    navigate(`/list?keyword=${keyword}`);
    console.log("검색어:", keyword);
  };

  return (
    <div className="flex items-center justify-between w-full p-2 pl-4 text-sm bg-white border rounded-full shadow-sm">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        className="flex-1 focus:outline-none"
        value={keyword}
        onChange={event => setKeyword(event.target.value)}
        onKeyPress={event => event.key === "Enter" && handleSearch(event)}
      />
      <button className="p-1" onClick={handleSearch}>
        <IoSearch />
      </button>{" "}
    </div>
  );
}

export default function Header() {
  const user = false;
  // const { user, resetUser } = useUserStore();

  const handleLogout = event => {
    event.preventDefault();
    // resetUser();
  };

  return (
    <header className="relative px-2 py-4 border-b sm:py-2 md:px-8 min-w-80">
      <nav className="flex flex-wrap items-center justify-between ">
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
          {user && (
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
