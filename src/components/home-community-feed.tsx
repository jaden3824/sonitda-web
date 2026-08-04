"use client";

import Link from "next/link";
import { useState } from "react";
import {
  communityPosts,
  type CommunityPostStatus,
  type CommunityPostType,
} from "@/data/home-community";

type FeedFilter = "전체" | CommunityPostType;

const filters: FeedFilter[] = [
  "전체",
  "질문",
  "해결 기록",
  "사용 팁",
];

const typeStyles: Record<
  CommunityPostType,
  string
> = {
  질문:
    "border-blue-200 bg-blue-50 text-blue-700",
  "해결 기록":
    "border-emerald-200 bg-emerald-50 text-emerald-700",
  "사용 팁":
    "border-slate-300 bg-slate-100 text-slate-700",
};

const statusStyles: Record<
  CommunityPostStatus,
  string
> = {
  "답변 대기": "text-amber-700",
  "진단 중": "text-blue-700",
  "해결 완료": "text-emerald-700",
};

export function HomeCommunityFeed() {
  const [selectedFilter, setSelectedFilter] =
    useState<FeedFilter>("전체");

  const filteredPosts =
    selectedFilter === "전체"
      ? communityPosts
      : communityPosts.filter(
          (post) =>
            post.type === selectedFilter,
        );

  return (
    <section aria-labelledby="community-feed-title">
      <header className="border-b border-slate-300 pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-700">
              실시간 커뮤니티
            </p>

            <h2
              id="community-feed-title"
              className="mt-1 text-2xl font-bold tracking-tight text-slate-950"
            >
              지금 올라오는 글
            </h2>
          </div>

          <Link
            href="/questions"
            className="text-sm font-semibold text-slate-600 hover:text-blue-700"
          >
            전체 글 보기 →
          </Link>
        </div>

        <div
          role="group"
          aria-label="커뮤니티 글 유형"
          className="mt-5 flex flex-wrap gap-2"
        >
          {filters.map((filter) => {
            const isSelected =
              selectedFilter === filter;

            const count =
              filter === "전체"
                ? communityPosts.length
                : communityPosts.filter(
                    (post) =>
                      post.type === filter,
                  ).length;

            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isSelected}
                onClick={() =>
                  setSelectedFilter(filter)
                }
                className={`min-h-10 border px-4 text-sm font-semibold ${
                  isSelected
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-300 bg-white text-slate-600 hover:border-slate-500 hover:text-slate-900"
                }`}
              >
                {filter} {count}
              </button>
            );
          })}
        </div>
      </header>

      <div className="divide-y divide-slate-200 border-b border-slate-300">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="py-6"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span
                className={`border px-2.5 py-1 font-semibold ${
                  typeStyles[post.type]
                }`}
              >
                {post.type}
              </span>

              <span className="font-semibold text-slate-500">
                {post.category}
              </span>

              {post.status && (
                <>
                  <span
                    aria-hidden="true"
                    className="text-slate-300"
                  >
                    ·
                  </span>

                  <span
                    className={`font-semibold ${
                      statusStyles[
                        post.status
                      ]
                    }`}
                  >
                    {post.status}
                  </span>
                </>
              )}

              <span
                aria-hidden="true"
                className="text-slate-300"
              >
                ·
              </span>

              <span className="text-slate-400">
                {post.createdAt}
              </span>
            </div>

            <h3 className="mt-3 text-lg font-bold leading-7 text-slate-950">
              <Link
                href={post.href}
                className="hover:text-blue-700 hover:underline"
              >
                {post.title}
              </Link>
            </h3>

            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
              {post.excerpt}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/questions?query=${encodeURIComponent(
                    tag,
                  )}`}
                  className="bg-slate-100 px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-200"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            <footer className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
              <span>
                {post.author} ·{" "}
                {post.authorRole}
              </span>

              <span>
                댓글 {post.commentCount}
              </span>

              <span>
                도움됨 {post.helpfulCount}
              </span>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
