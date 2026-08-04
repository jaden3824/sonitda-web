"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";
import {
  type SavedQuestion,
  clearSavedQuestions,
  readSavedQuestions,
  removeSavedQuestion,
  savedQuestionsChangedEvent,
} from "@/lib/saved-question-storage";

function formatSavedAt(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(
    "ko-KR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  ).format(date);
}

export function SavedQuestionsManager() {
  const [questions, setQuestions] =
    useState<SavedQuestion[]>([]);

  const [isReady, setIsReady] =
    useState(false);

  function refreshQuestions() {
    setQuestions(readSavedQuestions());
    setIsReady(true);
  }

  useEffect(() => {
    const timerId = window.setTimeout(
      refreshQuestions,
      0,
    );

    window.addEventListener(
      savedQuestionsChangedEvent,
      refreshQuestions,
    );

    window.addEventListener(
      "storage",
      refreshQuestions,
    );

    return () => {
      window.clearTimeout(timerId);

      window.removeEventListener(
        savedQuestionsChangedEvent,
        refreshQuestions,
      );

      window.removeEventListener(
        "storage",
        refreshQuestions,
      );
    };
  }, []);

  function deleteQuestion(
    question: SavedQuestion,
  ) {
    const shouldDelete = window.confirm(
      `"${question.title}" 질문을 저장 목록에서 삭제할까요?`,
    );

    if (!shouldDelete) {
      return;
    }

    removeSavedQuestion(question.id);
    refreshQuestions();
  }

  function deleteAllQuestions() {
    const shouldDelete = window.confirm(
      "저장한 질문을 모두 삭제할까요?",
    );

    if (!shouldDelete) {
      return;
    }

    clearSavedQuestions();
    refreshQuestions();
  }

  if (!isReady) {
    return (
      <div className="border border-slate-200 bg-white p-8 text-sm text-slate-500">
        저장한 질문을 불러오는 중입니다.
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <section className="border border-slate-200 bg-white px-6 py-16 text-center">
        <h2 className="text-lg font-bold">
          저장한 질문이 없습니다
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          나중에 다시 확인할 질문을
          질문 상세 화면에서 저장할 수 있습니다.
        </p>

        <Link
          href="/questions"
          className="mt-6 inline-flex min-h-11 items-center bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          질문 둘러보기
        </Link>
      </section>
    );
  }

  return (
    <section className="border border-slate-200 bg-white">
      <header className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold">
            저장 목록
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            총 {questions.length}개의 질문
          </p>
        </div>

        <button
          type="button"
          onClick={deleteAllQuestions}
          className="min-h-10 border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-600 hover:border-red-300 hover:text-red-600"
        >
          전체 삭제
        </button>
      </header>

      <div className="divide-y divide-slate-200">
        {questions.map((question) => (
          <article
            key={question.id}
            className="px-6 py-6"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm text-slate-500">
                  {question.category} ·{" "}
                  {question.brand} ·{" "}
                  {question.model}
                </p>

                <h3 className="mt-2 text-lg font-bold leading-7">
                  <Link
                    href={`/questions/${question.id}`}
                    className="hover:text-blue-600 hover:underline"
                  >
                    {question.title}
                  </Link>
                </h3>

                <p className="mt-3 text-xs text-slate-400">
                  {formatSavedAt(
                    question.savedAt,
                  )}{" "}
                  저장
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  deleteQuestion(question)
                }
                className="w-fit shrink-0 text-sm font-semibold text-slate-500 hover:text-red-600"
              >
                저장 삭제
              </button>
            </div>
          </article>
        ))}
      </div>

      <footer className="border-t border-slate-200 px-6 py-5">
        <p className="text-xs leading-5 text-slate-400">
          현재 저장 목록은 이 브라우저에만
          보관됩니다. 로그인 데이터 연결 후
          다른 기기에서도 동일한 목록을 확인할
          수 있게 됩니다.
        </p>
      </footer>
    </section>
  );
}
