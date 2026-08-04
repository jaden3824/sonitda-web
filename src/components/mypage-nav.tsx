"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    label: "내 활동",
    href: "/mypage",
  },
  {
    label: "내 질문",
    href: "/mypage/questions",
  },
  {
    label: "프로필 수정",
    href: "/mypage/profile",
  },
  {
    label: "수리 요청",
    href: "/mypage/repairs",
  },
  {
    label: "저장한 질문",
    href: "/mypage/saved",
  },
  {
    label: "알림 설정",
  },
  {
    label: "계정 설정",
  },
] as const;

export function MyPageNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="마이페이지 메뉴"
      className="border border-slate-200 bg-white p-3"
    >
      {menuItems.map((item) => {
        if (!("href" in item)) {
          return (
            <div
              key={item.label}
              aria-disabled="true"
              className="flex min-h-11 items-center justify-between px-4 text-sm text-slate-400"
            >
              <span>{item.label}</span>
              <span className="text-xs">준비 중</span>
            </div>
          );
        }

        const isActive =
          item.href === "/mypage"
            ? pathname === item.href
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`flex min-h-11 items-center border-l-2 px-4 text-sm font-semibold ${
              isActive
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
