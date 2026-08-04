import Image from "next/image";
import Link from "next/link";
import {
  communityPosts,
  type CommunityPost,
} from "@/data/home-community";

function StatusBadge({
  post,
}: {
  post: CommunityPost;
}) {
  if (!post.status) {
    return null;
  }

  const style =
    post.status === "해결 완료"
      ? "bg-emerald-50 text-emerald-700"
      : post.status === "답변 대기"
        ? "bg-amber-50 text-amber-700"
        : "bg-blue-50 text-blue-700";

  return (
    <span
      className={`rounded-md px-2 py-1 text-xs font-semibold ${style}`}
    >
      {post.status}
    </span>
  );
}

function PostMeta({
  post,
}: {
  post: CommunityPost;
}) {
  return (
    <p className="text-xs text-slate-400">
      {post.author}
      <span className="mx-1.5">·</span>
      {post.createdAt}
      <span className="mx-1.5">·</span>
      답변 {post.commentCount}
      <span className="mx-1.5">·</span>
      조회 {post.viewCount.toLocaleString()}
    </p>
  );
}

export function HomeCommunityFeed() {
  const featuredPost = communityPosts[0];
  const secondaryPosts = communityPosts.slice(1, 3);
  const latestPosts = communityPosts.slice(3, 9);

  return (
    <div className="space-y-11">
      <section aria-labelledby="featured-heading">
        <div className="flex items-end justify-between border-b border-slate-200 pb-4">
          <div>
            <p className="text-sm font-bold text-blue-700">
              지금 많이 보는 글
            </p>

            <h2
              id="featured-heading"
              className="mt-1 text-2xl font-black tracking-tight text-slate-950"
            >
              커뮤니티 주요 글
            </h2>
          </div>

          <Link
            href="/questions"
            className="text-sm font-semibold text-slate-500 hover:text-blue-700"
          >
            전체 보기
          </Link>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(260px,0.75fr)]">
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <Link
              href={featuredPost.href}
              className="block"
            >
              <div className="relative aspect-[16/7] overflow-hidden bg-slate-100">
                <Image
                  src="/images/questions/roborock-s8-charging-1.jpg"
                  alt="충전독 앞에 놓인 로봇청소기"
                  fill
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-blue-700">
                    {featuredPost.category}
                  </span>

                  <StatusBadge post={featuredPost} />
                </div>

                <h3 className="mt-3 text-xl font-black leading-8 text-slate-950 hover:text-blue-700">
                  {featuredPost.title}
                </h3>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                  {featuredPost.excerpt}
                </p>

                <div className="mt-5">
                  <PostMeta post={featuredPost} />
                </div>
              </div>
            </Link>
          </article>

          <div className="grid gap-4">
            {secondaryPosts.map((post) => (
              <article
                key={post.id}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-blue-700">
                    {post.category}
                  </span>

                  <StatusBadge post={post} />
                </div>

                <h3 className="mt-3 text-base font-bold leading-6 text-slate-950">
                  <Link
                    href={post.href}
                    className="hover:text-blue-700"
                  >
                    {post.title}
                  </Link>
                </h3>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
                  {post.excerpt}
                </p>

                <div className="mt-4">
                  <PostMeta post={post} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="latest-heading">
        <div className="flex items-end justify-between border-b border-slate-200 pb-4">
          <div>
            <p className="text-sm font-bold text-slate-500">
              최근 활동
            </p>

            <h2
              id="latest-heading"
              className="mt-1 text-2xl font-black tracking-tight text-slate-950"
            >
              최신 커뮤니티 글
            </h2>
          </div>

          <Link
            href="/questions"
            className="text-sm font-semibold text-slate-500 hover:text-blue-700"
          >
            더 보기
          </Link>
        </div>

        <div className="divide-y divide-slate-200">
          {latestPosts.map((post) => (
            <article
              key={post.id}
              className="grid gap-3 py-5 sm:grid-cols-[110px_minmax(0,1fr)_120px] sm:items-center"
            >
              <div className="flex items-center gap-2 sm:block">
                <p className="text-xs font-bold text-blue-700">
                  {post.category}
                </p>

                <div className="mt-0 sm:mt-2">
                  <StatusBadge post={post} />
                </div>
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-base font-bold text-slate-900">
                  <Link
                    href={post.href}
                    className="hover:text-blue-700"
                  >
                    {post.title}
                  </Link>
                </h3>

                <p className="mt-2 text-xs text-slate-400 sm:hidden">
                  {post.author} · {post.createdAt} · 답변{" "}
                  {post.commentCount}
                </p>
              </div>

              <div className="hidden text-right sm:block">
                <p className="text-xs text-slate-400">
                  {post.createdAt}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  답변 {post.commentCount} · 조회{" "}
                  {post.viewCount.toLocaleString()}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
