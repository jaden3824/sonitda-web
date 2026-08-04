"use client";

import Link from "next/link";
import {
  type FormEvent,
  useState,
} from "react";
import { questionDetail } from "@/data/question-detail";

type RepairRequestButtonProps = {
  expertId: string;
  expertName: string;
};

type StoredRepairRequest = {
  questionId: string;
  questionTitle: string;
  product: string;
  expertId: string;
  expertName: string;
  reason: string;
  status: "수리 상담 중";
  createdAt: string;
};

export function RepairRequestButton({
  expertId,
  expertName,
}: RepairRequestButtonProps) {
  const storageKey =
    `sonitda:active-repair:${questionDetail.id}`;

  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] =
    useState(false);

  const [existingRequest, setExistingRequest] =
    useState<StoredRepairRequest | null>(null);

  function readExistingRequest() {
    const savedRequest =
      window.localStorage.getItem(storageKey);

    if (!savedRequest) {
      setExistingRequest(null);
      return;
    }

    try {
      setExistingRequest(
        JSON.parse(savedRequest) as StoredRepairRequest,
      );
    } catch {
      window.localStorage.removeItem(storageKey);
      setExistingRequest(null);
    }
  }

  function openRequestDialog() {
    setError("");
    setIsSubmitted(false);
    readExistingRequest();
    setIsOpen(true);
  }

  function closeRequestDialog() {
    setIsOpen(false);
    setError("");
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");

    if (existingRequest) {
      setError(
        "이 질문에는 이미 진행 중인 수리 요청이 있습니다.",
      );
      return;
    }

    if (reason.trim().length < 10) {
      setError(
        "수리 요청 내용을 10자 이상 입력해 주세요.",
      );
      return;
    }

    if (!isAgreed) {
      setError(
        "수리 요청 안내를 확인하고 동의해 주세요.",
      );
      return;
    }

    const repairRequest: StoredRepairRequest = {
      questionId: questionDetail.id,
      questionTitle: questionDetail.title,
      product:
        `${questionDetail.brand} · ${questionDetail.model}`,
      expertId,
      expertName,
      reason: reason.trim(),
      status: "수리 상담 중",
      createdAt: new Date().toISOString(),
    };

    window.localStorage.setItem(
      storageKey,
      JSON.stringify(repairRequest),
    );

    setExistingRequest(repairRequest);
    setIsSubmitted(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openRequestDialog}
        className="ml-auto border border-blue-300 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
      >
        이 전문가에게 수리 요청
      </button>

      {isOpen && (
        <div
          role="presentation"
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeRequestDialog();
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="repair-request-title"
            className="max-h-[90vh] w-full overflow-y-auto border border-slate-300 bg-white sm:max-w-2xl"
          >
            <header className="flex items-start justify-between border-b border-slate-200 px-5 py-5 sm:px-7">
              <div>
                <p className="text-sm font-semibold text-blue-700">
                  수리 요청 전 확인
                </p>

                <h2
                  id="repair-request-title"
                  className="mt-1 text-xl font-bold text-slate-900"
                >
                  {expertName} 전문가에게 요청
                </h2>
              </div>

              <button
                type="button"
                onClick={closeRequestDialog}
                aria-label="수리 요청 창 닫기"
                className="px-2 py-1 text-xl text-slate-500 hover:text-slate-900"
              >
                ×
              </button>
            </header>

            {isSubmitted ? (
              <div className="px-5 py-8 sm:px-7">
                <div
                  role="status"
                  className="border border-emerald-200 bg-emerald-50 p-5"
                >
                  <h3 className="font-bold text-emerald-900">
                    수리 요청이 접수되었습니다
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-emerald-800">
                    전문가가 요청 내용을 확인한 뒤 상담 가능
                    여부와 진행 방법을 안내합니다.
                  </p>
                </div>

                <p className="mt-5 text-sm leading-6 text-slate-500">
                  현재는 기능 확인용으로 이 브라우저에만
                  저장됩니다. 실제 서버 저장과 알림 전송은
                  데이터베이스 연결 단계에서 구현합니다.
                </p>

                <div className="mt-7 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeRequestDialog}
                    className="min-h-11 border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    닫기
                  </button>

                  <Link
                    href="/mypage/repairs"
                    className="flex min-h-11 items-center bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    수리 요청 내역
                  </Link>
                </div>
              </div>
            ) : existingRequest ? (
              <div className="px-5 py-8 sm:px-7">
                <div
                  role="alert"
                  className="border border-amber-200 bg-amber-50 p-5"
                >
                  <h3 className="font-bold text-amber-900">
                    이미 진행 중인 요청이 있습니다
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-amber-800">
                    한 질문에는 한 명의 전문가에게만 수리를
                    요청할 수 있습니다.
                  </p>
                </div>

                <dl className="mt-6 border-y border-slate-200 text-sm">
                  <div className="grid grid-cols-[110px_1fr] gap-4 border-b border-slate-200 py-4">
                    <dt className="font-semibold text-slate-500">
                      요청 전문가
                    </dt>
                    <dd className="font-semibold text-slate-900">
                      {existingRequest.expertName}
                    </dd>
                  </div>

                  <div className="grid grid-cols-[110px_1fr] gap-4 py-4">
                    <dt className="font-semibold text-slate-500">
                      진행 상태
                    </dt>
                    <dd className="font-semibold text-blue-700">
                      {existingRequest.status}
                    </dd>
                  </div>
                </dl>

                <div className="mt-7 flex justify-end">
                  <button
                    type="button"
                    onClick={closeRequestDialog}
                    className="min-h-11 bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    확인
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-6 px-5 py-6 sm:px-7">
                  <dl className="border-y border-slate-200 text-sm">
                    <div className="grid grid-cols-[90px_1fr] gap-4 border-b border-slate-200 py-4 sm:grid-cols-[120px_1fr]">
                      <dt className="font-semibold text-slate-500">
                        제품
                      </dt>
                      <dd className="font-semibold text-slate-900">
                        {questionDetail.brand} ·{" "}
                        {questionDetail.model}
                      </dd>
                    </div>

                    <div className="grid grid-cols-[90px_1fr] gap-4 border-b border-slate-200 py-4 sm:grid-cols-[120px_1fr]">
                      <dt className="font-semibold text-slate-500">
                        증상
                      </dt>
                      <dd className="leading-6 text-slate-800">
                        {questionDetail.title}
                      </dd>
                    </div>

                    <div className="grid grid-cols-[90px_1fr] gap-4 py-4 sm:grid-cols-[120px_1fr]">
                      <dt className="font-semibold text-slate-500">
                        전문가
                      </dt>
                      <dd className="font-semibold text-slate-900">
                        {expertName}
                      </dd>
                    </div>
                  </dl>

                  <div>
                    <label
                      htmlFor={`repair-reason-${expertId}`}
                      className="block text-sm font-bold text-slate-900"
                    >
                      수리 요청 내용
                    </label>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      방문·택배 가능 여부, 추가 증상 등 전문가가
                      확인해야 할 내용을 적어주세요.
                    </p>

                    <textarea
                      id={`repair-reason-${expertId}`}
                      value={reason}
                      onChange={(event) =>
                        setReason(event.target.value)
                      }
                      maxLength={500}
                      rows={5}
                      placeholder="예: 자가 점검으로 해결되지 않아 수리를 요청합니다. 택배 접수가 가능한지도 알고 싶습니다."
                      className="mt-3 w-full resize-y border border-slate-300 px-4 py-3 text-sm leading-6 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <p className="mt-2 text-right text-xs text-slate-400">
                      {reason.length}/500
                    </p>
                  </div>

                  <label className="flex items-start gap-3 border border-slate-200 bg-slate-50 p-4">
                    <input
                      type="checkbox"
                      checked={isAgreed}
                      onChange={(event) =>
                        setIsAgreed(event.target.checked)
                      }
                      className="mt-1 h-4 w-4"
                    />

                    <span className="text-sm leading-6 text-slate-600">
                      수리 요청은 즉시 계약이나 결제를 의미하지
                      않으며, 전문가와 점검 범위·비용·전달 방법을
                      확인한 뒤 진행한다는 안내를 확인했습니다.
                    </span>
                  </label>

                  {error && (
                    <p
                      role="alert"
                      className="border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
                    >
                      {error}
                    </p>
                  )}

                  <p className="text-xs leading-5 text-slate-400">
                    이 버튼은 공개 답변을 작성한 사업자 인증
                    전문가에게만 표시됩니다.
                  </p>
                </div>

                <footer className="flex justify-end gap-3 border-t border-slate-200 px-5 py-5 sm:px-7">
                  <button
                    type="button"
                    onClick={closeRequestDialog}
                    className="min-h-11 border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    취소
                  </button>

                  <button
                    type="submit"
                    className="min-h-11 bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    수리 요청 접수
                  </button>
                </footer>
              </form>
            )}
          </section>
        </div>
      )}
    </>
  );
}
