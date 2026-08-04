"use client";

import Link from "next/link";
import { RepairReviewForm } from "@/components/repair-review-form";
import {
  type FormEvent,
  useEffect,
  useState,
} from "react";
import {
  type BrowserRepairRequest,
  type RepairConversationMessage,
  readBrowserRepairRequest,
  readRepairMessages,
  saveBrowserRepairRequest,
  saveRepairMessages,
} from "@/lib/repair-request-storage";

type RepairConsultationProps = {
  questionId: string;
};

function createMessageId() {
  if (
    typeof crypto !== "undefined" &&
    "randomUUID" in crypto
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()
    .toString(16)
    .slice(2)}`;
}

function formatDateTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(
    "ko-KR",
    {
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  ).format(date);
}

export function RepairConsultation({
  questionId,
}: RepairConsultationProps) {
  const [isReady, setIsReady] =
    useState(false);

  const [request, setRequest] =
    useState<BrowserRepairRequest | null>(
      null,
    );

  const [messages, setMessages] =
    useState<
      RepairConversationMessage[]
    >([]);

  const [messageBody, setMessageBody] =
    useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    const timerId = window.setTimeout(
      () => {
        const savedRequest =
          readBrowserRepairRequest(
            questionId,
          );

        setRequest(savedRequest);

        if (!savedRequest) {
          setIsReady(true);
          return;
        }

        let savedMessages =
          readRepairMessages(questionId);

        if (savedMessages.length === 0) {
          savedMessages = [
            {
              id: createMessageId(),
              sender: "system",
              body:
                "수리 요청이 접수되었습니다. 전문가의 답변을 기다리는 동안 추가 증상을 남길 수 있습니다.",
              createdAt:
                savedRequest.createdAt,
            },
          ];

          saveRepairMessages(
            questionId,
            savedMessages,
          );
        }

        setMessages(savedMessages);
        setIsReady(true);
      },
      0,
    );

    return () => {
      window.clearTimeout(timerId);
    };
  }, [questionId]);

  function handleMessageSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");

    const trimmedBody =
      messageBody.trim();

    if (trimmedBody.length < 2) {
      setError(
        "메시지를 2자 이상 입력해 주세요.",
      );
      return;
    }

    if (!request) {
      setError(
        "수리 요청 정보를 찾을 수 없습니다.",
      );
      return;
    }

    if (request.status === "수리 완료") {
      setError(
        "완료된 상담에는 메시지를 추가할 수 없습니다.",
      );
      return;
    }

    const nextMessages = [
      ...messages,
      {
        id: createMessageId(),
        sender: "user" as const,
        body: trimmedBody,
        createdAt:
          new Date().toISOString(),
      },
    ];

    saveRepairMessages(
      questionId,
      nextMessages,
    );

    setMessages(nextMessages);
    setMessageBody("");
  }

  function completeRepair() {
    if (
      !request ||
      request.status === "수리 완료"
    ) {
      return;
    }

    const shouldComplete =
      window.confirm(
        "수리가 완료되었나요? 완료 처리 후에는 상담 메시지를 추가할 수 없습니다.",
      );

    if (!shouldComplete) {
      return;
    }

    const completedAt =
      new Date().toISOString();

    const updatedRequest: BrowserRepairRequest =
      {
        ...request,
        status: "수리 완료",
        completedAt,
      };

    const nextMessages = [
      ...messages,
      {
        id: createMessageId(),
        sender: "system" as const,
        body:
          "사용자가 수리 요청을 완료 처리했습니다.",
        createdAt: completedAt,
      },
    ];

    saveBrowserRepairRequest(
      updatedRequest,
    );

    saveRepairMessages(
      questionId,
      nextMessages,
    );

    setRequest(updatedRequest);
    setMessages(nextMessages);
  }

  if (!isReady) {
    return (
      <div className="border border-slate-200 bg-white p-8 text-sm text-slate-500">
        상담 내역을 불러오는 중입니다.
      </div>
    );
  }

  if (!request) {
    return (
      <div className="border border-amber-200 bg-amber-50 p-6">
        <h2 className="font-bold text-amber-900">
          수리 요청을 찾을 수 없습니다
        </h2>

        <p className="mt-2 text-sm leading-6 text-amber-800">
          요청이 취소되었거나 다른
          브라우저에 저장된 요청일 수
          있습니다.
        </p>

        <Link
          href="/mypage/repairs"
          className="mt-5 inline-flex min-h-11 items-center bg-slate-900 px-5 text-sm font-semibold text-white"
        >
          수리 요청 목록
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="border border-slate-200 bg-white">
        <header className="flex flex-col gap-4 border-b border-slate-200 p-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">
              {request.product}
            </p>

            <h2 className="mt-2 text-xl font-bold leading-8">
              {request.questionTitle}
            </h2>
          </div>

          <span
            className={`w-fit shrink-0 border px-3 py-2 text-sm font-semibold ${
              request.status ===
              "수리 완료"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-blue-200 bg-blue-50 text-blue-700"
            }`}
          >
            {request.status}
          </span>
        </header>

        <dl className="divide-y divide-slate-200 px-6 text-sm">
          <div className="grid gap-2 py-4 sm:grid-cols-[130px_1fr]">
            <dt className="font-semibold text-slate-500">
              담당 전문가
            </dt>

            <dd>
              <Link
                href={`/experts/${request.expertId}`}
                className="font-semibold text-blue-600 hover:underline"
              >
                {request.expertName}
              </Link>
            </dd>
          </div>

          <div className="grid gap-2 py-4 sm:grid-cols-[130px_1fr]">
            <dt className="font-semibold text-slate-500">
              요청일
            </dt>

            <dd>
              {formatDateTime(
                request.createdAt,
              )}
            </dd>
          </div>

          <div className="grid gap-2 py-4 sm:grid-cols-[130px_1fr]">
            <dt className="font-semibold text-slate-500">
              최초 요청 내용
            </dt>

            <dd className="whitespace-pre-wrap leading-6">
              {request.reason}
            </dd>
          </div>
        </dl>
      </section>

      <section className="border border-slate-200 bg-white">
        <header className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold">
              상담 내역
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              현재는 사용자 측 메시지 작성
              기능을 확인하는 단계입니다.
            </p>
          </div>
        </header>

        <div className="divide-y divide-slate-100">
          {messages.map((message) => {
            const senderLabel =
              message.sender === "user"
                ? "나"
                : message.sender ===
                    "expert"
                  ? request.expertName
                  : "손잇다 안내";

            return (
              <article
                key={message.id}
                className={`px-6 py-5 ${
                  message.sender ===
                  "system"
                    ? "bg-slate-50"
                    : ""
                }`}
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="text-sm font-bold text-slate-900">
                    {senderLabel}
                  </p>

                  <time className="text-xs text-slate-400">
                    {formatDateTime(
                      message.createdAt,
                    )}
                  </time>
                </div>

                <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                  {message.body}
                </p>
              </article>
            );
          })}
        </div>

        {request.status ===
        "수리 완료" ? (
          <div className="border-t border-slate-200 bg-emerald-50 px-6 py-5 text-sm font-semibold text-emerald-800">
            완료된 수리 요청입니다. 이후
            단계에서 후기 작성 기능을
            연결합니다.
          </div>
        ) : (
          <form
            onSubmit={
              handleMessageSubmit
            }
            className="border-t border-slate-200 p-6"
          >
            <label
              htmlFor="repair-message"
              className="block text-sm font-bold"
            >
              추가 메시지
            </label>

            <textarea
              id="repair-message"
              value={messageBody}
              onChange={(event) =>
                setMessageBody(
                  event.target.value,
                )
              }
              rows={4}
              maxLength={1000}
              placeholder="추가로 확인된 증상이나 전달할 내용을 입력하세요."
              className="mt-3 w-full resize-y border border-slate-300 px-4 py-3 text-sm leading-6 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <div className="mt-2 flex items-center justify-between">
              <p className="text-xs text-slate-400">
                {messageBody.length}/1000
              </p>

              <button
                type="submit"
                className="min-h-11 bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                메시지 남기기
              </button>
            </div>

            {error && (
              <p
                role="alert"
                className="mt-4 border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
              >
                {error}
              </p>
            )}
          </form>
        )}
      </section>

      {request.status === "수리 완료" && (
        <RepairReviewForm
          questionId={request.questionId}
          expertId={request.expertId}
          expertName={request.expertName}
        />
      )}

      <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-between">
        <Link
          href="/mypage/repairs"
          className="flex min-h-11 items-center justify-center border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          요청 목록으로
        </Link>

        {request.status !==
          "수리 완료" && (
          <button
            type="button"
            onClick={completeRepair}
            className="min-h-11 bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            수리 완료 처리
          </button>
        )}
      </div>
    </div>
  );
}
