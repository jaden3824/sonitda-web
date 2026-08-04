"use client";

import {
  type FormEvent,
  useState,
} from "react";
import { ProfileImagePicker } from "@/components/profile-image-picker";
import { currentUser } from "@/data/my-page";

export function ProfileEditForm() {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const formData = new FormData(
      event.currentTarget,
    );

    const nickname = String(
      formData.get("nickname") ?? "",
    ).trim();

    const email = String(
      formData.get("email") ?? "",
    ).trim();

    if (nickname.length < 2) {
      setIsError(true);
      setMessage(
        "닉네임은 2자 이상 입력해 주세요.",
      );
      return;
    }

    if (!email.includes("@")) {
      setIsError(true);
      setMessage(
        "올바른 이메일 주소를 입력해 주세요.",
      );
      return;
    }

    setIsError(false);
    setMessage(
      "현재는 화면 테스트 단계이므로 변경 내용이 서버에 저장되지는 않습니다.",
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {message && (
        <div
          role={isError ? "alert" : "status"}
          className={`border px-4 py-3 text-sm font-semibold ${
            isError
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-blue-200 bg-blue-50 text-blue-800"
          }`}
        >
          {message}
        </div>
      )}

      <section className="border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold">
          프로필 사진
        </h2>

        <div className="mt-5">
          <ProfileImagePicker
            initialSrc={currentUser.profileImage}
          />
        </div>
      </section>

      <section className="border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold">
          기본 정보
        </h2>

        <div className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-bold"
            >
              아이디
            </label>

            <input
              id="username"
              name="username"
              type="text"
              value={currentUser.username}
              readOnly
              className="mt-2 min-h-12 w-full border border-slate-200 bg-slate-100 px-4 text-slate-500 outline-none"
            />

            <p className="mt-2 text-xs text-slate-400">
              아이디는 변경할 수 없습니다.
            </p>
          </div>

          <div>
            <label
              htmlFor="nickname"
              className="block text-sm font-bold"
            >
              닉네임
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              id="nickname"
              name="nickname"
              type="text"
              required
              minLength={2}
              maxLength={20}
              defaultValue={currentUser.nickname}
              className="mt-2 min-h-12 w-full border border-slate-300 px-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold"
            >
              이메일
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              defaultValue={currentUser.email}
              className="mt-2 min-h-12 w-full border border-slate-300 px-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-2 text-xs text-slate-400">
              알림과 계정 복구에 사용됩니다.
            </p>
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-3 border-t border-slate-200 pt-6">
        <button
          type="reset"
          className="min-h-11 border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          입력 초기화
        </button>

        <button
          type="submit"
          className="min-h-11 bg-blue-600 px-6 text-sm font-semibold text-white hover:bg-blue-700"
        >
          변경 내용 저장
        </button>
      </div>
    </form>
  );
}
