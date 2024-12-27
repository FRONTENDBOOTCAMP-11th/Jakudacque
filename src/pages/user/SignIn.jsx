import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-10 rounded-lg w-full max-w-md">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold">로그인</h2>
        </div>

        <form className="my-14">
          <div className="mb-4">
            <label className="block mb-3" htmlFor="email">
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-secondary-base"
              // {...register("email", { required: "이메일은 필수입니다." })}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-3" htmlFor="password">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-secondary-base"
              // {...register("password", { required: "비밀번호는 필수입니다." })}
            />
            <Link
              to="#"
              className="block mt-6 ml-auto text-[#999] text-sm hover:underline"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>
          <div className="mt-10 flex justify-center items-center gap-14">
            <button
              type="submit"
              className="bg-secondary-light py-2 px-6 text-base font-semibold ml-2 hover:bg-secondary-dark rounded"
            >
              로그인
            </button>
            <Link to="/signup" className="ml-8 hover:underline">
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
