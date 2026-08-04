import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function PrivacyPage() {
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
          개인정보처리방침
        </h1>

        <p className="mt-3 text-sm text-slate-400">
          프론트엔드 MVP 임시 문서
        </p>

        <div className="mt-9 space-y-8 text-sm leading-7 text-slate-600">
          <section>
            <h2 className="text-lg font-bold text-slate-900">
              수집 예정 정보
            </h2>

            <p className="mt-3">
              실제 서비스에서는 아이디, 닉네임,
              이메일, 프로필 사진과 서비스 이용 기록을
              계정 운영에 필요한 범위에서 처리합니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">
              브라우저 임시 저장
            </h2>

            <p className="mt-3">
              현재 MVP의 저장한 질문, 수리 요청, 후기와
              알림 설정은 서버가 아닌 사용자의 브라우저
              저장소에만 보관됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900">
              정식 문서
            </h2>

            <p className="mt-3">
              데이터베이스와 실제 회원 기능을 연결하기
              전에 개인정보 보관 기간, 위탁 업체와 삭제
              절차를 포함한 정식 방침을 작성해야 합니다.
            </p>
          </section>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
