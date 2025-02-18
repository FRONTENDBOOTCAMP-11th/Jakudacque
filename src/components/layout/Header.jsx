import tw from "tailwind-styled-components";
import useUserStore from "@zustand/userStore";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";

function SearchBar() {
  const [inputKeyword, setInputKeyword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // URL 쿼리 파라미터에서 검색어 가져오기
  useEffect(() => {
    const urlKeyword = new URLSearchParams(location.search).get("keyword") || "";
    setInputKeyword(urlKeyword);
  }, [location.search]); // URL 변경 감지

 // 검색 시 URL 업데이트
  const handleSearch = (event) => {
    event.preventDefault();
    if (!inputKeyword.trim()) return;

    navigate(`/search?keyword=${inputKeyword}`); // URL에 쿼리 남기기
  };

  return (
    <div className="flex items-center justify-between w-full p-2 pl-4 text-sm bg-white border rounded-full shadow-sm">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        className="flex-1 focus:outline-none"
        value={inputKeyword}
        onChange={event => setInputKeyword(event.target.value)}
        onKeyDown={event => event.key === "Enter" && handleSearch(event)}
      />
      <button className="p-1" onClick={handleSearch}>
        <IoSearch />
      </button>
    </div>
  );
}

export default function Header() {
  const [showBoard, setShowBoard] = useState(false);

  // 권한에 따른 리다이렉트 로직 추가
  const { user } = useUserStore();
  // const user = null;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 56) {
        setShowBoard(true);
      } else {
        setShowBoard(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <StyledHeader $showBoard={showBoard}>
        <nav className="flex flex-wrap items-center justify-between w-full ">
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

            <LinkButton to="/cart">
              <span className="sr-only">장바구니</span>
              <IoCartOutline size={24} />
            </LinkButton>
            <LinkButton
              to={user ? "/user/mypage?category=orderList" : "/user/signin"}
            >
              {user ? (
                <>
                  <span className="sr-only">마이페이지</span>
                  <IoPersonOutline size={22} />
                </>
              ) : (
                <span>로그인</span>
              )}
            </LinkButton>
            {user?.type === "admin" && (
              <LinkButton to={"/admin"}>
                <IoSettingsOutline size={22} />
              </LinkButton>
            )}
          </div>
        </nav>
      </StyledHeader>
      <div className="px-2 pb-4 border-b sm:hidden">
        <SearchBar />
      </div>
    </>
  );
}

const StyledHeader = tw.header`
${({ $showBoard }) => ($showBoard ? "border-b" : "")}
  sticky top-0 z-50 
  w-full px-2 py-4 sm:py-2 md:px-8 min-w-80
  bg-white sm:border-b
`;

const LinkButton = tw(Link)`
  p-1 rounded hover:bg-neutral-200 flex-shrink-0
`;
