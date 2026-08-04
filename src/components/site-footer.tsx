import Link from "next/link";
import { brand } from "@/config/brand";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-7 px-5 py-9 sm:grid-cols-[1fr_auto]">
        <div>
          <p className="font-black text-slate-800">
            {brand.name}
          </p>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            고장 경험을 나누고 전문가의 공개 답변을
            확인한 뒤 필요한 경우 안전하게 수리를
            요청하는 커뮤니티입니다.
          </p>
        </div>

        <nav
          aria-label="하단 메뉴"
          className="flex flex-wrap content-start gap-x-5 gap-y-3 text-sm text-slate-500"
        >
          <Link
            href="/questions"
            className="hover:text-blue-700"
          >
            질문
          </Link>

          <Link
            href="/terms"
            className="hover:text-blue-700"
          >
            이용약관
          </Link>

          <Link
            href="/privacy"
            className="hover:text-blue-700"
          >
            개인정보처리방침
          </Link>
        </nav>
      </div>
    </footer>
  );
}
