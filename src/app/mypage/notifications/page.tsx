import Link from "next/link";
import { MyPageNav } from "@/components/mypage-nav";
import { NotificationSettingsForm } from "@/components/notification-settings-form";
import { SiteHeader } from "@/components/site-header";
import { currentUser } from "@/data/my-page";

export default function NotificationSettingsPage() {
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
          <span>알림 설정</span>
        </nav>

        <header className="mt-6 border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            알림 설정
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            질문 답변과 수리 진행 알림을 관리합니다.
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

          <NotificationSettingsForm />
        </div>
      </div>
    </main>
  );
}
