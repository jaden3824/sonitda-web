"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";
import {
  repairRequests,
  type RepairRequest,
  type RepairRequestStatus,
} from "@/data/my-page";
import {
  getRepairRequestStorageKey,
  readAllBrowserRepairRequests,
  readRepairReview,
  removeBrowserRepairRequest,
} from "@/lib/repair-request-storage";

type FilterValue =
  | "전체"
  | RepairRequestStatus;

type RepairRequestView = RepairRequest & {
  storageKey?: string;
  browserQuestionId?: string;
  hasReview?: boolean;
};

const filters: FilterValue[] = [
  "전체",
  "전문가 선택 전",
  "수리 상담 중",
  "수리 완료",
];

const statusStyles: Record<
  RepairRequestStatus,
  string
> = {
  "전문가 선택 전":
    "bg-amber-50 text-amber-700 ring-amber-200",
  "수리 상담 중":
    "bg-blue-50 text-blue-700 ring-blue-200",
  "수리 완료":
    "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

function formatCreatedAt(createdAt: string) {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return "최근";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function readBrowserRequests():
  RepairRequestView[] {
  return readAllBrowserRepairRequests().map(
    (request) => ({
      id: `browser-${request.questionId}`,
      questionId: request.questionId,
      questionTitle:
        request.questionTitle,
      product: request.product,
      expertId: request.expertId,
      expertName: request.expertName,
      status: request.status,
      nextAction:
        request.status === "수리 완료"
          ? "사용자가 수리 완료 상태로 변경했습니다."
          : request.reason,
      updatedAt: formatCreatedAt(
        request.completedAt ??
          request.createdAt,
      ),
      storageKey:
        getRepairRequestStorageKey(
          request.questionId,
        ),
      browserQuestionId:
        request.questionId,
      hasReview: Boolean(
        readRepairReview(
          request.questionId,
        ),
      ),
    }),
  );
}

function mergeRequests(
  browserRequests: RepairRequestView[],
) {
  const requestMap = new Map<
    string,
    RepairRequestView
  >();

  repairRequests.forEach((request) => {
    requestMap.set(
      request.questionId,
      request,
    );
  });

  browserRequests.forEach((request) => {
    requestMap.set(
      request.questionId,
      request,
    );
  });

  return Array.from(requestMap.values());
}

function getQuestionHref(
  questionId: string,
  title: string,
) {
  if (
    questionId ===
    "roborock-s8-charging"
  ) {
    return `/questions/${questionId}`;
  }

  return `/questions?query=${encodeURIComponent(
    title,
  )}`;
}

export function RepairRequestList() {
  const [
    selectedFilter,
    setSelectedFilter,
  ] = useState<FilterValue>("전체");

  const [requests, setRequests] =
    useState<RepairRequestView[]>(
      repairRequests,
    );

  function refreshRequests() {
    setRequests(
      mergeRequests(
        readBrowserRequests(),
      ),
    );
  }

  useEffect(() => {
    const timerId = window.setTimeout(
      () => {
        refreshRequests();
      },
      0,
    );

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  function cancelBrowserRequest(
    questionId: string,
    expertName?: string,
  ) {
    const shouldCancel =
      window.confirm(
        expertName
          ? `${expertName} 전문가에게 보낸 수리 요청과 상담 기록을 모두 삭제할까요?`
          : "이 수리 요청과 상담 기록을 모두 삭제할까요?",
      );

    if (!shouldCancel) {
      return;
    }

    removeBrowserRepairRequest(
      questionId,
    );

    refreshRequests();
  }

  const filteredRequests =
    selectedFilter === "전체"
      ? requests
      : requests.filter(
          (request) =>
            request.status ===
            selectedFilter,
        );

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        {filters.map((filter) => {
          const count =
            filter === "전체"
              ? requests.length
              : requests.filter(
                  (request) =>
                    request.status ===
                    filter,
                ).length;

          const isSelected =
            selectedFilter === filter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() =>
                setSelectedFilter(filter)
              }
              className={`min-h-10 border px-4 text-sm font-semibold ${
                isSelected
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {filter} {count}
            </button>
          );
        })}
      </div>

      {filteredRequests.length > 0 ? (
        <div className="divide-y divide-slate-200 border-b border-slate-200">
          {filteredRequests.map(
            (request) => (
              <article
                key={request.id}
                className="py-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm text-slate-500">
                        {request.product}
                      </p>

                      {request.storageKey && (
                        <span className="border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-500">
                          브라우저 임시 저장
                        </span>
                      )}
                    </div>

                    <h3 className="mt-2 text-lg font-bold leading-7">
                      {
                        request.questionTitle
                      }
                    </h3>

                    <div className="mt-4 text-sm text-slate-600">
                      {request.expertName ? (
                        <p>
                          담당 전문가:{" "}
                          {request.expertId ? (
                            <Link
                              href={`/experts/${request.expertId}`}
                              className="font-semibold text-blue-600 hover:underline"
                            >
                              {
                                request.expertName
                              }
                            </Link>
                          ) : (
                            <span className="font-semibold">
                              {
                                request.expertName
                              }
                            </span>
                          )}
                        </p>
                      ) : (
                        <p>
                          아직 선택한 전문가가
                          없습니다.
                        </p>
                      )}
                    </div>

                    <div className="mt-4 border-l-2 border-slate-300 pl-4">
                      <p className="text-sm leading-6 text-slate-600">
                        {
                          request.nextAction
                        }
                      </p>
                    </div>

                    <p className="mt-4 text-xs text-slate-400">
                      최근 변경{" "}
                      {request.updatedAt}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                    <span
                      className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${
                        statusStyles[
                          request.status
                        ]
                      }`}
                    >
                      {request.status}
                    </span>

                    {request.hasReview && (
                      <span className="text-xs font-semibold text-emerald-700">
                        후기 작성 완료
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-4 border-t border-slate-100 pt-4">
                  <Link
                    href={getQuestionHref(
                      request.questionId,
                      request.questionTitle,
                    )}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    질문 확인
                  </Link>

                  {request.browserQuestionId ? (
                    <Link
                      href={`/mypage/repairs/${request.browserQuestionId}`}
                      className="text-sm font-semibold text-slate-700 hover:text-blue-700"
                    >
                      {request.status ===
                      "수리 완료"
                        ? request.hasReview
                          ? "후기 확인"
                          : "후기 작성"
                        : "상담 내용 확인"}
                    </Link>
                  ) : request.status ===
                    "수리 상담 중" ? (
                    <span className="text-sm font-semibold text-slate-400">
                      데모 상담 내역
                    </span>
                  ) : null}

                  {request.browserQuestionId && (
                    <button
                      type="button"
                      onClick={() =>
                        cancelBrowserRequest(
                          request.browserQuestionId!,
                          request.expertName,
                        )
                      }
                      className="text-sm font-semibold text-red-600 hover:text-red-700"
                    >
                      요청 삭제
                    </button>
                  )}
                </div>
              </article>
            ),
          )}
        </div>
      ) : (
        <div className="border-b border-slate-200 py-16 text-center">
          <p className="font-bold">
            해당 상태의 수리 요청이
            없습니다
          </p>

          <p className="mt-2 text-sm text-slate-500">
            다른 진행 상태를 선택해
            주세요.
          </p>
        </div>
      )}
    </div>
  );
}
