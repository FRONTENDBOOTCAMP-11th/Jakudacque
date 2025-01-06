import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-10 rounded-lg w-full max-w-md">
        <div className="text-center py-4">
          <h2 className="text-4xl font-bold">로그인</h2>
        </div>

        <form className="my-14">
          <div className="mb-5 text-xl">
            <label className="block mb-4" htmlFor="email">
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-secondary-base"
              // {...register("email", { required: "이메일은 필수입니다." })}
            />
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
              // {...register("password", { required: "비밀번호는 필수입니다." })}
            />
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
              <button type="submit">
                <img
                  src="kakao_login.png"
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
