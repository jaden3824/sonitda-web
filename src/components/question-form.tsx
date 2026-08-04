"use client";

import Image from "next/image";
import {
  type ChangeEvent,
  type FormEvent,
  useState,
} from "react";
import { categories } from "@/data/demo";

type PreviewImage = {
  id: string;
  name: string;
  url: string;
};

const MAX_IMAGE_COUNT = 5;
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("사진을 읽을 수 없습니다."));
    };

    reader.onerror = () => {
      reject(new Error("사진을 읽는 중 오류가 발생했습니다."));
    };

    reader.readAsDataURL(file);
  });
}

export function QuestionForm() {
  const [modelUnknown, setModelUnknown] = useState(false);
  const [images, setImages] = useState<PreviewImage[]>([]);
  const [imageError, setImageError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  async function handleImageChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const selectedFiles = Array.from(event.target.files ?? []);
    const remainingCount = MAX_IMAGE_COUNT - images.length;

    setImageError("");

    if (remainingCount <= 0) {
      setImageError("사진은 최대 5장까지 첨부할 수 있습니다.");
      event.target.value = "";
      return;
    }

    const validFiles = selectedFiles
      .filter((file) => {
        if (!file.type.startsWith("image/")) {
          setImageError("이미지 파일만 첨부할 수 있습니다.");
          return false;
        }

        if (file.size > MAX_IMAGE_SIZE) {
          setImageError("사진 한 장의 크기는 10MB 이하여야 합니다.");
          return false;
        }

        return true;
      })
      .slice(0, remainingCount);

    try {
      const newImages = await Promise.all(
        validFiles.map(async (file, index) => ({
          id: `${file.name}-${file.lastModified}-${index}`,
          name: file.name,
          url: await readFileAsDataUrl(file),
        })),
      );

      setImages((current) => [...current, ...newImages]);

      if (selectedFiles.length > remainingCount) {
        setImageError(
          `사진은 최대 ${MAX_IMAGE_COUNT}장까지만 첨부됩니다.`,
        );
      }
    } catch {
      setImageError("사진 미리보기를 만드는 중 오류가 발생했습니다.");
    }

    event.target.value = "";
  }

  function removeImage(imageId: string) {
    setImages((current) =>
      current.filter((image) => image.id !== imageId),
    );
    setImageError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitMessage(
      "현재는 화면 테스트 단계이므로 질문이 실제로 저장되지는 않습니다.",
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
      {submitMessage && (
        <div
          role="status"
          className="rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-800"
        >
          {submitMessage}
        </div>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="border-b border-slate-200 pb-5">
          <p className="text-sm font-semibold text-blue-600">
            1단계
          </p>
          <h2 className="mt-1 text-xl font-bold">
            제품 정보를 알려주세요
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            정확한 모델명이 있으면 비슷한 고장 사례와 전문가를
            찾는 데 도움이 됩니다.
          </p>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-bold"
            >
              제품 카테고리
              <span className="ml-1 text-red-500">*</span>
            </label>

            <div className="relative mt-2">
              <select
                id="category"
                name="category"
                required
                defaultValue=""
                className="min-h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white py-3 pl-4 pr-11 text-slate-900 outline-none transition hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="" disabled>
                  카테고리를 선택하세요
                </option>

                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>

              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
              >
                <path
                  d="m6 8 4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div>
            <label
              htmlFor="brand"
              className="block text-sm font-bold"
            >
              브랜드 또는 제조사
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              id="brand"
              name="brand"
              type="text"
              required
              placeholder="예: 로보락, 삼성전자"
              className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="model"
            className="block text-sm font-bold"
          >
            모델명
            {!modelUnknown && (
              <span className="ml-1 text-red-500">*</span>
            )}
          </label>

          <input
            id="model"
            name="model"
            type="text"
            required={!modelUnknown}
            disabled={modelUnknown}
            placeholder={
              modelUnknown
                ? "모델명을 모르는 상태로 질문합니다"
                : "예: S8 MaxV Ultra"
            }
            className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
          />

          <label className="mt-3 flex w-fit cursor-pointer items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={modelUnknown}
              onChange={(event) =>
                setModelUnknown(event.target.checked)
              }
              className="h-4 w-4 rounded border-slate-300"
            />
            모델명을 모르겠어요
          </label>

          {modelUnknown && (
            <p className="mt-2 text-sm text-blue-700">
              제품 뒷면이나 밑면의 라벨 사진을 첨부해 주세요.
            </p>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="border-b border-slate-200 pb-5">
          <p className="text-sm font-semibold text-blue-600">
            2단계
          </p>
          <h2 className="mt-1 text-xl font-bold">
            어떤 문제가 발생했나요?
          </h2>
        </div>

        <div className="mt-6">
          <label
            htmlFor="title"
            className="block text-sm font-bold"
          >
            질문 제목
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            id="title"
            name="title"
            type="text"
            required
            maxLength={100}
            placeholder="예: 충전독에 올리면 표시등이 꺼지고 충전되지 않습니다"
            className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="mt-6">
          <label
            htmlFor="symptom"
            className="block text-sm font-bold"
          >
            주요 증상
            <span className="ml-1 text-red-500">*</span>
          </label>

          <textarea
            id="symptom"
            name="symptom"
            required
            rows={3}
            placeholder="언제, 어떤 상황에서, 어떤 증상이 나타나는지 적어주세요."
            className="mt-2 w-full resize-y rounded-xl border border-slate-300 px-4 py-3 leading-7 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="mt-6">
          <label
            htmlFor="description"
            className="block text-sm font-bold"
          >
            자세한 설명
            <span className="ml-1 text-red-500">*</span>
          </label>

          <textarea
            id="description"
            name="description"
            required
            rows={7}
            placeholder="구매 시기, 증상이 시작된 시점, 오류 메시지, 반복 여부 등을 자세히 적어주세요."
            className="mt-2 w-full resize-y rounded-xl border border-slate-300 px-4 py-3 leading-7 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="mt-6">
          <label
            htmlFor="attemptedActions"
            className="block text-sm font-bold"
          >
            이미 시도한 방법
          </label>

          <textarea
            id="attemptedActions"
            name="attemptedActions"
            rows={4}
            placeholder="예: 전원 재연결, 필터 청소, 다른 콘센트 연결"
            className="mt-2 w-full resize-y rounded-xl border border-slate-300 px-4 py-3 leading-7 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="border-b border-slate-200 pb-5">
          <p className="text-sm font-semibold text-blue-600">
            3단계
          </p>
          <h2 className="mt-1 text-xl font-bold">
            사진을 첨부해 주세요
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            제품 전체, 고장 부위, 오류 화면, 모델명 라벨을
            촬영하면 진단에 도움이 됩니다.
          </p>
        </div>

        <label className="mt-6 flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 text-center transition hover:border-blue-400 hover:bg-blue-50">
          <span
            aria-hidden="true"
            className="text-3xl"
          >
            📷
          </span>

          <span className="mt-3 font-bold text-slate-800">
            사진 선택
          </span>

          <span className="mt-1 text-sm text-slate-500">
            JPG, PNG, WEBP · 한 장당 최대 10MB · 최대 5장
          </span>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleImageChange}
            className="sr-only"
          />
        </label>

        {imageError && (
          <p
            role="alert"
            className="mt-3 text-sm font-semibold text-red-600"
          >
            {imageError}
          </p>
        )}

        {images.length > 0 && (
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold">
                첨부 사진 {images.length}/{MAX_IMAGE_COUNT}
              </p>
              <p className="text-xs text-slate-500">
                사진을 눌러 삭제할 수 있습니다
              </p>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {images.map((image) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => removeImage(image.id)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                  aria-label={`${image.name} 삭제`}
                >
                  <Image
                    src={image.url}
                    alt={image.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />

                  <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-sm font-bold text-transparent transition group-hover:bg-black/50 group-hover:text-white">
                    삭제
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <h2 className="font-bold text-amber-950">
          개인정보와 안전에 주의해 주세요
        </h2>

        <p className="mt-2 text-sm leading-6 text-amber-900">
          사진에 주소, 전화번호, 송장, 얼굴 등의 개인정보가
          보이지 않는지 확인하세요. 감전이나 화재 위험이 있는
          제품은 직접 분해하지 마세요.
        </p>
      </section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          className="min-h-12 rounded-xl border border-slate-300 bg-white px-6 font-semibold text-slate-700 hover:bg-slate-50"
        >
          임시 저장
        </button>

        <button
          type="submit"
          className="min-h-12 rounded-xl bg-blue-600 px-8 font-semibold text-white hover:bg-blue-700"
        >
          질문 등록
        </button>
      </div>
    </form>
  );
}
