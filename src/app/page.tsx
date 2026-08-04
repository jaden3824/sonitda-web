import Link from "next/link";
import { HomeCommunityFeed } from "@/components/home-community-feed";
import { SiteHeader } from "@/components/site-header";
import { brand } from "@/config/brand";
import { categories } from "@/data/demo";
import {
  communityStats,
  popularTopics,
  waitingQuestions,
} from "@/data/home-community";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-center">
            <div>
              <p className="text-sm font-bold text-blue-700">
                {brand.description}
              </p>

              <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
                고장 정보를 찾고,
                <br className="hidden sm:block" />
                경험 있는 사람에게 물어보세요
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                제품 증상을 검색하고 비슷한 해결 사례와
                전문가 답변을 한곳에서 확인할 수 있습니다.
              </p>
            </div>

            <form
              action="/questions"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <label
                htmlFor="home-search"
                className="block text-sm font-bold text-slate-800"
              >
                어떤 문제가 있나요?
              </label>

              <div className="mt-3 flex">
                <input
                  id="home-search"
                  name="query"
                  type="search"
                  placeholder="예: 로봇청소기 충전 안 됨"
                  className="min-h-12 min-w-0 flex-1 rounded-l-lg border border-r-0 border-slate-300 bg-white px-4 text-sm outline-none focus:border-blue-500"
                />

                <button
                  type="submit"
                  className="min-h-12 rounded-r-lg bg-blue-600 px-5 text-sm font-bold text-white hover:bg-blue-700"
                >
                  검색
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs">
                <Link
                  href="/questions"
                  className="font-semibold text-slate-500 hover:text-blue-700"
                >
                  최근 질문 보기
                </Link>

                <Link
                  href="/questions/new"
                  className="font-bold text-blue-700 hover:underline"
                >
                  직접 질문하기
                </Link>
              </div>
            </form>
          </div>

          <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/questions?category=${category.id}`}
                className="shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:border-blue-300 hover:text-blue-700"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 lg:grid-cols-[minmax(0,1fr)_270px]">
        <HomeCommunityFeed />

        <aside className="space-y-8">
          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-sm font-black text-slate-900">
              오늘의 커뮤니티
            </h2>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {communityStats
                .slice(0, 3)
                .map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center"
                  >
                    <p className="text-lg font-black text-slate-950">
                      {stat.value}
                    </p>

                    <p className="mt-1 text-[11px] leading-4 text-slate-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="font-black text-slate-900">
                답변을 기다려요
              </h2>

              <Link
                href="/questions?status=waiting"
                className="text-xs font-semibold text-slate-400 hover:text-blue-700"
              >
                전체
              </Link>
            </div>

            <div className="divide-y divide-slate-200">
              {waitingQuestions
                .slice(0, 3)
                .map((question) => (
                  <article
                    key={question.id}
                    className="py-4"
                  >
                    <p className="text-xs font-bold text-amber-700">
                      {question.category}
                    </p>

                    <h3 className="mt-2 text-sm font-bold leading-6 text-slate-800">
                      <Link
                        href={question.href}
                        className="hover:text-blue-700"
                      >
                        {question.title}
                      </Link>
                    </h3>

                    <p className="mt-2 text-xs text-slate-400">
                      {question.createdAt}
                    </p>
                  </article>
                ))}
            </div>
          </section>

          <section>
            <h2 className="border-b border-slate-200 pb-3 font-black text-slate-900">
              많이 찾는 증상
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {popularTopics
                .slice(0, 6)
                .map((topic) => (
                  <Link
                    key={topic}
                    href={`/questions?query=${encodeURIComponent(
                      topic,
                    )}`}
                    className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-500 ring-1 ring-slate-200 hover:text-blue-700 hover:ring-blue-300"
                  >
                    {topic}
                  </Link>
                ))}
            </div>
          </section>

          <section className="rounded-2xl bg-slate-900 p-5 text-white">
            <h2 className="font-black">
              해결되지 않는 문제가 있나요?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              제품명과 증상을 남기면 경험자와 전문가가
              공개적으로 답변합니다.
            </p>

            <Link
              href="/questions/new"
              className="mt-5 flex min-h-11 items-center justify-center rounded-lg bg-white px-4 text-sm font-bold text-slate-950 hover:bg-slate-100"
            >
              질문 작성
            </Link>
          </section>
        </aside>
      </div>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-7 text-sm text-slate-400 sm:flex-row sm:justify-between">
          <p>
            <strong className="text-slate-700">
              {brand.name}
            </strong>{" "}
            · {brand.description}
          </p>

          <p>{brand.shortSlogan}</p>
        </div>
      </footer>
    </main>
  );
}
