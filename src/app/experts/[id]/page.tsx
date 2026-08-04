import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import {
  experts,
  getExpertById,
  type ExpertAvailability,
  type ExpertVerification,
} from "@/data/experts";

type ExpertProfilePageProps = {
  params: Promise<{
    id: string;
  }>;
};

const verificationStyles: Record<ExpertVerification, string> = {
  "사업자 인증": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "경력 인증": "bg-blue-50 text-blue-700 ring-blue-200",
  "인증 검토 중": "bg-amber-50 text-amber-700 ring-amber-200",
};

const availabilityStyles: Record<ExpertAvailability, string> = {
  "수리 상담 가능": "bg-emerald-50 text-emerald-700",
  "온라인 답변만 가능": "bg-blue-50 text-blue-700",
  "현재 상담 불가": "bg-slate-100 text-slate-600",
};

export function generateStaticParams() {
  return experts.map((expert) => ({
    id: expert.id,
  }));
}

export default async function ExpertProfilePage({
  params,
}: ExpertProfilePageProps) {
  const { id } = await params;
  const expert = getExpertById(id);

  if (!expert) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <div className="mx-auto max-w-5xl px-5 py-8 sm:py-12">
        <nav
          aria-label="현재 위치"
          className="flex flex-wrap items-center gap-2 text-sm text-slate-500"
        >
          <Link href="/" className="hover:text-blue-600">
            홈
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href="/questions/roborock-s8-charging"
            className="hover:text-blue-600"
          >
            질문
          </Link>
          <span aria-hidden="true">/</span>
          <span>전문가 프로필</span>
        </nav>

        <div className="mt-6 grid gap-7 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0 space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-2xl font-bold text-white">
                  {expert.name.slice(0, 1)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                      {expert.name}
                    </h1>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${
                        verificationStyles[expert.verification]
                      }`}
                    >
                      {expert.verification}
                    </span>
                  </div>

                  <p className="mt-2 text-lg font-semibold text-slate-700">
                    {expert.headline}
                  </p>

                  <p className="mt-4 leading-7 text-slate-600">
                    {expert.introduction}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
                        availabilityStyles[expert.availability]
                      }`}
                    >
                      {expert.availability}
                    </span>

                    <span className="text-sm text-slate-500">
                      경력 {expert.experienceYears}년
                    </span>

                    <span className="text-sm text-slate-500">
                      {expert.averageResponseTime}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
                <p className="text-2xl font-bold">
                  {expert.answerCount.toLocaleString("ko-KR")}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  공개 답변
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
                <p className="text-2xl font-bold">
                  {expert.helpfulCount.toLocaleString("ko-KR")}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  도움된 답변
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
                <p className="text-2xl font-bold">
                  {expert.solvedCount.toLocaleString("ko-KR")}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  해결 확인
                </p>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold">
                전문 분야
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {expert.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700"
                  >
                    {specialty}
                  </span>
                ))}
              </div>

              <div className="mt-7 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    주로 답변하는 브랜드
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {expert.brands.join(" · ")}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    활동 및 수리 가능 지역
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {expert.serviceAreas.join(" · ")}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-blue-600">
                    최근 공개 활동
                  </p>
                  <h2 className="mt-1 text-xl font-bold">
                    이 전문가가 참여한 질문
                  </h2>
                </div>
              </div>

              <Link
                href="/questions/roborock-s8-charging"
                className="group mt-5 block rounded-2xl border border-slate-200 p-5 transition hover:border-blue-200 hover:bg-blue-50/40"
              >
                <p className="text-sm text-slate-500">
                  청소가전 · 로보락 · S8 MaxV Ultra
                </p>

                <h3 className="mt-2 font-bold leading-7 group-hover:text-blue-600">
                  충전독에 올리면 표시등이 꺼지고 충전이 되지 않습니다
                </h3>

                <p className="mt-3 text-sm font-semibold text-blue-600">
                  공개 답변 확인 →
                </p>
              </Link>
            </section>
          </div>

          <aside>
            <section className="rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-24">
              <h2 className="font-bold">
                인증 및 요청 안내
              </h2>

              {expert.isBusinessVerified ? (
                <div className="mt-4 rounded-xl bg-emerald-50 px-4 py-3">
                  <p className="text-sm font-bold text-emerald-800">
                    사업자 인증 완료
                  </p>
                  <p className="mt-1 text-sm leading-6 text-emerald-700">
                    운영자가 사업자 정보를 확인한 전문가입니다.
                  </p>
                </div>
              ) : (
                <div className="mt-4 rounded-xl bg-blue-50 px-4 py-3">
                  <p className="text-sm font-bold text-blue-800">
                    온라인 답변 전문가
                  </p>
                  <p className="mt-1 text-sm leading-6 text-blue-700">
                    공개 답변은 가능하지만 유료 수리 요청은 받을 수 없습니다.
                  </p>
                </div>
              )}

              <div className="mt-5 border-t border-slate-200 pt-5">
                <p className="text-sm leading-6 text-slate-600">
                  수리 요청은 전문가 프로필에서 바로 보내는 방식이
                  아닙니다. 먼저 질문에 남긴 공개 답변을 확인한 뒤,
                  해당 답변에서 요청할 수 있습니다.
                </p>

                <Link
                  href="/questions/roborock-s8-charging"
                  className="mt-5 flex min-h-11 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  답변한 질문으로 이동
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
