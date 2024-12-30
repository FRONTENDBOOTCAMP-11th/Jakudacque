import tw from "tailwind-styled-components";
import useUserStore from "@zustand/userStore";
import { Link } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";

import PropTypes from "prop-types";

AdminSideMenu.propTypes = {
  menuList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string,
    }),
  ),
};

export default function AdminSideMenu({ menuList }) {
  const { resetUser } = useUserStore();

  const handleLogout = event => {
    event.preventDefault();
    // resetUser();
  };

  return (
    <>
      <SideMenuContainer>
        <MenuList>
          {/* logo */}
          <Link to="/">
            <MenuItem className="py-2 ">
              <img
                className="h-9 sm:h-12"
                src="/images/logo.png"
                alt="로고 이미지"
              />{" "}
            </MenuItem>
            <RowDashBar />
          </Link>

          {/* admin-menus */}
          {menuList.map((item, _idx) => {
            return (
              <Link key={_idx} to={item.path} className="hover:bg-gray-100">
                <MenuItem className="pl-4">{item.title}</MenuItem>
              </Link>
            );
          })}
          <RowDashBar />

          {/* logout */}
          <MenuItem onClick={handleLogout}>
            <IoLogOutOutline size={24} />
            <span>로그아웃</span>
          </MenuItem>
        </MenuList>
      </SideMenuContainer>
    </>
  );
}

const SideMenuContainer = tw.div`
  side_menu_container
  w-1/6 h-full p-2
  col-span-3
  flex flex-col
  fixed top-0 left-0
  bg-white
  text-black border-r border-b border-gray-200
  transition-all duration-300
`;
const MenuList = tw.nav`
  w-full h-full
  flex flex-col gap-2
`;
const MenuItem = tw.div`
  w-full min-h-10
  flex items-center gap-1
  text-sm font-normal cursor-pointer
`;
const RowDashBar = tw.div`
  row_dash_bar
  w-full
  h-[1px]
  my-1
  bg-gray-200
`;
