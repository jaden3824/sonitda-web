import Link from "next/link";
import { SignupForm } from "@/components/signup-form";
import { SiteHeader } from "@/components/site-header";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <div className="mx-auto max-w-2xl px-5 py-10 sm:py-14">
        <header className="text-center">
          <p className="text-sm font-semibold text-blue-600">
            손잇다 시작하기
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            회원가입
          </h1>

          <p className="mt-3 leading-7 text-slate-600">
            하나의 계정으로 질문하고 답변하며 수리 과정을 확인하세요.
          </p>
        </header>

        <div className="mt-8">
          <SignupForm />
        </div>

        <p className="mt-7 text-center text-sm text-slate-500">
          이미 계정이 있나요?{" "}
          <Link
            href="/login"
            className="font-bold text-blue-600 hover:text-blue-700"
          >
            로그인
          </Link>
        </p>

        <p className="mt-4 text-center text-xs leading-5 text-slate-400">
          현재는 화면 테스트 단계이며 실제 계정은 생성되지 않습니다.
        </p>
      </div>
    </main>
  );
}
