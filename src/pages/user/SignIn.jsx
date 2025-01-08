import InputError from "@components/InputError";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import useUserStore from "@zustand/userStore";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const REST_API_KEY = "7b635f7b3d4379252462f78787fc908b";
const REDIRECT_URI = "http://localhost:5173/user/signin/kakao";

export default function SignIn() {
  const setUser = useUserStore(store => store.setUser);

  const axios = useAxiosInstance();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: "u1@market.com",
      password: "11111111",
    },
  });

  const loginHandler = () => {
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = link;
  };

  // 로그인 api
  const login = useMutation({
    mutationFn: formData => axios.post(`/users/login`, formData),
    onSuccess: res => {
      const user = res.data.item;

      setUser({
        _id: user._id,
        name: user.name,
        accessToken: user.token.accessToken,
        refreshToken: user.token.refreshToken,
      });

      toast(user.name + "님, 로그인 되었습니다!");
      navigate(-1);
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

  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-10 rounded-lg w-full max-w-md">
        <div className="text-center py-4">
          <h2 className="text-4xl font-bold">로그인</h2>
        </div>

        <form className="my-14" onSubmit={handleSubmit(login.mutate)}>
          <div className="mb-5 text-xl">
            <label className="block mb-4" htmlFor="email">
              아이디
            </label>
            <input
              id="email"
              type="email"
              placeholder="아이디를 입력하세요"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-secondary-base"
              {...register("email", { required: "아이디는 필수입니다." })}
            />
            <InputError target={errors.email} />
          </div>
          <div className="mb-4 text-xl">
            <label className="block mb-4" htmlFor="password">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-secondary-base"
              {...register("password", { required: "비밀번호는 필수입니다." })}
            />
            <InputError target={errors.password} />
          </div>
          <div className="mt-10 flex flex-col justify-center items-center gap-6">
            <div className="flex justify-center items-center gap-10">
              <button
                type="submit"
                className="bg-secondary-light py-2 px-6 rounded font-semibold hover:bg-secondary-dark "
                style={{ width: "200px", height: "auto" }}
              >
                로그인
              </button>
              <button type="button" onClick={loginHandler}>
                <img
                  src="/kakao_login.png"
                  alt="카카오 로그인"
                  style={{ width: "200px", height: "auto" }}
                />
              </button>
            </div>
            <Link
              to="/signup"
              className="mt-4 text-sm font-semibold hover:underline"
            >
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
