import Link from "next/link";
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
    post.author,
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
    <main className="min-h-screen bg-white text-slate-900">
      <SiteHeader />

      <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6">
        <header className="flex flex-col gap-5 border-b-2 border-slate-900 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight">
              질문
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              증상이 비슷한 질문을 찾아보거나 새로운
              질문을 등록하세요.
            </p>
          </div>

          <Link
            href="/questions/new"
            className="flex min-h-11 items-center justify-center bg-blue-600 px-5 text-sm font-bold text-white hover:bg-blue-700"
          >
            질문 작성
          </Link>
        </header>

        <form
          action="/questions"
          className="grid gap-3 border-b border-slate-300 bg-slate-50 p-4 md:grid-cols-[minmax(0,1fr)_180px_150px_auto]"
        >
          <input
            name="query"
            type="search"
            defaultValue={query}
            placeholder="제품명, 모델명 또는 증상 검색"
            className="min-h-11 min-w-0 border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-600"
          />

          <select
            name="category"
            defaultValue={categoryParam}
            className="min-h-11 border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-600"
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
            className="min-h-11 border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-600"
          >
            <option value="new">
              최신 순
            </option>
            <option value="active">
              활동 순
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
            className="min-h-11 bg-slate-900 px-5 text-sm font-bold text-white hover:bg-slate-800"
          >
            적용
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-300 py-4">
          <p className="text-sm font-semibold">
            총 {questions.length}개
          </p>

          <div className="flex gap-4 text-sm">
            <Link
              href="/questions"
              className={
                !status
                  ? "font-bold text-blue-700"
                  : "text-slate-500"
              }
            >
              전체
            </Link>

            <Link
              href="/questions?status=waiting"
              className={
                status === "waiting"
                  ? "font-bold text-blue-700"
                  : "text-slate-500"
              }
            >
              답변 대기
            </Link>

            <Link
              href="/questions?status=solved"
              className={
                status === "solved"
                  ? "font-bold text-blue-700"
                  : "text-slate-500"
              }
            >
              해결 완료
            </Link>
          </div>
        </div>

        {questions.length > 0 ? (
          <div className="divide-y divide-slate-200 border-b border-slate-300">
            {questions.map((question) => (
              <article
                key={question.id}
                className="flex gap-4 py-6"
              >
                <div className="hidden w-24 shrink-0 text-center sm:block">
                  <p className="text-lg font-black">
                    {question.commentCount}
                  </p>
                  <p className="text-xs text-slate-400">
                    답변
                  </p>

                  <p className="mt-3 text-sm font-semibold text-slate-600">
                    {question.viewCount.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-400">
                    조회
                  </p>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="font-bold text-blue-700">
                      {question.category}
                    </span>

                    <span
                      className={
                        question.status ===
                        "해결 완료"
                          ? "font-semibold text-emerald-700"
                          : question.status ===
                              "답변 대기"
                            ? "font-semibold text-amber-700"
                            : "font-semibold text-slate-500"
                      }
                    >
                      {question.status}
                    </span>
                  </div>

                  <h2 className="mt-2 text-lg font-bold leading-7">
                    <Link
                      href={question.href}
                      className="hover:text-blue-700 hover:underline"
                    >
                      {question.hasAcceptedAnswer && (
                        <span className="mr-2 text-emerald-600">
                          ✓
                        </span>
                      )}
                      {question.title}
                    </Link>
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                    {question.excerpt}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {question.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/questions?query=${encodeURIComponent(
                          tag,
                        )}`}
                        className="bg-slate-100 px-2 py-1 text-xs text-slate-500"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>

                  <footer className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-400">
                    <span>
                      {question.author}
                    </span>

                    <span>
                      {question.createdAt}
                    </span>

                    <span className="sm:hidden">
                      답변 {question.commentCount}
                    </span>

                    <span className="sm:hidden">
                      조회{" "}
                      {question.viewCount.toLocaleString()}
                    </span>
                  </footer>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <section className="border-b border-slate-300 py-20 text-center">
            <h2 className="font-bold">
              조건에 맞는 질문이 없습니다
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              검색어 또는 필터를 변경해 보세요.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
