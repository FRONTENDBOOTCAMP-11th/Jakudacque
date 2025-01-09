// main
import Main from "@pages/index";
// product
import ProductList from "@pages/product/List";
import Detail from "@pages/product/Detail";
import Cart from "@pages/product/Cart";
import Search from "@pages/product/Search";
// user
import SignIn from "@pages/user/SignIn";
import SignInKakao from "@pages/user/SignInKakao";
import SignUp from "@pages/user/SignUp";
import MyPage from "@pages/user/MyPage";
// admin
import AdminDashboard from "@pages/admin/Dashboard";
import AdminProductList from "@pages/admin/product/List";
import AdminProductEdit from "@pages/admin/product/Edit";
import New from "@pages/admin/product/New";
import AdminOrderList from "@pages/admin/order/List";
import AdminOrderEdit from "@pages/admin/order/Edit";

import AdminUserList from "@pages/admin/user/List";
import AdminCategory from "@pages/admin/category/List";

import Layout from "@components/layout";
import AdminLayout from "@components/layout/AdminLayout";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Main /> }, // 메인 홈
      // product
      {
        path: "list",
        children: [
          { index: true, element: <ProductList /> }, // 상품 리스트
          { path: ":_id", element: <Detail /> }, // 상품 상세
        ],
      },
      { path: "search", element: <Search /> }, // 검색
      { path: "cart", element: <Cart /> }, // 장바구니
      // user
      {
        path: "user",
        children: [
          {
            path: "signin", // 로그인
            children: [
              { index: true, element: <SignIn /> }, // 로그인
              { path: "kakao", element: <SignInKakao /> }, // 카카오 로그인
            ],
          },
          { path: "signup", element: <SignUp /> }, // 회원가입
          { path: "mypage", element: <MyPage /> }, // 마이페이지
        ],
      },
      // admin
      {
        path: "admin",
        element: <AdminLayout />, // 어드민 레이아웃(리다이렉트 로직)
        children: [
          { index: true, element: <AdminDashboard /> }, // 어드민 홈
          {
            path: "product", // 상품 관리
            element: <AdminProductList />, // 상품 리스트
            children: [
              { path: "edit/:_id", element: <AdminProductEdit /> }, // 상품 수정
              { path: "new", element: <New /> }, // 상품 추가
            ],
          },
          {
            path: "order", // 주문 관리
            element: <AdminOrderList />,
            children: [
              { path: "edit/:_id", element: <AdminOrderEdit /> }, // 주문정보 수정
            ],
          },
          { path: "user", element: <AdminUserList /> }, // 어드민 유저 리스트
          { path: "category", element: <AdminCategory /> }, // 어드민 카테고리 관리
        ],
      },
    ],
  },
]);

export default router;
