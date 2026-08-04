import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { brand } from "@/config/brand";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <div className="mx-auto flex max-w-md flex-col px-5 py-10 sm:py-16">
        <div className="text-center">
          <p className="text-sm font-semibold text-blue-600">
            {brand.name} 계정
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            로그인
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            아이디와 비밀번호로 로그인해 질문과 수리 진행 상황을 확인하세요.
          </p>
        </div>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <form className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-bold"
              >
                아이디
              </label>

              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                minLength={4}
                maxLength={20}
                placeholder="아이디를 입력하세요"
                className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <div className="flex items-center justify-between gap-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold"
                >
                  비밀번호
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  비밀번호 찾기
                </Link>
              </div>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="비밀번호를 입력하세요"
                className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                name="remember"
                className="h-4 w-4 rounded border-slate-300"
              />
              로그인 상태 유지
            </label>

            <button
              type="button"
              className="min-h-12 w-full rounded-xl bg-blue-600 px-5 font-semibold text-white transition hover:bg-blue-700"
            >
              아이디로 로그인
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">
              또는
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="space-y-3">
            <button
              type="button"
              className="flex min-h-12 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-5 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              카카오로 계속하기
            </button>

            <button
              type="button"
              className="flex min-h-12 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-5 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Google로 계속하기
            </button>
          </div>

          <p className="mt-7 text-center text-sm text-slate-500">
            아직 계정이 없나요?{" "}
            <Link
              href="/signup"
              className="font-bold text-blue-600 hover:text-blue-700"
            >
              회원가입
            </Link>
          </p>
        </section>

        <p className="mt-5 text-center text-xs leading-5 text-slate-400">
          현재는 화면 테스트 단계이며 실제 로그인이 처리되지는 않습니다.
        </p>
      </div>
    </main>
  );
}
