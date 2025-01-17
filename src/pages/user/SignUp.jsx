import InputError from "@components/InputError";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp() {
  const axios = useAxiosInstance();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm();

  // 회원가입 api
  const addUser = useMutation({
    mutationFn: async userInfo => {
      userInfo.type = "user";
      // 주소지 배열로 들어감
      userInfo.extra.addressBook = [
        {
          name: "기본 배송지",
          value: userInfo.extra?.addressBook?.value,
        },
      ];
      if (!userInfo.phone) {
        delete userInfo.phone;
      }
      delete userInfo.passwordConfirm;
      return axios.post(`/users/`, userInfo);
    },
    onSuccess: res => {
      const user = res.data.item;
      toast(user.name + "님, 환영합니다!");
      navigate("/user/signin");
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
        <div className="text-center py-6">
          <h2 className="text-4xl font-bold">회원 가입</h2>
          <div className="flex justify-end mt-7 text-sm">
            <span className="text-red-500 before:content-['*'] before:mr-1"></span>
            필수입력사항
          </div>
        </div>

        <form onSubmit={handleSubmit(addUser.mutate)}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="name">
              <span className="text-red-500 before:content-['*'] before:mr-1"></span>
              이름
            </label>
            <input
              type="text"
              id="name"
              placeholder="이름을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-secondary-base"
              {...register("name", { required: "이름은 필수입니다." })}
            />
            <InputError target={errors.name} />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="email">
              <span className="text-red-500 before:content-['*'] before:mr-1"></span>
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-secondary-base"
              {...register("email", { required: "이메일은 필수입니다." })}
            />
            <InputError target={errors.email} />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="password">
              <span className="text-red-500 before:content-['*'] before:mr-1"></span>
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-secondary-base"
              {...register("password", { required: "비밀번호는 필수입니다." })}
            />
            <InputError target={errors.password} />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="passwordConfirm">
              <span className="text-red-500 before:content-['*'] before:mr-1"></span>
              비밀번호 확인
            </label>
            <input
              type="password"
              id="passwordConfirm"
              placeholder="비밀번호를 다시 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-secondary-base"
              {...register("passwordConfirm", {
                required: "비밀번호 확인은 필수입니다.",
                validate: value =>
                  value === watch("password") ||
                  "비밀번호가 일치하지 않습니다.",
              })}
            />
            <InputError target={errors.passwordConfirm} />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="addressBookValue">
              <span className="text-red-500 before:content-['*'] before:mr-1"></span>
              주소
            </label>
            <input
              type="text"
              id="addressBookValue"
              placeholder="주소를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-secondary-base"
              {...register("extra.addressBook.value", {
                required: "주소는 필수입니다.",
              })}
            />
            <InputError target={errors.extra?.addressBook?.value} />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="phone">
              핸드폰
            </label>
            <input
              type="text"
              id="phone"
              placeholder="핸드폰 번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-secondary-base"
              {...register("phone")}
            />
          </div>

          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-8">
            <button
              type="submit"
              className="px-10 py-2 border border-neutral-300 rounded hover:border-neutral-400 hover:bg-secondary-base flex justify-center items-center"
            >
              회원가입
            </button>
            <Link
              to="#"
              onClick={() => {
                navigate(-1);
              }}
              className="py-2 px-6 font-semibold hover:underline"
            >
              취소
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
