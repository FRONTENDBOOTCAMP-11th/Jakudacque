import useUserStore from "@zustand/userStore";
import useCodeStore from "@zustand/codeStore";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSideMenu from "@components/AdminSideMenu";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  // 권한에 따른 리다이렉트 로직 추가
  const { user } = useUserStore();

  // codes fetch
  const axios = useAxiosInstance();
  const { codes, setCodes } = useCodeStore();

  useEffect(() => {
    if (codes) return;

    axios.get("/codes").then(res => {
      let codeMap = {};
      const codes = res.data.item.nested;

      for (let code in codes) {
        codeMap[code] = {};
        codes[code].codes.forEach(element => {
          codeMap[code][element.code] = element.value;
        });
      }

      setCodes(codeMap);
    });
  }, [codes]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
    if (user.type === "user") {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="grid grid-cols-12">
        <AdminSideMenu
          menuList={[
            { title: "대시보드", path: "/admin/dashboard" },
            { title: "상품관리", path: "/admin/product" },
            { title: "주문관리", path: "/admin/order" },
            { title: "회원목록", path: "/admin/user" },
            { title: "카테고리관리", path: "/admin/category" },
          ]}
        />

        <main className="col-span-10 col-start-3 p-10">
          <Outlet />
        </main>
      </div>
    </>
  );
}
