"use client";

import {
  type FormEvent,
  useState,
} from "react";
import { currentUser } from "@/data/my-page";

export function AccountSettingsForm() {
  const [message, setMessage] =
    useState("");

  const [isError, setIsError] =
    useState(false);

  function handlePasswordSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const formData = new FormData(
      event.currentTarget,
    );

    const currentPassword = String(
      formData.get("currentPassword") ?? "",
    );

    const newPassword = String(
      formData.get("newPassword") ?? "",
    );

    const confirmPassword = String(
      formData.get("confirmPassword") ?? "",
    );

    if (!currentPassword) {
      setIsError(true);
      setMessage(
        "현재 비밀번호를 입력해 주세요.",
      );
      return;
    }

    if (
      newPassword.length < 8 ||
      !/[A-Za-z]/.test(newPassword) ||
      !/[0-9]/.test(newPassword)
    ) {
      setIsError(true);
      setMessage(
        "새 비밀번호는 영문과 숫자를 포함해 8자 이상이어야 합니다.",
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setIsError(true);
      setMessage(
        "새 비밀번호 확인이 일치하지 않습니다.",
      );
      return;
    }

    setIsError(false);
    setMessage(
      "현재는 화면 테스트 단계이므로 비밀번호가 서버에 변경되지는 않습니다.",
    );

    event.currentTarget.reset();
  }

  function requestAccountDeletion() {
    const confirmed = window.confirm(
      "회원 탈퇴 요청 화면을 확인할까요? 현재는 실제 계정이 삭제되지 않습니다.",
    );

    if (!confirmed) {
      return;
    }

    setIsError(false);
    setMessage(
      "실제 회원 탈퇴는 인증 서버 연결 후 구현됩니다.",
    );
  }

  return (
    <div className="space-y-6">
      {message && (
        <p
          role={isError ? "alert" : "status"}
          className={`border px-4 py-3 text-sm font-semibold ${
            isError
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-blue-200 bg-blue-50 text-blue-800"
          }`}
        >
          {message}
        </p>
      )}

      <section className="border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold">
          계정 정보
        </h2>

        <dl className="mt-5 divide-y divide-slate-200 border-y border-slate-200 text-sm">
          <div className="grid gap-2 py-4 sm:grid-cols-[140px_1fr]">
            <dt className="font-semibold text-slate-500">
              아이디
            </dt>

            <dd className="font-semibold">
              {currentUser.username}
            </dd>
          </div>

          <div className="grid gap-2 py-4 sm:grid-cols-[140px_1fr]">
            <dt className="font-semibold text-slate-500">
              이메일
            </dt>

            <dd className="font-semibold">
              {currentUser.email}
            </dd>
          </div>

          <div className="grid gap-2 py-4 sm:grid-cols-[140px_1fr]">
            <dt className="font-semibold text-slate-500">
              회원 유형
            </dt>

            <dd className="font-semibold">
              {currentUser.memberType}
            </dd>
          </div>
        </dl>
      </section>

      <form
        onSubmit={handlePasswordSubmit}
        className="border border-slate-200 bg-white p-6"
      >
        <h2 className="text-lg font-bold">
          비밀번호 변경
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          영문과 숫자를 포함해 8자 이상으로
          설정해 주세요.
        </p>

        <div className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="current-password"
              className="block text-sm font-bold"
            >
              현재 비밀번호
            </label>

            <input
              id="current-password"
              name="currentPassword"
              type="password"
              autoComplete="current-password"
              className="mt-2 min-h-12 w-full border border-slate-300 px-4 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="new-password"
              className="block text-sm font-bold"
            >
              새 비밀번호
            </label>

            <input
              id="new-password"
              name="newPassword"
              type="password"
              autoComplete="new-password"
              className="mt-2 min-h-12 w-full border border-slate-300 px-4 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-bold"
            >
              새 비밀번호 확인
            </label>

            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              className="mt-2 min-h-12 w-full border border-slate-300 px-4 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="min-h-11 rounded-lg bg-blue-600 px-5 text-sm font-bold text-white hover:bg-blue-700"
          >
            비밀번호 변경
          </button>
        </div>
      </form>

      <section className="border border-red-200 bg-white p-6">
        <h2 className="text-lg font-bold text-red-700">
          회원 탈퇴
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          실제 서비스에서는 진행 중인 수리 요청과
          정산 여부를 확인한 뒤 탈퇴를 처리합니다.
        </p>

        <button
          type="button"
          onClick={requestAccountDeletion}
          className="mt-5 min-h-11 border border-red-300 px-5 text-sm font-bold text-red-700 hover:bg-red-50"
        >
          회원 탈퇴 요청
        </button>
      </section>
    </div>
  );
}
