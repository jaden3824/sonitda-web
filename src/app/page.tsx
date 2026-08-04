import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { brand } from "@/config/brand";
import {
  categories,
  recentCases,
  type CasePreview,
} from "@/data/demo";

const statusStyles: Record<CasePreview["status"], string> = {
  "답변 대기": "bg-amber-50 text-amber-700 ring-amber-200",
  "진단 중": "bg-blue-50 text-blue-700 ring-blue-200",
  "해결 완료": "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

function formatRepairCost(cost: number) {
  if (cost === 0) {
    return "비용 없이 해결";
  }

  return `${cost.toLocaleString("ko-KR")}원`;
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-5 py-20 text-center sm:py-24">
          <span className="mb-5 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            사용자와 전문가가 함께 만드는 수리 커뮤니티
          </span>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            어떤 제품이 고장 났나요?
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            {brand.slogan}
          </p>

          <form
            action="/questions"
            className="mt-10 flex w-full max-w-2xl flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="home-search" className="sr-only">
              제품명, 모델명 또는 증상 검색
            </label>

            <input
              id="home-search"
              name="query"
              type="search"
              placeholder="예: 로보락 S8 충전이 안 돼요"
              className="min-h-14 flex-1 rounded-xl border border-slate-300 bg-white px-5 text-base outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="submit"
              className="min-h-14 rounded-xl bg-blue-600 px-8 font-semibold text-white transition hover:bg-blue-700"
            >
              검색
            </button>
          </form>

          <Link
            href="/questions/new"
            className="mt-5 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            찾는 내용이 없다면 질문을 등록하세요 →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-blue-600">카테고리</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              어떤 제품에 문제가 있나요?
            </h2>
          </div>

          <Link
            href="/questions"
            className="hidden text-sm font-semibold text-slate-600 hover:text-blue-600 sm:block"
          >
            전체 질문 보기 →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/questions?category=${category.id}`}
              className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
            >
              <span
                aria-hidden="true"
                className="text-3xl"
              >
                {category.icon}
              </span>

              <h3 className="mt-4 font-bold text-slate-900 group-hover:text-blue-600">
                {category.name}
              </h3>

              <p className="mt-1 hidden text-sm leading-6 text-slate-500 sm:block">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section
        id="questions"
        className="border-y border-slate-200 bg-white"
      >
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-blue-600">
                최근 질문과 해결 사례
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                실제 대화를 확인해 보세요
              </h2>
            </div>

            <Link
              href="/questions"
              className="text-sm font-semibold text-slate-600 hover:text-blue-600"
            >
              모두 보기 →
            </Link>
          </div>

          <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
            {recentCases.map((item) => (
              <article
                key={item.id}
                className="py-6 first:pt-0 last:pb-0"
              >
                <Link
                  href={`/questions/${item.id}`}
                  className="group block"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                        <span>{item.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.brand}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-medium text-slate-700">
                          {item.model}
                        </span>
                      </div>

                      <h3 className="mt-2 text-lg font-bold leading-7 text-slate-900 transition group-hover:text-blue-600">
                        {item.title}
                      </h3>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                        <span>댓글 {item.commentCount}</span>
                        <span>전문가 의견 {item.expertCount}</span>
                        <span>{item.createdAt}</span>
                      </div>

                      {item.resolution && (
                        <div className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                          <span className="font-semibold">해결 결과</span>
                          <span className="mx-2 text-emerald-300">|</span>
                          {item.resolution}

                          {typeof item.repairCost === "number" && (
                            <>
                              <span className="mx-2 text-emerald-300">·</span>
                              {formatRepairCost(item.repairCost)}
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    <span
                      className={`w-fit shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${
                        statusStyles[item.status]
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-3xl bg-slate-900 px-6 py-10 text-white sm:px-10 sm:py-12">
          <p className="text-sm font-semibold text-blue-300">
            손잇다는 이렇게 작동합니다
          </p>

          <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl">
            질문부터 해결 결과까지 하나의 기록으로 남깁니다
          </h2>

          <div className="mt-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "모델명으로 질문", "제품과 모델을 지정하고 증상을 올립니다."],
              ["02", "공개 대화", "사용자와 전문가가 댓글로 원인을 좁힙니다."],
              ["03", "전문가 선택", "답변 내용을 보고 믿을 수 있는 전문가를 선택합니다."],
              ["04", "해결 기록", "실제 원인과 수리 결과가 다음 사용자를 위해 남습니다."],
            ].map(([number, title, description]) => (
              <div key={number}>
                <span className="text-sm font-bold text-blue-300">
                  {number}
                </span>
                <h3 className="mt-3 font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-slate-700">
            {brand.name} · {brand.description}
          </p>
          <p>{brand.shortSlogan}</p>
        </div>
      </footer>
    </main>
  );
}
