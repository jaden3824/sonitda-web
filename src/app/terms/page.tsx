import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <SiteHeader />

      <article className="mx-auto max-w-3xl px-5 py-12">
        <Link
          href="/"
          className="text-sm font-semibold text-blue-700"
        >
          ← 홈으로
        </Link>

        <h1 className="mt-7 text-3xl font-black">
          이용약관
        </h1>

        <p className="mt-3 text-sm text-slate-400">
          프론트엔드 MVP 임시 문서
        </p>

        <div className="mt-9 space-y-8 text-sm leading-7 text-slate-600">
          <section>
            <h2 className="text-lg font-bold text-slate-900">
              서비스의 역할
            </h2>

            <p className="mt-3">
              손잇다는 사용자와 전문가가 전자제품의
              고장 경험과 진단 의견을 공유하고 수리
              상담을 연결할 수 있도록 돕는 커뮤니티입니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">
              게시물 책임
            </h2>

            <p className="mt-3">
              사용자는 사실에 근거한 정보를 작성해야
              하며 개인정보, 광고성 내용, 위험한 수리
              방법을 게시해서는 안 됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">
              수리 거래
            </h2>

            <p className="mt-3">
              실제 유료 수리는 전문가의 인증 상태,
              점검 범위, 비용과 제품 전달 방법을 확인한
              뒤 진행해야 합니다.
            </p>
          </section>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
