import Link from "next/link";
import { QuestionForm } from "@/components/question-form";
import { SiteHeader } from "@/components/site-header";

export default function NewQuestionPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <div className="mx-auto max-w-3xl px-5 py-8 sm:py-12">
        <nav
          aria-label="현재 위치"
          className="flex items-center gap-2 text-sm text-slate-500"
        >
          <Link
            href="/"
            className="hover:text-blue-600"
          >
            홈
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href="/questions"
            className="hover:text-blue-600"
          >
            질문
          </Link>
          <span aria-hidden="true">/</span>
          <span>새 질문</span>
        </nav>

        <header className="mt-7">
          <p className="text-sm font-semibold text-blue-600">
            전문가와 사용자에게 물어보세요
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            수리 질문 등록
          </h1>

          <p className="mt-3 leading-7 text-slate-600">
            제품과 증상을 구체적으로 작성하면 더 정확한 답변을
            받을 수 있습니다.
          </p>
        </header>

        <div className="mt-8">
          <QuestionForm />
        </div>
      </div>
    </main>
  );
}
