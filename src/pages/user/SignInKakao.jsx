import Spinner from "@components/Spinner";
import useAxiosInstance from "@hooks/useAxiosInstance";
import useQueryStr from "@hooks/useQueryStr";
import { useMutation } from "@tanstack/react-query";
import useUserStore from "@zustand/userStore";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const REDIRECT_URI = "http://localhost:5173/user/signin/kakao";

export default function SignIn() {
  const setUser = useUserStore(store => store.setUser);

  const axios = useAxiosInstance();
  const navigate = useNavigate();
  const queryStr = useQueryStr();

  const { setError } = useForm();

  const isCalled = useRef(false);

  useEffect(() => {
    const code = queryStr.get("code");
    if (code && !isCalled.current) {
      isCalled.current = true;
      kakaoLogin.mutate(code);
    }
  }, []);

  // 카카오 로그인 api
  const kakaoLogin = useMutation({
    mutationFn: code =>
      axios.post(`/users/login/kakao`, {
        code: code,
        redirect_uri: REDIRECT_URI,
      }),
    onSuccess: res => {
      const user = res.data.item;

      setUser({
        _id: user._id,
        name: user.name,
        type: user.type,
        accessToken: user.token.accessToken,
        refreshToken: user.token.refreshToken,
      });

      if (user?.type === "admin") {
        return navigate("/admin"); // 관리자(admin)이면 관리자 홈으로 이동
      } else {
        navigate("/");
      }

      toast(user.name + "님, 로그인 되었습니다!");
    },
    onError: err => {
      console.error(err);
      if (err.response?.data.errors) {
        err.response?.data.errors.forEach(error =>
          setError(error.path, { message: error.msg }),
        );
      } else {
        alert(err.response?.data.message || "잠시후 다시 요청하세요.");
      }
    },
  });

  return <Spinner />;
}
