import Link from "next/link";
import { brand } from "@/config/brand";
import { categories } from "@/data/demo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-300 bg-white">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center gap-5 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
        >
          <span className="flex h-8 w-8 items-center justify-center bg-blue-600 text-sm font-black text-white">
            손
          </span>

          <span className="text-xl font-black tracking-tight text-slate-950">
            {brand.name}
          </span>
        </Link>

        <nav
          aria-label="주요 메뉴"
          className="hidden items-center gap-5 text-sm font-semibold text-slate-600 md:flex"
        >
          <Link
            href="/questions"
            className="hover:text-slate-950"
          >
            전체 글
          </Link>

          <Link
            href="/questions?status=waiting"
            className="hover:text-slate-950"
          >
            답변 대기
          </Link>

          <Link
            href="/questions?status=solved"
            className="hover:text-slate-950"
          >
            해결 기록
          </Link>
        </nav>

        <form
          action="/questions"
          className="ml-auto hidden min-w-0 max-w-md flex-1 lg:flex"
        >
          <label
            htmlFor="header-search"
            className="sr-only"
          >
            커뮤니티 검색
          </label>

          <input
            id="header-search"
            name="query"
            type="search"
            placeholder="제품명이나 고장 증상 검색"
            className="min-h-10 min-w-0 flex-1 border border-slate-300 bg-slate-50 px-3 text-sm outline-none focus:border-blue-600 focus:bg-white"
          />

          <button
            type="submit"
            className="min-h-10 border border-l-0 border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            검색
          </button>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
          <Link
            href="/login"
            className="hidden min-h-10 items-center px-3 text-sm font-semibold text-slate-600 hover:text-slate-950 sm:flex"
          >
            로그인
          </Link>

          <Link
            href="/questions/new"
            className="flex min-h-10 items-center bg-blue-600 px-4 text-sm font-bold text-white hover:bg-blue-700"
          >
            질문하기
          </Link>
        </div>
      </div>

      <nav
        aria-label="제품 카테고리"
        className="border-t border-slate-200 bg-slate-50"
      >
        <div className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-4 py-2.5 text-sm whitespace-nowrap sm:px-6">
          <Link
            href="/questions"
            className="font-bold text-slate-950"
          >
            전체
          </Link>

          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/questions?category=${category.id}`}
              className="text-slate-500 hover:text-blue-700"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
