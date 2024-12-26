import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  // 권한에 따른 리다이렉트 로직 추가
  return <Outlet />;
}
