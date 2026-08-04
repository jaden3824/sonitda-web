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
    <main className="min-h-screen bg-white text-slate-900">
      <SiteHeader />

      <section className="border-b border-slate-300 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-bold text-blue-700">
                {brand.description}
              </p>

              <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                고장 경험과 수리 정보를 나누는 곳
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                제품 증상을 질문하고 사용자 경험과
                전문가 답변을 함께 확인하세요.
              </p>
            </div>

            <form
              action="/questions"
              className="flex w-full max-w-xl"
            >
              <label
                htmlFor="home-search"
                className="sr-only"
              >
                고장 증상 검색
              </label>

              <input
                id="home-search"
                name="query"
                type="search"
                placeholder="제품명, 모델명 또는 고장 증상"
                className="min-h-12 min-w-0 flex-1 border border-slate-400 bg-white px-4 text-sm outline-none focus:border-blue-600"
              />

              <button
                type="submit"
                className="min-h-12 bg-slate-900 px-5 text-sm font-bold text-white hover:bg-slate-800"
              >
                검색
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:grid-cols-4 sm:px-6">
          {communityStats.map(
            (stat, index) => (
              <div
                key={stat.label}
                className={`py-4 ${
                  index % 2 === 0
                    ? "border-r border-slate-200 pr-4"
                    : "pl-4"
                } ${
                  index >= 2
                    ? "border-t border-slate-200 sm:border-t-0"
                    : ""
                } sm:border-r sm:px-5 sm:last:border-r-0`}
              >
                <p className="text-lg font-black">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {stat.label}
                </p>
              </div>
            ),
          )}
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-9 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <HomeCommunityFeed />

        <aside className="space-y-8">
          <section className="border border-slate-300">
            <div className="border-b border-slate-300 bg-slate-50 px-5 py-4">
              <h2 className="font-bold">
                질문을 등록해 보세요
              </h2>
            </div>

            <div className="p-5">
              <p className="text-sm leading-6 text-slate-600">
                제품명과 증상을 자세히 적을수록
                정확한 답변을 받을 가능성이 높아집니다.
              </p>

              <Link
                href="/questions/new"
                className="mt-4 flex min-h-11 items-center justify-center bg-blue-600 px-4 text-sm font-bold text-white hover:bg-blue-700"
              >
                질문 작성
              </Link>
            </div>
          </section>

          <section>
            <header className="border-b-2 border-slate-900 pb-3">
              <h2 className="font-black">
                답변을 기다리는 질문
              </h2>
            </header>

            <div className="divide-y divide-slate-200">
              {waitingQuestions.map(
                (question) => (
                  <article
                    key={question.id}
                    className="py-4"
                  >
                    <p className="text-xs font-semibold text-amber-700">
                      {question.category} ·{" "}
                      {question.createdAt}
                    </p>

                    <h3 className="mt-1.5 text-sm font-bold leading-6">
                      <Link
                        href={question.href}
                        className="hover:text-blue-700 hover:underline"
                      >
                        {question.title}
                      </Link>
                    </h3>
                  </article>
                ),
              )}
            </div>

            <Link
              href="/questions?status=waiting"
              className="mt-3 inline-flex text-sm font-bold text-blue-700 hover:underline"
            >
              답변 대기 전체 보기
            </Link>
          </section>

          <section>
            <header className="border-b-2 border-slate-900 pb-3">
              <h2 className="font-black">
                제품 카테고리
              </h2>
            </header>

            <div className="divide-y divide-slate-200">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/questions?category=${category.id}`}
                  className="flex min-h-11 items-center justify-between py-2 text-sm hover:text-blue-700"
                >
                  <span>
                    {category.name}
                  </span>

                  <span className="text-xs text-slate-400">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <header className="border-b-2 border-slate-900 pb-3">
              <h2 className="font-black">
                인기 검색어
              </h2>
            </header>

            <div className="mt-4 flex flex-wrap gap-2">
              {popularTopics.map((topic) => (
                <Link
                  key={topic}
                  href={`/questions?query=${encodeURIComponent(
                    topic,
                  )}`}
                  className="border border-slate-300 px-3 py-2 text-xs text-slate-600 hover:border-blue-500 hover:text-blue-700"
                >
                  {topic}
                </Link>
              ))}
            </div>
          </section>

          <section className="border-t border-slate-300 pt-5">
            <h2 className="text-sm font-bold">
              커뮤니티 운영 원칙
            </h2>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              광고성 답변보다 공개 진단과 실제 경험을
              우선합니다. 유료 수리는 사업자 인증
              전문가에게만 요청할 수 있습니다.
            </p>
          </section>
        </aside>
      </div>

      <footer className="border-t border-slate-300 bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-7 text-sm text-slate-500 sm:flex-row sm:justify-between sm:px-6">
          <p>
            <strong className="text-slate-900">
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
