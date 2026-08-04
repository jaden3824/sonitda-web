"use client";

import Image from "next/image";
import {
  type ChangeEvent,
  useRef,
  useState,
} from "react";
import { profileImageConfig } from "@/config/profile";

type ProfileImagePickerProps = {
  name?: string;
  initialSrc?: string;
};

export function ProfileImagePicker({
  name = "profileImage",
  initialSrc = profileImageConfig.defaultSrc,
}: ProfileImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewSrc, setPreviewSrc] = useState(initialSrc);
  const [error, setError] = useState("");

  function handleImageChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    setError("");

    if (!file) {
      return;
    }

    if (
      !profileImageConfig.acceptedTypes.includes(
        file.type as
          | "image/jpeg"
          | "image/png"
          | "image/webp",
      )
    ) {
      setError("JPG, PNG, WEBP 형식의 사진만 등록할 수 있습니다.");
      event.target.value = "";
      return;
    }

    if (file.size > profileImageConfig.maxSizeBytes) {
      setError("프로필 사진은 5MB 이하여야 합니다.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreviewSrc(reader.result);
      }
    };

    reader.onerror = () => {
      setError("사진을 불러오는 중 오류가 발생했습니다.");
    };

    reader.readAsDataURL(file);
  }

  function restoreDefaultImage() {
    setPreviewSrc(profileImageConfig.defaultSrc);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function openFilePicker() {
    inputRef.current?.click();
  }

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
          <Image
            src={previewSrc}
            alt="프로필 사진 미리보기"
            fill
            sizes="112px"
            unoptimized={previewSrc.startsWith("data:")}
            className="object-cover"
          />
        </div>

        <div>
          <p className="font-bold text-slate-900">
            프로필 사진
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            사진을 등록하지 않으면 기본 프로필 사진이 적용됩니다.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={openFilePicker}
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              사진 선택
            </button>

            <button
              type="button"
              onClick={restoreDefaultImage}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              기본 사진 사용
            </button>
          </div>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        name={name}
        accept={profileImageConfig.accept}
        onChange={handleImageChange}
        className="sr-only"
      />

      {error && (
        <p
          role="alert"
          className="mt-3 text-sm font-semibold text-red-600"
        >
          {error}
        </p>
      )}

      <p className="mt-3 text-xs text-slate-400">
        JPG, PNG, WEBP · 최대 5MB
      </p>
    </div>
  );
}
