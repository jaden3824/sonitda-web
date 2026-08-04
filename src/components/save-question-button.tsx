"use client";

import {
  useEffect,
  useState,
} from "react";
import {
  type SavedQuestionInput,
  isQuestionSaved,
  removeSavedQuestion,
  saveQuestion,
  savedQuestionsChangedEvent,
} from "@/lib/saved-question-storage";

type SaveQuestionButtonProps =
  SavedQuestionInput;

export function SaveQuestionButton({
  id,
  title,
  category,
  brand,
  model,
}: SaveQuestionButtonProps) {
  const [isSaved, setIsSaved] =
    useState(false);

  useEffect(() => {
    function refreshSavedState() {
      setIsSaved(isQuestionSaved(id));
    }

    const timerId = window.setTimeout(
      refreshSavedState,
      0,
    );

    window.addEventListener(
      savedQuestionsChangedEvent,
      refreshSavedState,
    );

    window.addEventListener(
      "storage",
      refreshSavedState,
    );

    return () => {
      window.clearTimeout(timerId);

      window.removeEventListener(
        savedQuestionsChangedEvent,
        refreshSavedState,
      );

      window.removeEventListener(
        "storage",
        refreshSavedState,
      );
    };
  }, [id]);

  function toggleSavedQuestion() {
    if (isSaved) {
      removeSavedQuestion(id);
      setIsSaved(false);
      return;
    }

    saveQuestion({
      id,
      title,
      category,
      brand,
      model,
    });

    setIsSaved(true);
  }

  return (
    <button
      type="button"
      onClick={toggleSavedQuestion}
      aria-pressed={isSaved}
      className={`min-h-10 border px-4 text-sm font-semibold ${
        isSaved
          ? "border-blue-600 bg-blue-50 text-blue-700"
          : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
      }`}
    >
      {isSaved
        ? "저장됨"
        : "질문 저장"}
    </button>
  );
}
