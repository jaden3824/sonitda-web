"use client";

import Image from "next/image";
import {
  type ChangeEvent,
  useRef,
  useState,
} from "react";
import { profileImageConfig } from "@/config/profile";

type ProfileImageAction =
  | "keep"
  | "replace"
  | "default";

type ProfileImagePickerProps = {
  name?: string;
  initialSrc?: string;
};

export function ProfileImagePicker({
  name = "profileImage",
  initialSrc = profileImageConfig.defaultSrc,
}: ProfileImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [previewSrc, setPreviewSrc] =
    useState(initialSrc);

  const [imageAction, setImageAction] =
    useState<ProfileImageAction>("keep");

  const [error, setError] = useState("");

  function handleImageChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    setError("");

    if (!file) {
      return;
    }

    const isAllowedType =
      profileImageConfig.acceptedTypes.some(
        (type) => type === file.type,
      );

    if (!isAllowedType) {
      setError(
        "JPG, PNG, WEBP 형식의 사진만 등록할 수 있습니다.",
      );

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
        setImageAction("replace");
      }
    };

    reader.onerror = () => {
      setError(
        "사진을 불러오는 중 오류가 발생했습니다.",
      );
    };

    reader.readAsDataURL(file);
  }

  function restoreDefaultImage() {
    setPreviewSrc(profileImageConfig.defaultSrc);
    setImageAction("default");
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div>
      <input
        type="hidden"
        name={`${name}Action`}
        value={imageAction}
      />

      <div className="flex items-center gap-5">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
          <Image
            src={previewSrc}
            alt="프로필 사진 미리보기"
            fill
            sizes="96px"
            unoptimized={previewSrc.startsWith("data:")}
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-bold text-slate-900">
            프로필 사진
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            JPG, PNG, WEBP · 최대 5MB
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              사진 변경
            </button>

            <button
              type="button"
              onClick={restoreDefaultImage}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100"
            >
              기본 사진으로 복원
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
    </div>
  );
}
