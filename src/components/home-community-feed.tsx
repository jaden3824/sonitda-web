import Link from "next/link";
import {
  homeQuestions,
  type CommunityPost,
} from "@/data/home-community";

function StatusBadge({
  status,
}: {
  status: CommunityPost["status"];
}) {
  if (!status) {
    return null;
  }

  const className =
    status === "해결 완료"
      ? "bg-emerald-50 text-emerald-700"
      : status === "답변 대기"
        ? "bg-amber-50 text-amber-700"
        : "bg-blue-50 text-blue-700";

  return (
    <span
      className={`rounded-md px-2.5 py-1 text-xs font-semibold ${className}`}
    >
      {status}
    </span>
  );
}

export function HomeCommunityFeed() {
  return (
    <section aria-labelledby="recent-question-title">
      <header className="flex items-end justify-between border-b border-slate-200 pb-4">
        <div>
          <p className="text-sm font-bold text-blue-700">
            최근 질문
          </p>

          <h2
            id="recent-question-title"
            className="mt-1 text-2xl font-black tracking-tight text-slate-950"
          >
            비슷한 고장 사례를 찾아보세요
          </h2>
        </div>

        <Link
          href="/questions"
          className="text-sm font-semibold text-slate-500 hover:text-blue-700"
        >
          전체 보기
        </Link>
      </header>

      <div className="divide-y divide-slate-200">
        {homeQuestions.map((question) => (
          <article
            key={question.id}
            className="grid gap-3 py-5 sm:grid-cols-[minmax(0,1fr)_90px] sm:items-center"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge
                  status={question.status}
                />

                <span className="text-xs font-semibold text-slate-500">
                  {question.category}
                </span>

                <span className="text-xs text-slate-400">
                  {question.brand} · {question.model}
                </span>
              </div>

              <h3 className="mt-2 text-base font-bold leading-6 text-slate-900 sm:text-lg">
                <Link
                  href={question.href}
                  className="hover:text-blue-700 hover:underline"
                >
                  {question.title}
                </Link>
              </h3>

              <p className="mt-2 line-clamp-1 text-sm text-slate-500">
                {question.excerpt}
              </p>

              <p className="mt-3 text-xs text-slate-400">
                {question.author}
                <span className="mx-1.5">·</span>
                {question.createdAt}
                <span className="mx-1.5">·</span>
                조회{" "}
                {question.viewCount.toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm sm:block sm:text-center">
              <p className="font-black text-slate-800">
                {question.commentCount}
              </p>

              <p className="text-xs text-slate-400">
                답변
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
