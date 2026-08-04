import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { categories } from "@/data/demo";
import {
  communityPosts,
  type CommunityPost,
} from "@/data/home-community";

type QuestionsPageProps = {
  searchParams: Promise<{
    query?: string | string[];
    category?: string | string[];
    status?: string | string[];
    sort?: string | string[];
  }>;
};

function getParam(
  value: string | string[] | undefined,
) {
  return Array.isArray(value)
    ? value[0] ?? ""
    : value ?? "";
}

function matchesQuery(
  post: CommunityPost,
  query: string,
) {
  const normalizedQuery =
    query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return [
    post.title,
    post.excerpt,
    post.category,
    post.brand,
    post.model,
    ...post.tags,
  ].some((value) =>
    value
      .toLowerCase()
      .includes(normalizedQuery),
  );
}

export default async function QuestionsPage({
  searchParams,
}: QuestionsPageProps) {
  const params = await searchParams;

  const query = getParam(params.query);
  const categoryParam = getParam(
    params.category,
  );
  const status = getParam(params.status);
  const sort = getParam(params.sort) || "new";

  const selectedCategory =
    categories.find(
      (category) =>
        category.id === categoryParam ||
        category.name === categoryParam,
    );

  let questions = communityPosts.filter(
    (post) =>
      post.type === "질문" &&
      matchesQuery(post, query) &&
      (!selectedCategory ||
        post.category ===
          selectedCategory.name) &&
      (status !== "waiting" ||
        post.status === "답변 대기") &&
      (status !== "solved" ||
        post.status === "해결 완료"),
  );

  if (sort === "active") {
    questions = [...questions].sort(
      (first, second) =>
        second.commentCount +
        second.helpfulCount -
        (first.commentCount +
          first.helpfulCount),
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <div className="mx-auto max-w-5xl px-5 py-10">
        <header className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold text-blue-700">
              커뮤니티
            </p>

            <h1 className="mt-1 text-3xl font-black tracking-tight">
              고장 질문
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              비슷한 증상을 먼저 찾고, 필요한 경우
              새로운 질문을 등록하세요.
            </p>
          </div>

          <Link
            href="/questions/new"
            className="flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-bold text-white hover:bg-blue-700"
          >
            질문 작성
          </Link>
        </header>

        <form
          action="/questions"
          className="mt-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-[minmax(0,1fr)_180px_140px_auto]"
        >
          <input
            name="query"
            type="search"
            defaultValue={query}
            placeholder="제품명, 모델명 또는 증상"
            className="min-h-11 min-w-0 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
          />

          <select
            name="category"
            defaultValue={categoryParam}
            className="min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-500"
          >
            <option value="">
              전체 카테고리
            </option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>

          <select
            name="sort"
            defaultValue={sort}
            className="min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-500"
          >
            <option value="new">
              최신 순
            </option>

            <option value="active">
              답변 많은 순
            </option>
          </select>

          {status && (
            <input
              type="hidden"
              name="status"
              value={status}
            />
          )}

          <button
            type="submit"
            className="min-h-11 rounded-lg bg-slate-900 px-5 text-sm font-bold text-white hover:bg-slate-800"
          >
            검색
          </button>
        </form>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <p className="text-sm font-semibold text-slate-600">
            총 {questions.length}개의 질문
          </p>

          <nav
            aria-label="질문 상태"
            className="flex gap-5 text-sm"
          >
            <Link
              href="/questions"
              className={
                !status
                  ? "font-bold text-blue-700"
                  : "font-semibold text-slate-400 hover:text-slate-700"
              }
            >
              전체
            </Link>

            <Link
              href="/questions?status=waiting"
              className={
                status === "waiting"
                  ? "font-bold text-blue-700"
                  : "font-semibold text-slate-400 hover:text-slate-700"
              }
            >
              답변 대기
            </Link>

            <Link
              href="/questions?status=solved"
              className={
                status === "solved"
                  ? "font-bold text-blue-700"
                  : "font-semibold text-slate-400 hover:text-slate-700"
              }
            >
              해결 완료
            </Link>
          </nav>
        </div>

        {questions.length > 0 ? (
          <div className="divide-y divide-slate-200">
            {questions.map((question) => {
              const statusClass =
                question.status === "해결 완료"
                  ? "bg-emerald-50 text-emerald-700"
                  : question.status === "답변 대기"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-blue-50 text-blue-700";

              return (
                <article
                  key={question.id}
                  className="grid gap-4 py-6 sm:grid-cols-[minmax(0,1fr)_100px]"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-md px-2.5 py-1 text-xs font-semibold ${statusClass}`}
                      >
                        {question.status}
                      </span>

                      <span className="text-xs font-semibold text-slate-500">
                        {question.category}
                      </span>

                      <span className="text-xs text-slate-400">
                        {question.brand} ·{" "}
                        {question.model}
                      </span>
                    </div>

                    <h2 className="mt-3 text-lg font-bold leading-7">
                      <Link
                        href={question.href}
                        className="hover:text-blue-700 hover:underline"
                      >
                        {question.title}
                      </Link>
                    </h2>

                    <p className="mt-2 line-clamp-1 text-sm text-slate-500">
                      {question.excerpt}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {question.tags
                        .slice(0, 2)
                        .map((tag) => (
                          <Link
                            key={tag}
                            href={`/questions?query=${encodeURIComponent(
                              tag,
                            )}`}
                            className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500 hover:text-blue-700"
                          >
                            {tag}
                          </Link>
                        ))}
                    </div>

                    <p className="mt-3 text-xs text-slate-400">
                      {question.author}
                      <span className="mx-1.5">
                        ·
                      </span>
                      {question.createdAt}
                      <span className="mx-1.5">
                        ·
                      </span>
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
              );
            })}
          </div>
        ) : (
          <section className="py-20 text-center">
            <h2 className="font-bold">
              조건에 맞는 질문이 없습니다
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              검색어 또는 필터를 변경해 보세요.
            </p>

            <Link
              href="/questions/new"
              className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-blue-600 px-5 text-sm font-bold text-white"
            >
              새 질문 작성
            </Link>
          </section>
        )}
      </div>

      <SiteFooter />
    </main>
  );
}
