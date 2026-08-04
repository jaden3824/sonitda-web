export type SavedQuestion = {
  id: string;
  title: string;
  category: string;
  brand: string;
  model: string;
  savedAt: string;
};

export type SavedQuestionInput = Omit<
  SavedQuestion,
  "savedAt"
>;

const storageKey = "sonitda:saved-questions";

export const savedQuestionsChangedEvent =
  "sonitda:saved-questions-changed";

function isObject(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null
  );
}

function isSavedQuestion(
  value: unknown,
): value is SavedQuestion {
  if (!isObject(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    typeof value.category === "string" &&
    typeof value.brand === "string" &&
    typeof value.model === "string" &&
    typeof value.savedAt === "string"
  );
}

function notifySavedQuestionsChanged() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new Event(savedQuestionsChangedEvent),
  );
}

export function readSavedQuestions() {
  if (typeof window === "undefined") {
    return [] as SavedQuestion[];
  }

  const storedValue =
    window.localStorage.getItem(storageKey);

  if (!storedValue) {
    return [];
  }

  try {
    const parsedValue: unknown =
      JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue
      .filter(isSavedQuestion)
      .sort(
        (first, second) =>
          new Date(second.savedAt).getTime() -
          new Date(first.savedAt).getTime(),
      );
  } catch {
    return [];
  }
}

function writeSavedQuestions(
  questions: SavedQuestion[],
) {
  window.localStorage.setItem(
    storageKey,
    JSON.stringify(questions),
  );

  notifySavedQuestionsChanged();
}

export function isQuestionSaved(
  questionId: string,
) {
  return readSavedQuestions().some(
    (question) =>
      question.id === questionId,
  );
}

export function saveQuestion(
  question: SavedQuestionInput,
) {
  const currentQuestions =
    readSavedQuestions();

  const savedQuestion: SavedQuestion = {
    ...question,
    savedAt: new Date().toISOString(),
  };

  const nextQuestions = [
    savedQuestion,
    ...currentQuestions.filter(
      (currentQuestion) =>
        currentQuestion.id !== question.id,
    ),
  ];

  writeSavedQuestions(nextQuestions);

  return savedQuestion;
}

export function removeSavedQuestion(
  questionId: string,
) {
  const nextQuestions =
    readSavedQuestions().filter(
      (question) =>
        question.id !== questionId,
    );

  writeSavedQuestions(nextQuestions);
}

export function clearSavedQuestions() {
  window.localStorage.removeItem(storageKey);
  notifySavedQuestionsChanged();
}
