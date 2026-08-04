import Link from "next/link";
import { brand } from "@/config/brand";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-7 px-5">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-black text-white">
            손
          </span>

          <div>
            <p className="text-lg font-black leading-none tracking-tight text-slate-950">
              {brand.name}
            </p>

            <p className="mt-1 hidden text-[11px] text-slate-400 sm:block">
              전자제품 수리 커뮤니티
            </p>
          </div>
        </Link>

        <nav
          aria-label="주요 메뉴"
          className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex"
        >
          <Link
            href="/questions"
            className="hover:text-blue-700"
          >
            질문 둘러보기
          </Link>

          <Link
            href="/questions?status=waiting"
            className="hover:text-blue-700"
          >
            답변 대기
          </Link>

          <Link
            href="/questions?status=solved"
            className="hover:text-blue-700"
          >
            해결 사례
          </Link>
        </nav>

        <form
          action="/questions"
          className="ml-auto hidden w-full max-w-xs lg:flex"
        >
          <label
            htmlFor="header-search"
            className="sr-only"
          >
            제품과 증상 검색
          </label>

          <input
            id="header-search"
            name="query"
            type="search"
            placeholder="제품이나 증상 검색"
            className="min-h-10 min-w-0 flex-1 rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 px-3 text-sm outline-none focus:border-blue-500 focus:bg-white"
          />

          <button
            type="submit"
            className="min-h-10 rounded-r-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            검색
          </button>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-1 lg:ml-0">
          <Link
            href="/mypage"
            className="hidden min-h-10 items-center px-3 text-sm font-semibold text-slate-600 hover:text-blue-700 sm:flex"
          >
            마이페이지
          </Link>

          <Link
            href="/login"
            className="hidden min-h-10 items-center px-3 text-sm font-semibold text-slate-600 hover:text-blue-700 md:flex"
          >
            로그인
          </Link>

          <Link
            href="/questions/new"
            className="flex min-h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-bold text-white hover:bg-blue-700"
          >
            질문하기
          </Link>
        </div>
      </div>
    </header>
  );
}
