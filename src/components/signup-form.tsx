"use client";

import {
  type FormEvent,
  useState,
} from "react";
import { ProfileImagePicker } from "@/components/profile-image-picker";

type MemberType = "user" | "expert";

export function SignupForm() {
  const [memberType, setMemberType] =
    useState<MemberType>("user");
  const [message, setMessage] = useState("");

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const password = String(
      formData.get("password") ?? "",
    );
    const passwordConfirm = String(
      formData.get("passwordConfirm") ?? "",
    );

    if (password !== passwordConfirm) {
      setMessage("비밀번호가 서로 일치하지 않습니다.");
      return;
    }

    setMessage(
      "현재는 화면 테스트 단계이므로 계정이 실제로 생성되지는 않습니다.",
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
          role="status"
          className="rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-800"
        >
          {message}
        </div>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <fieldset>
          <legend className="text-lg font-bold">
            어떻게 활동할 예정인가요?
          </legend>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            가입 후에도 전문가 인증을 별도로 신청할 수 있습니다.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label
              className={`cursor-pointer rounded-2xl border p-5 transition ${
                memberType === "user"
                  ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                name="memberType"
                value="user"
                checked={memberType === "user"}
                onChange={() => setMemberType("user")}
                className="sr-only"
              />

              <span className="text-2xl" aria-hidden="true">
                🙋
              </span>

              <span className="mt-3 block font-bold">
                일반 사용자
              </span>

              <span className="mt-2 block text-sm leading-6 text-slate-600">
                고장 질문을 올리고 답변과 수리 도움을 받습니다.
              </span>
            </label>

            <label
              className={`cursor-pointer rounded-2xl border p-5 transition ${
                memberType === "expert"
                  ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                name="memberType"
                value="expert"
                checked={memberType === "expert"}
                onChange={() => setMemberType("expert")}
                className="sr-only"
              />

              <span className="text-2xl" aria-hidden="true">
                🧰
              </span>

              <span className="mt-3 block font-bold">
                전문가로 활동
              </span>

              <span className="mt-2 block text-sm leading-6 text-slate-600">
                경험과 전문 지식을 바탕으로 질문에 답변합니다.
              </span>
            </label>
          </div>
        </fieldset>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-bold">
          프로필 사진
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          가입 후 마이페이지에서도 언제든지 변경할 수 있습니다.
        </p>

        <div className="mt-5">
          <ProfileImagePicker />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-bold">
          기본 계정 정보
        </h2>

        <div className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-bold"
            >
              아이디
              <span className="ml-1 text-red-500">*</span>
            </label>

            <div className="mt-2 flex gap-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                minLength={4}
                maxLength={20}
                autoComplete="username"
                placeholder="영문과 숫자 4~20자"
                className="min-h-12 min-w-0 flex-1 rounded-xl border border-slate-300 px-4 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

              <button
                type="button"
                className="shrink-0 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                중복 확인
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="nickname"
              className="block text-sm font-bold"
            >
              닉네임
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              id="nickname"
              name="nickname"
              type="text"
              required
              minLength={2}
              maxLength={20}
              placeholder="커뮤니티에서 사용할 이름"
              className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold"
            >
              이메일
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="비밀번호 복구와 알림에 사용됩니다"
              className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold"
            >
              비밀번호
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="8자 이상 입력하세요"
              className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="passwordConfirm"
              className="block text-sm font-bold"
            >
              비밀번호 확인
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="비밀번호를 다시 입력하세요"
              className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>
      </section>

      {memberType === "expert" && (
        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <h2 className="font-bold text-blue-950">
            전문가 인증은 가입 후 진행합니다
          </h2>

          <p className="mt-2 text-sm leading-6 text-blue-800">
            가입 직후에는 일반 답변 활동이 가능합니다. 경력 인증이나
            사업자 인증을 완료하면 프로필에 인증 배지가 표시됩니다.
            유료 수리 요청은 사업자 인증을 완료한 전문가만 받을 수
            있습니다.
          </p>
        </section>
      )}

      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600">
        <input
          type="checkbox"
          name="terms"
          required
          className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300"
        />

        <span>
          이용약관과 개인정보 처리방침에 동의합니다.
          <span className="ml-1 text-red-500">(필수)</span>
        </span>
      </label>

      <button
        type="submit"
        className="min-h-13 w-full rounded-xl bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700"
      >
        {memberType === "expert"
          ? "전문가 계정 만들기"
          : "일반 사용자 계정 만들기"}
      </button>
    </form>
  );
}
