// main
import Main from "@pages/index";
// product
import ProductList from "@pages/product/List";
import Detail from "@pages/product/Detail";
import Cart from "@pages/product/Cart";
// user
import SignIn from "@pages/user/SignIn";
import SignUp from "@pages/user/SignUp";
// admin
import AdminHome from "@pages/admin/index";
import AdminProductList from "@pages/admin/product/List";
import Edit from "@pages/admin/product/Edit";
import New from "@pages/admin/product/New";
import AdminOrderList from "@pages/admin/order/List";

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
          { path: ":id", element: <Detail /> }, // 상품 상세
        ],
      },
      { path: "cart", element: <Cart /> }, // 장바구니
      // user
      { path: "signin", element: <SignIn /> }, // 로그인
      { path: "signup", element: <SignUp /> }, // 회원가입
      // admin
      {
        path: "admin",
        element: <AdminLayout />, // 어드민 레이아웃(리다이렉트 로직)
        children: [
          { index: true, element: <AdminHome /> }, // 어드민 홈
          {
            path: "product", // 상품 관리
            children: [
              { index: true, element: <AdminProductList /> }, // 상품 목록
              { path: "edit/:id", element: <Edit /> }, // 상품 수정
              { path: "new", element: <New /> }, // 상품 추가
            ],
          },
          {
            path: "order", // 주문 관리
            children: [{ index: true, element: <AdminOrderList /> }], // 주문 목록
          },
        ],
      },
    ],
  },
]);

export default router;
