import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import {
  questionDetail,
  type ParticipantRole,
} from "@/data/question-detail";

const roleStyles: Record<ParticipantRole, string> = {
  질문자: "bg-slate-100 text-slate-700 ring-slate-200",
  "일반 사용자": "bg-violet-50 text-violet-700 ring-violet-200",
  "개인 전문가": "bg-blue-50 text-blue-700 ring-blue-200",
  "사업자 인증 전문가":
    "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

export default function QuestionDetailPage() {
  const question = questionDetail;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <div className="mx-auto max-w-6xl px-5 py-8">
        <nav
          aria-label="현재 위치"
          className="flex flex-wrap items-center gap-2 text-sm text-slate-500"
        >
          <Link href="/" className="hover:text-blue-600">
            홈
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/questions" className="hover:text-blue-600">
            질문
          </Link>
          <span aria-hidden="true">/</span>
          <span>{question.category}</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {question.status}
                </span>
                <span className="text-sm text-slate-500">
                  {question.category}
                </span>
              </div>

              <h1 className="mt-5 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                {question.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-500">
                <span className="font-semibold text-slate-700">
                  {question.questioner.name}
                </span>
                <span>{question.createdAt}</span>
                <span>조회 {question.viewCount}</span>
              </div>

              <dl className="mt-7 grid gap-4 rounded-2xl bg-slate-50 p-5 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold text-slate-500">
                    브랜드
                  </dt>
                  <dd className="mt-1 font-bold">{question.brand}</dd>
                </div>

                <div>
                  <dt className="text-xs font-semibold text-slate-500">
                    모델명
                  </dt>
                  <dd className="mt-1 font-bold">{question.model}</dd>
                </div>
              </dl>

              <section className="mt-8">
                <h2 className="text-sm font-bold text-slate-900">주요 증상</h2>
                <p className="mt-3 leading-7 text-slate-700">
                  {question.symptom}
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-sm font-bold text-slate-900">
                  자세한 설명
                </h2>
                <p className="mt-3 whitespace-pre-line leading-7 text-slate-700">
                  {question.description}
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-sm font-bold text-slate-900">
                  이미 시도한 방법
                </h2>

                <ul className="mt-3 space-y-3">
                  {question.attemptedActions.map((action) => (
                    <li
                      key={action}
                      className="flex gap-3 text-sm leading-6 text-slate-700"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"
                      />
                      {action}
                    </li>
                  ))}
                </ul>
              </section>

              {question.images.length > 0 && (
                <section className="mt-8">
                  <h2 className="text-sm font-bold text-slate-900">
                    첨부 사진
                  </h2>

                  <div className="mt-3 grid gap-4 sm:grid-cols-2">
                    {question.images.map((image) => (
                      <figure
                        key={image.src}
                        className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
                      >
                        <div className="relative aspect-[4/3] bg-slate-100">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 640px) 100vw, 380px"
                            className="object-cover"
                          />
                        </div>

                        <figcaption className="px-4 py-3 text-sm leading-6 text-slate-600">
                          {image.caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </section>
              )}

              <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
                감전이나 화재 위험이 있는 제품은 직접 분해하지 마세요.
                안전한 확인 범위를 넘어가면 전문가 점검이 필요합니다.
              </div>
            </article>

            <section className="mt-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-blue-600">
                    공개 대화
                  </p>
                  <h2 className="mt-1 text-2xl font-bold">
                    댓글 {question.comments.length}
                  </h2>
                </div>

                <p className="text-sm text-slate-500">
                  사용자와 전문가가 함께 원인을 좁힙니다
                </p>
              </div>

              <div className="mt-5 space-y-4">
                {question.comments.map((comment) => (
                  <article
                    key={comment.id}
                    className={`rounded-2xl border bg-white p-5 sm:p-6 ${
                      comment.author.role === "질문자"
                        ? "border-blue-200"
                        : "border-slate-200"
                    }`}
                  >
                    {comment.replyTo && (
                      <p className="mb-3 text-xs font-semibold text-blue-600">
                        {comment.replyTo}님의 댓글에 답변
                      </p>
                    )}

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                          {comment.author.name.slice(0, 1)}
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold">
                              {comment.author.name}
                            </h3>

                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                                roleStyles[comment.author.role]
                              }`}
                            >
                              {comment.author.role}
                            </span>
                          </div>

                          <p className="mt-1 text-sm text-slate-500">
                            {comment.author.profile}
                            {comment.author.helpfulCount
                              ? ` · 도움된 답변 ${comment.author.helpfulCount}`
                              : ""}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs text-slate-400">
                        {comment.createdAt}
                      </span>
                    </div>

                    <p className="mt-5 whitespace-pre-line leading-7 text-slate-700">
                      {comment.content}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
                      <button
                        type="button"
                        className="text-sm font-semibold text-slate-600 hover:text-blue-600"
                      >
                        도움돼요
                      </button>

                      <button
                        type="button"
                        className="text-sm font-semibold text-slate-600 hover:text-blue-600"
                      >
                        답변하기
                      </button>

                      {comment.canRequestRepair && (
                        <button
                          type="button"
                          className="ml-auto rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
                        >
                          이 전문가에게 수리 요청
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              <form className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <label
                  htmlFor="comment"
                  className="block font-bold text-slate-900"
                >
                  댓글 작성
                </label>

                <p className="mt-1 text-sm text-slate-500">
                  질문에 도움이 되는 경험이나 진단 의견을 남겨주세요.
                </p>

                <textarea
                  id="comment"
                  name="comment"
                  rows={5}
                  placeholder="댓글 내용을 입력하세요"
                  className="mt-4 w-full resize-y rounded-xl border border-slate-300 px-4 py-3 leading-7 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                <div className="mt-3 flex justify-end">
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    댓글 등록
                  </button>
                </div>
              </form>
            </section>
          </div>

          <aside className="space-y-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-24">
              <h2 className="font-bold">수리를 요청하기 전에</h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                공개 답변과 대화를 확인한 뒤 신뢰할 수 있는 전문가를
                선택하세요.
              </p>

              <ol className="mt-5 space-y-4 text-sm text-slate-700">
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">1</span>
                  의미 있는 답변을 남긴 전문가만 선택할 수 있습니다.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">2</span>
                  한 번에 한 명의 전문가에게만 수리를 요청합니다.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-600">3</span>
                  주소와 연락처는 공개 댓글이 아닌 수리 대화방에서
                  공유합니다.
                </li>
              </ol>

              <div className="mt-6 border-t border-slate-200 pt-5">
                <p className="text-xs font-semibold text-slate-500">
                  현재 참여
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  전문가 2명 · 질문자 1명
                </p>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
