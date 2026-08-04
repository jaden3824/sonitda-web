import Link from "next/link";
import { ProfileEditForm } from "@/components/profile-edit-form";
import { SiteHeader } from "@/components/site-header";

export default function ProfileEditPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <nav className="text-sm text-slate-500">
          <Link
            href="/mypage"
            className="hover:text-blue-600"
          >
            마이페이지
          </Link>

          <span className="mx-2">/</span>

          <span>프로필 수정</span>
        </nav>

        <header className="mt-6 border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            프로필 수정
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            공개 프로필에 표시되는 사진과 닉네임을 관리합니다.
          </p>
        </header>

        <div className="mt-7">
          <ProfileEditForm />
        </div>
      </div>
    </main>
  );
}
