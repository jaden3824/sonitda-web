import Link from "next/link";
import { MyPageNav } from "@/components/mypage-nav";
import { SiteHeader } from "@/components/site-header";
import {
  currentUser,
  myQuestions,
  type MyActivityStatus,
  type MyQuestion,
} from "@/data/my-page";

const statusStyles: Record<MyActivityStatus, string> = {
  "답변 대기": "bg-amber-50 text-amber-700 ring-amber-200",
  "진단 중": "bg-blue-50 text-blue-700 ring-blue-200",
  "수리 상담 중": "bg-violet-50 text-violet-700 ring-violet-200",
  "해결 완료": "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

function getQuestionHref(question: MyQuestion) {
  if (question.id === "roborock-s8-charging") {
    return `/questions/${question.id}`;
  }

  return `/questions?query=${encodeURIComponent(question.title)}`;
}

export default function MyQuestionsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <div className="mx-auto max-w-6xl px-5 py-10">
        <nav className="text-sm text-slate-500">
          <Link href="/mypage" className="hover:text-blue-600">
            마이페이지
          </Link>
          <span className="mx-2">/</span>
          <span>내 질문</span>
        </nav>

        <header className="mt-6 border-b border-slate-200 pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                내가 작성한 질문
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                질문의 답변 상태와 최근 활동을 확인합니다.
              </p>
            </div>

            <Link
              href="/questions/new"
              className="inline-flex min-h-11 items-center justify-center bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              새 질문 등록
            </Link>
          </div>
        </header>

        <div className="mt-7 grid gap-7 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside>
            <section className="mb-4 border border-slate-200 bg-white p-5">
              <p className="font-bold">{currentUser.nickname}</p>
              <p className="mt-1 text-sm text-slate-500">
                @{currentUser.username}
              </p>
            </section>

            <MyPageNav />
          </aside>

          <section className="min-w-0">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="font-bold">
                전체 질문
              </h2>

              <span className="text-sm text-slate-500">
                총 {myQuestions.length}개
              </span>
            </div>

            <div className="divide-y divide-slate-200 border-b border-slate-200">
              {myQuestions.map((question) => (
                <article
                  key={question.id}
                  className="py-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-slate-500">
                        {question.product}
                      </p>

                      <h3 className="mt-2 text-lg font-bold leading-7">
                        <Link
                          href={getQuestionHref(question)}
                          className="hover:text-blue-600 hover:underline"
                        >
                          {question.title}
                        </Link>
                      </h3>

                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
                        <span>댓글 {question.commentCount}</span>
                        <span>최근 활동 {question.updatedAt}</span>
                      </div>
                    </div>

                    <span
                      className={`w-fit shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${
                        statusStyles[question.status]
                      }`}
                    >
                      {question.status}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-4 border-t border-slate-100 pt-4">
                    <Link
                      href={getQuestionHref(question)}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      질문 확인
                    </Link>

                    <button
                      type="button"
                      className="text-sm font-semibold text-slate-500 hover:text-slate-800"
                    >
                      수정
                    </button>

                    <button
                      type="button"
                      className="text-sm font-semibold text-slate-500 hover:text-red-600"
                    >
                      삭제
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-4 text-xs leading-5 text-slate-400">
              수정과 삭제는 현재 화면만 준비된 상태이며 실제 데이터에는
              반영되지 않습니다.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
