import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <section className="mx-auto max-w-xl px-5 py-24 text-center">
        <p className="text-sm font-black text-blue-700">
          404
        </p>

        <h1 className="mt-3 text-3xl font-black">
          페이지를 찾을 수 없습니다
        </h1>

        <p className="mt-4 text-sm leading-6 text-slate-500">
          주소가 변경되었거나 삭제된 페이지일 수
          있습니다.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="flex min-h-11 items-center rounded-lg bg-blue-600 px-5 text-sm font-bold text-white"
          >
            홈으로 이동
          </Link>

          <Link
            href="/questions"
            className="flex min-h-11 items-center rounded-lg border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700"
          >
            질문 둘러보기
          </Link>
        </div>
      </section>
    </main>
  );
}
