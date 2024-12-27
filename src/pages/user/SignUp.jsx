import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-10 rounded-lg w-full max-w-md">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold">회원 가입</h2>
        </div>

        <form>
          <div className="my-5">
            <label className="block mb-2" htmlFor="name">
              이름
            </label>
            <input
              type="text"
              id="name"
              placeholder="이름을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-secondary-base "
              // {...register("name", { required: "이름은 필수입니다." })}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="email">
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-secondary-base "
              // {...register("email", { required: "이메일은 필수입니다." })}
            />
          </div>
          <div className="mb-4">
            <label className="block  mb-2" htmlFor="password">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-secondary-base "
              // {...register("password", { required: "비밀번호는 필수입니다." })}
            />
          </div>
          <div className="mb-4">
            <label className="block  mb-2" htmlFor="name">
              핸드폰
            </label>
            <input
              type="text"
              id="name"
              placeholder="핸드폰 번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-secondary-base "
              // {...register("name", { required: "핸드폰 번호는 필수입니다." })}
            />
          </div>
          <div className="mb-4">
            <label className="block  mb-2" htmlFor="name">
              주소
            </label>
            <input
              type="text"
              id="name"
              placeholder="주소를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-secondary-base "
            />
          </div>

          <div className="mt-10 flex justify-center items-center gap-14">
            <button
              type="submit"
              className="bg-secondary-light py-2 px-6 text-base font-semibold ml-2 hover:bg-secondary-dark rounded"
            >
              회원가입
            </button>
            <Link
              to="/"
              className="py-2 px-6 text-base  font-semibold ml-2 hover:bg-secondary-base rounded"
            >
              취소
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
