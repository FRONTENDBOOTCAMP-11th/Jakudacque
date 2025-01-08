import useUserStore from "@zustand/userStore";
import useCodeStore from "@zustand/codeStore";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminSideMenu from "@components/AdminSideMenu";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  // 권한에 따른 리다이렉트 로직 추가
  const { user } = useUserStore();
  const { type } = useParams();
  const [menuList, setMenuList] = useState([]);

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
    if (!user || !user.type) {
      navigate("/signin");
    }
    if (user.type === "user") {
      navigate("/");
    }
    if (user.type === "seller") {
      setMenuList([
        { title: "대시보드", path: "s/dashboard" },
        { title: "상품관리", path: "s/product" },
        { title: "주문관리", path: "s/order" },
      ]);
      if (type !== "s") {
        navigate("s/dashboard");
      }
    }
    if (user.type === "admin") {
      setMenuList([
        { title: "회원관리", path: "a/user" },
        { title: "카테고리관리", path: "a/category" },
      ]);
      if (type !== "a") {
        navigate("a/user");
      }
    }
  }, []);

  return (
    <>
      <div className="grid grid-cols-12">
        <AdminSideMenu menuList={menuList} />

        <main className="col-span-10 col-start-3 p-10">
          <Outlet />
        </main>
      </div>
    </>
  );
}
