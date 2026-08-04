import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import {
  currentUser,
  myQuestions,
  repairRequests,
  type MyActivityStatus,
} from "@/data/my-page";

const statusStyles: Record<MyActivityStatus, string> = {
  "답변 대기": "bg-amber-50 text-amber-700 ring-amber-200",
  "진단 중": "bg-blue-50 text-blue-700 ring-blue-200",
  "수리 상담 중": "bg-violet-50 text-violet-700 ring-violet-200",
  "해결 완료": "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

export default function MyPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <div className="mx-auto max-w-6xl px-5 py-8 sm:py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              내 활동 관리
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              마이페이지
            </h1>

            <p className="mt-3 text-slate-600">
              질문과 댓글, 수리 요청 진행 상황을 확인하세요.
            </p>
          </div>

          <Link
            href="/questions/new"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            새 질문 등록
          </Link>
        </div>

        <div className="mt-8 grid gap-7 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="space-y-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-xl font-bold text-white">
                {currentUser.nickname.slice(0, 1)}
              </div>

              <h2 className="mt-4 text-xl font-bold">
                {currentUser.nickname}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                @{currentUser.username}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                  {currentUser.memberType}
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                  {currentUser.joinedAt} 가입
                </span>
              </div>

              <button
                type="button"
                className="mt-6 min-h-11 w-full rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                프로필 수정
              </button>
            </section>

            <nav
              aria-label="마이페이지 메뉴"
              className="rounded-2xl border border-slate-200 bg-white p-3"
            >
              {[
                "내 활동",
                "내 질문",
                "수리 요청",
                "저장한 질문",
                "알림 설정",
                "계정 설정",
              ].map((menu, index) => (
                <button
                  key={menu}
                  type="button"
                  className={`flex min-h-11 w-full items-center rounded-xl px-4 text-left text-sm font-semibold transition ${
                    index === 0
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {menu}
                </button>
              ))}
            </nav>
          </aside>

          <div className="min-w-0 space-y-7">
            <section className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
                <p className="text-2xl font-bold">
                  {currentUser.stats.questionCount}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  작성 질문
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
                <p className="text-2xl font-bold">
                  {currentUser.stats.commentCount}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  작성 댓글
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
                <p className="text-2xl font-bold">
                  {currentUser.stats.savedCount}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  저장한 질문
                </p>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-blue-600">
                    진행 상황
                  </p>
                  <h2 className="mt-1 text-xl font-bold">
                    수리 요청
                  </h2>
                </div>

                <span className="text-sm text-slate-500">
                  {repairRequests.length}건
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {repairRequests.map((request) => (
                  <article
                    key={request.id}
                    className="rounded-2xl border border-blue-200 bg-blue-50/50 p-5"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm text-slate-500">
                          {request.product}
                        </p>

                        <h3 className="mt-1 font-bold">
                          {request.expertName} 전문가
                        </h3>
                      </div>

                      <span className="w-fit rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700">
                        {request.status}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-600">
                      {request.nextAction}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-blue-100 pt-4">
                      <span className="text-xs text-slate-500">
                        {request.updatedAt}
                      </span>

                      <Link
                        href={`/questions/${request.questionId}`}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        질문 확인 →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-blue-600">
                    최근 활동
                  </p>
                  <h2 className="mt-1 text-xl font-bold">
                    내가 작성한 질문
                  </h2>
                </div>

                <span className="text-sm text-slate-500">
                  총 {myQuestions.length}개
                </span>
              </div>

              <div className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
                {myQuestions.map((question) => (
                  <article
                    key={question.id}
                    className="py-5"
                  >
                    <Link
                      href={`/questions/${question.id}`}
                      className="group block"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <p className="text-sm text-slate-500">
                            {question.product}
                          </p>

                          <h3 className="mt-2 font-bold leading-7 group-hover:text-blue-600">
                            {question.title}
                          </h3>

                          <div className="mt-3 flex gap-4 text-sm text-slate-500">
                            <span>댓글 {question.commentCount}</span>
                            <span>{question.updatedAt}</span>
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
                    </Link>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-6">
              <h2 className="font-bold">
                아직 실제 로그인과 데이터 저장은 연결되지 않았습니다
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                현재는 화면 구조를 확인하기 위한 데모입니다. 데이터베이스와
                인증을 연결하면 로그인한 계정의 실제 활동만 표시됩니다.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
