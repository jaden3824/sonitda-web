"use client";

import Link from "next/link";
import { useState } from "react";
import {
  repairRequests,
  type RepairRequestStatus,
} from "@/data/my-page";

type FilterValue = "전체" | RepairRequestStatus;

const filters: FilterValue[] = [
  "전체",
  "전문가 선택 전",
  "수리 상담 중",
  "수리 완료",
];

const statusStyles: Record<RepairRequestStatus, string> = {
  "전문가 선택 전":
    "bg-amber-50 text-amber-700 ring-amber-200",
  "수리 상담 중":
    "bg-blue-50 text-blue-700 ring-blue-200",
  "수리 완료":
    "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

function getQuestionHref(questionId: string, title: string) {
  if (questionId === "roborock-s8-charging") {
    return `/questions/${questionId}`;
  }

  return `/questions?query=${encodeURIComponent(title)}`;
}

export function RepairRequestList() {
  const [selectedFilter, setSelectedFilter] =
    useState<FilterValue>("전체");

  const filteredRequests =
    selectedFilter === "전체"
      ? repairRequests
      : repairRequests.filter(
          (request) => request.status === selectedFilter,
        );

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        {filters.map((filter) => {
          const count =
            filter === "전체"
              ? repairRequests.length
              : repairRequests.filter(
                  (request) => request.status === filter,
                ).length;

          const isSelected = selectedFilter === filter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setSelectedFilter(filter)}
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
          {filteredRequests.map((request) => (
            <article
              key={request.id}
              className="py-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-slate-500">
                    {request.product}
                  </p>

                  <h3 className="mt-2 text-lg font-bold leading-7">
                    {request.questionTitle}
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
                            {request.expertName}
                          </Link>
                        ) : (
                          <span className="font-semibold">
                            {request.expertName}
                          </span>
                        )}
                      </p>
                    ) : (
                      <p>아직 선택한 전문가가 없습니다.</p>
                    )}
                  </div>

                  <div className="mt-4 border-l-2 border-slate-300 pl-4">
                    <p className="text-sm leading-6 text-slate-600">
                      {request.nextAction}
                    </p>
                  </div>

                  <p className="mt-4 text-xs text-slate-400">
                    최근 변경 {request.updatedAt}
                  </p>
                </div>

                <span
                  className={`w-fit shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${
                    statusStyles[request.status]
                  }`}
                >
                  {request.status}
                </span>
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

                {request.status === "수리 상담 중" && (
                  <span className="text-sm font-semibold text-slate-400">
                    상담방 기능 준비 중
                  </span>
                )}

                {request.status === "수리 완료" && (
                  <span className="text-sm font-semibold text-slate-400">
                    수리 후기 기능 준비 중
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="border-b border-slate-200 py-16 text-center">
          <p className="font-bold">
            해당 상태의 수리 요청이 없습니다
          </p>

          <p className="mt-2 text-sm text-slate-500">
            다른 진행 상태를 선택해 주세요.
          </p>
        </div>
      )}
    </div>
  );
}
