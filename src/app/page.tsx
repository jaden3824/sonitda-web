import Link from "next/link";
import { HomeCommunityFeed } from "@/components/home-community-feed";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { brand } from "@/config/brand";
import { categories } from "@/data/demo";
import { solvedCases } from "@/data/home-community";

const serviceSteps = [
  {
    number: "1",
    title: "증상을 검색합니다",
    description:
      "같은 제품이나 비슷한 고장 사례가 이미 있는지 먼저 확인합니다.",
  },
  {
    number: "2",
    title: "질문하고 답변을 비교합니다",
    description:
      "사용자 경험과 여러 전문가의 공개 진단을 함께 살펴봅니다.",
  },
  {
    number: "3",
    title: "필요할 때만 수리를 요청합니다",
    description:
      "답변 내용을 확인한 뒤 사업자 인증 전문가에게 상담을 요청합니다.",
  },
] as const;

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold text-blue-700">
              {brand.description}
            </p>

            <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
              고장 났을 때,
              <br />
              먼저 찾아보고 물어보세요
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
              비슷한 고장 사례와 전문가의 공개 답변을
              확인하고, 해결되지 않을 때만 안전하게
              수리를 요청할 수 있습니다.
            </p>

            <form
              action="/questions"
              className="mx-auto mt-8 flex max-w-2xl rounded-xl border border-slate-300 bg-white p-1.5 shadow-sm"
            >
              <label
                htmlFor="home-search"
                className="sr-only"
              >
                제품명 또는 고장 증상 검색
              </label>

              <input
                id="home-search"
                name="query"
                type="search"
                placeholder="예: 로봇청소기 충전 안 됨"
                className="min-h-12 min-w-0 flex-1 rounded-lg px-4 text-sm outline-none placeholder:text-slate-400"
              />

              <button
                type="submit"
                className="min-h-12 shrink-0 rounded-lg bg-blue-600 px-6 text-sm font-bold text-white hover:bg-blue-700"
              >
                검색
              </button>
            </form>

            <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
              <Link
                href="/questions"
                className="font-semibold text-slate-500 hover:text-blue-700"
              >
                최근 질문 둘러보기
              </Link>

              <Link
                href="/questions/new"
                className="font-bold text-blue-700 hover:underline"
              >
                해결되지 않으면 질문하기
              </Link>
            </div>
          </div>

          <div className="mt-10 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/questions?category=${category.id}`}
                className="shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:border-blue-300 hover:text-blue-700"
              >
                {category.icon} {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 py-12">
        <HomeCommunityFeed />
      </div>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-12">
          <header className="border-b border-slate-200 pb-4">
            <p className="text-sm font-bold text-emerald-700">
              해결 사례
            </p>

            <h2 className="mt-1 text-2xl font-black tracking-tight">
              실제로 해결된 문제
            </h2>
          </header>

          <div className="grid gap-4 pt-6 md:grid-cols-3">
            {solvedCases.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-slate-200 p-5"
              >
                <p className="text-xs font-semibold text-slate-500">
                  {item.category} · {item.brand}
                </p>

                <h3 className="mt-3 font-bold leading-6 text-slate-900">
                  <Link
                    href={item.href}
                    className="hover:text-blue-700"
                  >
                    {item.title}
                  </Link>
                </h3>

                <div className="mt-5 border-t border-slate-100 pt-4">
                  <p className="text-xs text-slate-400">
                    해결 방법
                  </p>

                  <p className="mt-1 text-sm font-bold text-emerald-700">
                    {item.resolution}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12">
        <header className="text-center">
          <p className="text-sm font-bold text-blue-700">
            이용 방법
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-tight">
            공개 정보 확인부터 수리까지
          </h2>
        </header>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {serviceSteps.map((step) => (
            <article
              key={step.number}
              className="rounded-xl border border-slate-200 bg-white p-6"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-sm font-black text-blue-700">
                {step.number}
              </span>

              <h3 className="mt-5 font-black">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl bg-slate-900 px-6 py-7 text-white sm:flex-row">
          <div>
            <h2 className="text-xl font-black">
              검색해도 해결되지 않았나요?
            </h2>

            <p className="mt-2 text-sm text-slate-300">
              모델명, 증상과 시도한 방법을 적어
              질문해 보세요.
            </p>
          </div>

          <Link
            href="/questions/new"
            className="flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-white px-5 text-sm font-bold text-slate-950 hover:bg-slate-100"
          >
            질문 작성하기
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
