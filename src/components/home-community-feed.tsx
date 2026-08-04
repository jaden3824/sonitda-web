"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  communityPosts,
  type CommunityPost,
} from "@/data/home-community";

type FeedMode =
  | "최신"
  | "활발"
  | "답변 대기"
  | "해결";

const modes: FeedMode[] = [
  "최신",
  "활발",
  "답변 대기",
  "해결",
];

function getPosts(mode: FeedMode) {
  const posts = [...communityPosts];

  if (mode === "활발") {
    return posts.sort(
      (first, second) =>
        second.commentCount +
        second.helpfulCount -
        (first.commentCount +
          first.helpfulCount),
    );
  }

  if (mode === "답변 대기") {
    return posts.filter(
      (post) =>
        post.type === "질문" &&
        post.status === "답변 대기",
    );
  }

  if (mode === "해결") {
    return posts.filter(
      (post) =>
        post.status === "해결 완료",
    );
  }

  return posts;
}

function PostMetrics({
  post,
}: {
  post: CommunityPost;
}) {
  return (
    <div className="hidden w-20 shrink-0 text-center sm:block">
      <p className="text-sm font-bold text-slate-800">
        {post.commentCount}
      </p>
      <p className="mt-0.5 text-xs text-slate-400">
        답변
      </p>

      <p className="mt-3 text-sm font-semibold text-slate-600">
        {post.viewCount.toLocaleString()}
      </p>
      <p className="mt-0.5 text-xs text-slate-400">
        조회
      </p>
    </div>
  );
}

export function HomeCommunityFeed() {
  const [mode, setMode] =
    useState<FeedMode>("최신");

  const posts = useMemo(
    () => getPosts(mode),
    [mode],
  );

  return (
    <section aria-labelledby="feed-heading">
      <header className="flex flex-col gap-4 border-b-2 border-slate-900 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1
            id="feed-heading"
            className="text-2xl font-black tracking-tight"
          >
            커뮤니티
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            고장 질문, 해결 경험과 관리 방법을
            함께 나눕니다.
          </p>
        </div>

        <Link
          href="/questions/new"
          className="text-sm font-bold text-blue-700 hover:underline"
        >
          새 질문 작성
        </Link>
      </header>

      <div className="flex items-center justify-between border-b border-slate-300">
        <div
          role="tablist"
          aria-label="글 정렬"
          className="flex overflow-x-auto"
        >
          {modes.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={mode === item}
              onClick={() => setMode(item)}
              className={`min-h-12 shrink-0 border-b-2 px-4 text-sm font-semibold ${
                mode === item
                  ? "border-blue-600 text-blue-700"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <span className="hidden text-xs text-slate-400 sm:block">
          {posts.length}개 글
        </span>
      </div>

      {posts.length > 0 ? (
        <div className="divide-y divide-slate-200 border-b border-slate-300">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex gap-4 py-5"
            >
              <PostMetrics post={post} />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                  <Link
                    href={`/questions?category=${encodeURIComponent(
                      post.category,
                    )}`}
                    className="font-bold text-blue-700"
                  >
                    {post.category}
                  </Link>

                  <span className="text-slate-300">
                    /
                  </span>

                  <span className="text-slate-500">
                    {post.type}
                  </span>

                  {post.status && (
                    <>
                      <span className="text-slate-300">
                        /
                      </span>

                      <span
                        className={
                          post.status ===
                          "해결 완료"
                            ? "font-semibold text-emerald-700"
                            : post.status ===
                                "답변 대기"
                              ? "font-semibold text-amber-700"
                              : "font-semibold text-slate-500"
                        }
                      >
                        {post.status}
                      </span>
                    </>
                  )}
                </div>

                <h2 className="mt-2 text-base font-bold leading-6 text-slate-950 sm:text-lg">
                  <Link
                    href={post.href}
                    className="hover:text-blue-700 hover:underline"
                  >
                    {post.hasAcceptedAnswer && (
                      <span className="mr-2 text-emerald-600">
                        ✓
                      </span>
                    )}
                    {post.title}
                  </Link>
                </h2>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                  {post.excerpt}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/questions?query=${encodeURIComponent(
                        tag,
                      )}`}
                      className="bg-slate-100 px-2 py-1 text-xs text-slate-500 hover:bg-slate-200"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>

                <footer className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                  <span>
                    {post.author}
                  </span>

                  <span>
                    {post.authorRole}
                  </span>

                  <span>
                    {post.createdAt}
                  </span>

                  <span className="sm:hidden">
                    답변 {post.commentCount}
                  </span>

                  <span className="sm:hidden">
                    조회{" "}
                    {post.viewCount.toLocaleString()}
                  </span>

                  <span>
                    도움됨 {post.helpfulCount}
                  </span>
                </footer>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="border-b border-slate-300 py-16 text-center">
          <p className="font-bold">
            해당 조건의 글이 없습니다
          </p>
        </div>
      )}

      <div className="mt-6 text-center">
        <Link
          href="/questions"
          className="inline-flex min-h-11 items-center border border-slate-400 bg-white px-6 text-sm font-bold text-slate-700 hover:bg-slate-50"
        >
          커뮤니티 글 더 보기
        </Link>
      </div>
    </section>
  );
}
