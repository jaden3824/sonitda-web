"use client";

import {
  type FormEvent,
  useEffect,
  useState,
} from "react";
import {
  type RepairReview,
  type RepairReviewRating,
  readRepairReview,
  saveRepairReview,
} from "@/lib/repair-request-storage";

type RepairReviewFormProps = {
  questionId: string;
  expertId: string;
  expertName: string;
};

const reviewTags = [
  "설명이 친절해요",
  "진단이 정확해요",
  "응답이 빨라요",
  "비용 안내가 명확해요",
  "수리 결과가 만족스러워요",
  "제품을 안전하게 다뤄요",
] as const;

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function RepairReviewForm({
  questionId,
  expertId,
  expertName,
}: RepairReviewFormProps) {
  const [isReady, setIsReady] =
    useState(false);

  const [savedReview, setSavedReview] =
    useState<RepairReview | null>(null);

  const [isEditing, setIsEditing] =
    useState(false);

  const [rating, setRating] =
    useState<RepairReviewRating | 0>(0);

  const [selectedTags, setSelectedTags] =
    useState<string[]>([]);

  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      const review =
        readRepairReview(questionId);

      setSavedReview(review);

      if (review) {
        setRating(review.rating);
        setSelectedTags(review.tags);
        setBody(review.body);
      }

      setIsReady(true);
    }, 0);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [questionId]);

  function toggleTag(tag: string) {
    setSelectedTags((currentTags) =>
      currentTags.includes(tag)
        ? currentTags.filter(
            (currentTag) =>
              currentTag !== tag,
          )
        : [...currentTags, tag],
    );
  }

  function startEditing() {
    if (savedReview) {
      setRating(savedReview.rating);
      setSelectedTags(savedReview.tags);
      setBody(savedReview.body);
    }

    setError("");
    setIsEditing(true);
  }

  function cancelEditing() {
    if (savedReview) {
      setRating(savedReview.rating);
      setSelectedTags(savedReview.tags);
      setBody(savedReview.body);
    }

    setError("");
    setIsEditing(false);
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");

    if (rating === 0) {
      setError("별점을 선택해 주세요.");
      return;
    }

    if (selectedTags.length === 0) {
      setError(
        "후기 항목을 하나 이상 선택해 주세요.",
      );
      return;
    }

    if (body.trim().length < 10) {
      setError(
        "후기 내용을 10자 이상 입력해 주세요.",
      );
      return;
    }

    const now = new Date().toISOString();

    const review: RepairReview = {
      questionId,
      expertId,
      expertName,
      rating,
      tags: selectedTags,
      body: body.trim(),
      createdAt:
        savedReview?.createdAt ?? now,
      updatedAt: now,
    };

    saveRepairReview(review);
    setSavedReview(review);
    setIsEditing(false);
  }

  if (!isReady) {
    return (
      <section className="border border-slate-200 bg-white p-6">
        <p className="text-sm text-slate-500">
          후기를 불러오는 중입니다.
        </p>
      </section>
    );
  }

  if (savedReview && !isEditing) {
    return (
      <section className="border border-slate-200 bg-white">
        <header className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold">
              작성한 수리 후기
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {formatDate(
                savedReview.updatedAt,
              )}{" "}
              작성
            </p>
          </div>

          <button
            type="button"
            onClick={startEditing}
            className="min-h-10 border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            후기 수정
          </button>
        </header>

        <div className="p-6">
          <div
            aria-label={`별점 ${savedReview.rating}점`}
            className="flex items-center gap-1 text-xl"
          >
            {Array.from(
              { length: 5 },
              (_, index) => (
                <span
                  key={index}
                  className={
                    index <
                    savedReview.rating
                      ? "text-amber-500"
                      : "text-slate-300"
                  }
                >
                  ★
                </span>
              ),
            )}

            <span className="ml-2 text-sm font-bold text-slate-800">
              {savedReview.rating}.0
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {savedReview.tags.map((tag) => (
              <span
                key={tag}
                className="border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-slate-700">
            {savedReview.body}
          </p>

          <p className="mt-5 text-xs leading-5 text-slate-400">
            현재 후기는 이 브라우저에만
            저장됩니다. 서버 연결 후 전문가
            평점에 반영됩니다.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="border border-slate-200 bg-white">
      <header className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-bold">
          {savedReview
            ? "수리 후기 수정"
            : "수리 후기 작성"}
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {expertName} 전문가와 진행한 수리
          경험을 남겨주세요.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-7 p-6"
      >
        <fieldset>
          <legend className="text-sm font-bold">
            만족도
          </legend>

          <div className="mt-3 flex flex-wrap gap-2">
            {(
              [1, 2, 3, 4, 5] as const
            ).map((score) => (
              <button
                key={score}
                type="button"
                onClick={() =>
                  setRating(score)
                }
                aria-label={`${score}점`}
                aria-pressed={
                  rating === score
                }
                className={`min-h-11 min-w-16 border px-3 text-sm font-semibold ${
                  rating === score
                    ? "border-amber-500 bg-amber-50 text-amber-700"
                    : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                ★ {score}점
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-bold">
            만족한 점
          </legend>

          <p className="mt-1 text-sm text-slate-500">
            여러 항목을 선택할 수 있습니다.
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {reviewTags.map((tag) => {
              const isSelected =
                selectedTags.includes(tag);

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() =>
                    toggleTag(tag)
                  }
                  aria-pressed={isSelected}
                  className={`min-h-10 border px-3 text-sm font-semibold ${
                    isSelected
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div>
          <label
            htmlFor="repair-review-body"
            className="block text-sm font-bold"
          >
            상세 후기
          </label>

          <textarea
            id="repair-review-body"
            value={body}
            onChange={(event) =>
              setBody(event.target.value)
            }
            rows={5}
            maxLength={1000}
            placeholder="진단 과정, 안내 방식, 수리 결과 등 실제 경험을 작성해 주세요."
            className="mt-3 w-full resize-y border border-slate-300 px-4 py-3 text-sm leading-7 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <p className="mt-2 text-right text-xs text-slate-400">
            {body.length}/1000
          </p>
        </div>

        {error && (
          <p
            role="alert"
            className="border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
          >
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
          {savedReview && (
            <button
              type="button"
              onClick={cancelEditing}
              className="min-h-11 border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              취소
            </button>
          )}

          <button
            type="submit"
            className="min-h-11 bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            {savedReview
              ? "후기 수정 저장"
              : "후기 등록"}
          </button>
        </div>
      </form>
    </section>
  );
}
