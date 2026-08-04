import Link from "next/link";
import { HomeCommunityFeed } from "@/components/home-community-feed";
import { SiteHeader } from "@/components/site-header";
import { brand } from "@/config/brand";
import {
  categories,
  recentCases,
} from "@/data/demo";
import {
  communityStats,
  popularTopics,
  waitingQuestions,
} from "@/data/home-community";

const solvedCases = recentCases.filter(
  (item) => item.status === "해결 완료",
);

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <SiteHeader />

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-18">
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-blue-700">
              {brand.description}
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">
              고장 경험을 나누고,
              <br />
              함께 해결합니다
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              제품 증상을 질문하고 사용자 경험과
              전문가의 진단을 비교해 보세요. 필요한
              경우 답변한 전문가에게 수리도 요청할 수
              있습니다.
            </p>

            <form
              action="/questions"
              className="mt-8 flex max-w-2xl flex-col gap-2 sm:flex-row"
            >
              <label
                htmlFor="home-search"
                className="sr-only"
              >
                제품 또는 고장 증상 검색
              </label>

              <input
                id="home-search"
                name="query"
                type="search"
                placeholder="예: 로봇청소기 충전 안 됨, 모니터 화면 깜빡임"
                className="min-h-13 min-w-0 flex-1 border border-slate-400 bg-white px-4 text-sm outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

              <button
                type="submit"
                className="min-h-13 bg-blue-600 px-6 text-sm font-bold text-white hover:bg-blue-700"
              >
                검색
              </button>
            </form>

            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link
                href="/questions/new"
                className="font-bold text-blue-700 hover:underline"
              >
                직접 질문하기
              </Link>

              <Link
                href="/questions"
                className="font-semibold text-slate-600 hover:text-slate-900"
              >
                최근 질문 둘러보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="커뮤니티 현황"
        className="border-b border-slate-200"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-5 sm:grid-cols-4">
          {communityStats.map(
            (stat, index) => (
              <div
                key={stat.label}
                className={`py-6 ${
                  index % 2 === 0
                    ? "border-r border-slate-200 pr-5"
                    : "pl-5"
                } ${
                  index >= 2
                    ? "border-t border-slate-200 sm:border-t-0"
                    : ""
                } sm:border-r sm:border-slate-200 sm:px-6 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0`}
              >
                <p className="text-2xl font-bold text-slate-950">
                  {stat.value}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {stat.label}
                </p>
              </div>
            ),
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">
          <HomeCommunityFeed />

          <aside className="space-y-9">
            <section>
              <header className="border-b border-slate-300 pb-4">
                <p className="text-sm font-semibold text-amber-700">
                  답변 참여
                </p>

                <h2 className="mt-1 text-xl font-bold">
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
                      <p className="text-xs font-semibold text-slate-500">
                        {question.category} ·{" "}
                        {question.createdAt}
                      </p>

                      <h3 className="mt-2 text-sm font-bold leading-6">
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
                className="mt-4 inline-flex text-sm font-semibold text-blue-700 hover:underline"
              >
                답변 대기 질문 더 보기 →
              </Link>
            </section>

            <section>
              <header className="border-b border-slate-300 pb-4">
                <h2 className="text-xl font-bold">
                  많이 찾는 주제
                </h2>
              </header>

              <div className="mt-4 flex flex-wrap gap-2">
                {popularTopics.map((topic) => (
                  <Link
                    key={topic}
                    href={`/questions?query=${encodeURIComponent(
                      topic,
                    )}`}
                    className="border border-slate-300 bg-white px-3 py-2 text-sm text-slate-600 hover:border-blue-500 hover:text-blue-700"
                  >
                    {topic}
                  </Link>
                ))}
              </div>
            </section>

            <section className="border border-slate-300 bg-slate-50 p-5">
              <h2 className="font-bold">
                고장 증상을 알고 계신가요?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                모델명과 증상을 구체적으로 적으면
                비슷한 경험을 가진 사용자와 전문가가
                더 정확하게 답변할 수 있습니다.
              </p>

              <Link
                href="/questions/new"
                className="mt-5 flex min-h-11 items-center justify-center bg-slate-900 px-4 text-sm font-bold text-white hover:bg-slate-800"
              >
                질문 작성
              </Link>
            </section>
          </aside>
        </div>
      </div>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <header className="flex flex-col gap-3 border-b border-slate-300 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-700">
                분야별 탐색
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                제품 카테고리
              </h2>
            </div>

            <p className="text-sm text-slate-500">
              모델을 몰라도 제품 종류부터 찾아볼 수
              있습니다.
            </p>
          </header>

          <div className="mt-6 grid border-l border-t border-slate-300 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/questions?category=${category.id}`}
                className="min-h-36 border-b border-r border-slate-300 bg-white p-5 hover:bg-blue-50"
              >
                <span
                  aria-hidden="true"
                  className="text-2xl"
                >
                  {category.icon}
                </span>

                <h3 className="mt-4 font-bold">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <header className="flex flex-col gap-3 border-b border-slate-300 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-700">
              해결 사례
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              커뮤니티에서 해결된 문제
            </h2>
          </div>

          <Link
            href="/questions?status=solved"
            className="text-sm font-semibold text-slate-600 hover:text-blue-700"
          >
            해결된 질문 더 보기 →
          </Link>
        </header>

        <div className="divide-y divide-slate-200 border-b border-slate-300">
          {solvedCases.map((item) => (
            <article
              key={item.id}
              className="grid gap-4 py-6 md:grid-cols-[minmax(0,1fr)_220px]"
            >
              <div>
                <p className="text-sm text-slate-500">
                  {item.category} · {item.brand} ·{" "}
                  {item.model}
                </p>

                <h3 className="mt-2 text-lg font-bold leading-7">
                  <Link
                    href={`/questions?query=${encodeURIComponent(
                      item.title,
                    )}`}
                    className="hover:text-blue-700 hover:underline"
                  >
                    {item.title}
                  </Link>
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  해결 방법:{" "}
                  <strong className="font-semibold text-slate-800">
                    {item.resolution}
                  </strong>
                </p>
              </div>

              <dl className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-4 text-sm md:border-l md:border-t-0 md:pl-6 md:pt-0">
                <div>
                  <dt className="text-slate-400">
                    참여 전문가
                  </dt>

                  <dd className="mt-1 font-bold">
                    {item.expertCount}명
                  </dd>
                </div>

                <div>
                  <dt className="text-slate-400">
                    수리 비용
                  </dt>

                  <dd className="mt-1 font-bold">
                    {item.repairCost === 0
                      ? "자가 해결"
                      : item.repairCost
                        ? `${item.repairCost.toLocaleString()}원`
                        : "미공개"}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-2xl font-bold">
                혼자 판단하기 어려운 고장,
                먼저 질문해 보세요
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                답변을 확인한 뒤 필요한 경우에만
                사업자 인증 전문가에게 수리를 요청할 수
                있습니다.
              </p>
            </div>

            <Link
              href="/questions/new"
              className="flex min-h-12 items-center justify-center bg-white px-6 text-sm font-bold text-slate-950 hover:bg-slate-100"
            >
              질문 등록하기
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            <strong className="text-white">
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
