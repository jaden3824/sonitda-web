import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import {
  categories,
  recentCases,
  type CasePreview,
} from "@/data/demo";

type QuestionsPageProps = {
  searchParams: Promise<{
    query?: string | string[];
    category?: string | string[];
  }>;
};

const statusStyles: Record<CasePreview["status"], string> = {
  "답변 대기": "bg-amber-50 text-amber-700 ring-amber-200",
  "진단 중": "bg-blue-50 text-blue-700 ring-blue-200",
  "해결 완료": "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

function getFirstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function formatRepairCost(cost: number) {
  return cost === 0 ? "비용 없이 해결" : `${cost.toLocaleString("ko-KR")}원`;
}

export default async function QuestionsPage({
  searchParams,
}: QuestionsPageProps) {
  const params = await searchParams;
  const query = getFirstValue(params.query).trim();
  const categoryId = getFirstValue(params.category);

  const selectedCategory = categories.find(
    (category) => category.id === categoryId,
  );

  const normalizedQuery = query.toLocaleLowerCase("ko-KR");

  const filteredCases = recentCases.filter((item) => {
    const matchesCategory =
      !selectedCategory || item.category === selectedCategory.name;

    const searchableText = [
      item.category,
      item.brand,
      item.model,
      item.title,
      item.resolution ?? "",
    ]
      .join(" ")
      .toLocaleLowerCase("ko-KR");

    const matchesQuery =
      normalizedQuery.length === 0 ||
      searchableText.includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:py-12">
          <p className="text-sm font-semibold text-blue-600">
            수리 질문 커뮤니티
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            질문 둘러보기
          </h1>

          <p className="mt-3 text-slate-600">
            제품명, 모델명 또는 증상으로 기존 질문과 해결 사례를 찾아보세요.
          </p>

          <form
            action="/questions"
            className="mt-7 flex max-w-3xl flex-col gap-3 sm:flex-row"
          >
            {categoryId && (
              <input
                type="hidden"
                name="category"
                value={categoryId}
              />
            )}

            <label htmlFor="question-search" className="sr-only">
              질문 검색
            </label>

            <input
              id="question-search"
              type="search"
              name="query"
              defaultValue={query}
              placeholder="예: 다이슨 작동 중 멈춤"
              className="min-h-13 flex-1 rounded-xl border border-slate-300 bg-white px-4 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <button
              type="submit"
              className="min-h-13 rounded-xl bg-blue-600 px-7 font-semibold text-white transition hover:bg-blue-700"
            >
              검색
            </button>
          </form>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 lg:sticky lg:top-24">
            <h2 className="px-2 font-bold">제품 카테고리</h2>

            <nav
              aria-label="질문 카테고리"
              className="mt-3 space-y-1"
            >
              <Link
                href={query ? `/questions?query=${encodeURIComponent(query)}` : "/questions"}
                className={`flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold transition ${
                  !selectedCategory
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                <span>전체 질문</span>
                <span>{recentCases.length}</span>
              </Link>

              {categories.map((category) => {
                const categoryCount = recentCases.filter(
                  (item) => item.category === category.name,
                ).length;

                const href = query
                  ? `/questions?category=${category.id}&query=${encodeURIComponent(query)}`
                  : `/questions?category=${category.id}`;

                return (
                  <Link
                    key={category.id}
                    href={href}
                    className={`flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold transition ${
                      selectedCategory?.id === category.id
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span aria-hidden="true">{category.icon}</span>
                      {category.name}
                    </span>

                    <span className="text-xs">{categoryCount}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <section className="min-w-0">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">
                {selectedCategory?.name ?? "전체 카테고리"}
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                {query ? `"${query}" 검색 결과` : "최근 질문"}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500">
                총 {filteredCases.length}개
              </span>

              <Link
                href="/questions/new"
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                질문 등록
              </Link>
            </div>
          </div>

          {(query || selectedCategory) && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {selectedCategory && (
                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700">
                  {selectedCategory.name}
                </span>
              )}

              {query && (
                <span className="rounded-full bg-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-700">
                  검색: {query}
                </span>
              )}

              <Link
                href="/questions"
                className="px-2 py-1.5 text-sm font-semibold text-slate-500 hover:text-blue-600"
              >
                조건 초기화
              </Link>
            </div>
          )}

          {filteredCases.length > 0 ? (
            <div className="mt-5 space-y-4">
              {filteredCases.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-sm sm:p-6"
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
                          <span className="font-semibold text-slate-700">
                            {item.model}
                          </span>
                        </div>

                        <h3 className="mt-3 text-lg font-bold leading-7 transition group-hover:text-blue-600">
                          {item.title}
                        </h3>

                        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
                          <span>댓글 {item.commentCount}</span>
                          <span>전문가 의견 {item.expertCount}</span>
                          <span>{item.createdAt}</span>
                        </div>
                      </div>

                      <span
                        className={`w-fit shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${
                          statusStyles[item.status]
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    {item.resolution && (
                      <div className="mt-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-800">
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
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <p className="text-lg font-bold">검색된 질문이 없습니다</p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                검색어를 바꾸거나 새로운 질문을 등록해 주세요.
              </p>

              <Link
                href="/questions/new"
                className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                새 질문 등록하기
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
