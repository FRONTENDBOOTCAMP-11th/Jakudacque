import tw from "tailwind-styled-components";
// import useUserStore from "@zustand/userStore";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";

export default function Header() {
  const user = false;
  // const { user, resetUser } = useUserStore();

  const handleLogout = event => {
    event.preventDefault();
    // resetUser();
  };

  return (
    <header className="px-2 text-gray-800 md:px-8 min-w-80 bg-slate-100">
      <nav className="flex flex-wrap items-center justify-between py-4 md:py-2 ">
        <Link to="/">
          <img
            className="h-9 sm:h-12"
            src="/images/logo.png"
            alt="로고 이미지"
          />
        </Link>

        <div className="flex items-center gap-2 text-sm font-semibold">
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
    </header>
  );
}

const LinkButton = tw(Link)`
  p-1 rounded hover:bg-gray-200
`;
