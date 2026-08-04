import Link from "next/link";
import { MyPageNav } from "@/components/mypage-nav";
import { RepairRequestList } from "@/components/repair-request-list";
import { SiteHeader } from "@/components/site-header";
import { currentUser } from "@/data/my-page";

export default function MyRepairRequestsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <div className="mx-auto max-w-6xl px-5 py-10">
        <nav className="text-sm text-slate-500">
          <Link
            href="/mypage"
            className="hover:text-blue-600"
          >
            마이페이지
          </Link>

          <span className="mx-2">/</span>
          <span>수리 요청</span>
        </nav>

        <header className="mt-6 border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            수리 요청
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            전문가 선택부터 상담과 완료까지 진행 상황을 확인합니다.
          </p>
        </header>

        <div className="mt-7 grid gap-7 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside>
            <section className="mb-4 border border-slate-200 bg-white p-5">
              <p className="font-bold">
                {currentUser.nickname}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                @{currentUser.username}
              </p>
            </section>

            <MyPageNav />
          </aside>

          <section className="min-w-0 border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold">
                요청 내역
              </h2>
            </div>

            <div className="mt-5">
              <RepairRequestList />
            </div>

            <p className="mt-5 text-xs leading-5 text-slate-400">
              현재는 데모 상태이며 실제 상담방이나 수리 데이터는
              저장되지 않습니다.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
