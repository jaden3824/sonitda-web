import Link from "next/link";
import { brand } from "@/config/brand";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-17 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex flex-col">
          <span className="text-2xl font-bold tracking-tight text-blue-600">
            {brand.name}
          </span>
          <span className="text-[11px] text-slate-500">
            {brand.description}
          </span>
        </Link>

        <nav
          aria-label="주요 메뉴"
          className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex"
        >
          <Link href="/questions" className="transition hover:text-blue-600">
            질문 둘러보기
          </Link>

          <Link href="/experts" className="transition hover:text-blue-600">
            전문가
          </Link>

          <Link href="/login" className="transition hover:text-blue-600">
            로그인
          </Link>

          <Link
            href="/questions/new"
            className="rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700"
          >
            질문하기
          </Link>
        </nav>

        <Link
          href="/questions/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white md:hidden"
        >
          질문하기
        </Link>
      </div>
    </header>
  );
}
