"use client";

import {
  useEffect,
  useState,
} from "react";
import {
  defaultNotificationPreferences,
  type NotificationPreferences,
  readNotificationPreferences,
  saveNotificationPreferences,
} from "@/lib/preferences-storage";

const notificationItems: Array<{
  key: keyof NotificationPreferences;
  title: string;
  description: string;
}> = [
  {
    key: "answerNotification",
    title: "질문 답변 알림",
    description:
      "내 질문에 새로운 댓글이나 전문가 답변이 등록되면 알려줍니다.",
  },
  {
    key: "repairNotification",
    title: "수리 요청 알림",
    description:
      "수리 요청의 상담 메시지와 진행 상태가 변경되면 알려줍니다.",
  },
  {
    key: "helpfulNotification",
    title: "도움됨 알림",
    description:
      "내 질문이나 댓글이 다른 사용자에게 도움됐을 때 알려줍니다.",
  },
  {
    key: "emailNotification",
    title: "이메일 알림",
    description:
      "중요한 답변과 수리 진행 내용을 가입 이메일로 받습니다.",
  },
  {
    key: "marketingNotification",
    title: "서비스 소식",
    description:
      "새로운 기능과 이벤트 안내를 받습니다.",
  },
];

export function NotificationSettingsForm() {
  const [preferences, setPreferences] =
    useState<NotificationPreferences>(
      defaultNotificationPreferences,
    );

  const [isReady, setIsReady] =
    useState(false);

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setPreferences(
        readNotificationPreferences(),
      );

      setIsReady(true);
    }, 0);

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  function togglePreference(
    key: keyof NotificationPreferences,
  ) {
    setMessage("");

    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  function savePreferences() {
    saveNotificationPreferences(
      preferences,
    );

    setMessage(
      "알림 설정이 이 브라우저에 저장되었습니다.",
    );
  }

  if (!isReady) {
    return (
      <div className="border border-slate-200 bg-white p-6 text-sm text-slate-500">
        알림 설정을 불러오는 중입니다.
      </div>
    );
  }

  return (
    <section className="border border-slate-200 bg-white">
      <div className="divide-y divide-slate-200">
        {notificationItems.map((item) => {
          const isEnabled =
            preferences[item.key];

          return (
            <div
              key={item.key}
              className="flex items-start justify-between gap-6 p-6"
            >
              <div>
                <h2 className="font-bold">
                  {item.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.description}
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={isEnabled}
                onClick={() =>
                  togglePreference(item.key)
                }
                className={`relative mt-1 h-7 w-12 shrink-0 rounded-full ${
                  isEnabled
                    ? "bg-blue-600"
                    : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white ${
                    isEnabled
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      <footer className="flex flex-col gap-4 border-t border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between">
        <p
          role="status"
          className="text-sm font-semibold text-emerald-700"
        >
          {message}
        </p>

        <button
          type="button"
          onClick={savePreferences}
          className="min-h-11 rounded-lg bg-blue-600 px-5 text-sm font-bold text-white hover:bg-blue-700"
        >
          설정 저장
        </button>
      </footer>
    </section>
  );
}
