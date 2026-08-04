export type NotificationPreferences = {
  answerNotification: boolean;
  repairNotification: boolean;
  helpfulNotification: boolean;
  emailNotification: boolean;
  marketingNotification: boolean;
};

export const defaultNotificationPreferences:
  NotificationPreferences = {
    answerNotification: true,
    repairNotification: true,
    helpfulNotification: true,
    emailNotification: true,
    marketingNotification: false,
  };

const storageKey =
  "sonitda:notification-preferences";

export function readNotificationPreferences() {
  if (typeof window === "undefined") {
    return defaultNotificationPreferences;
  }

  const storedValue =
    window.localStorage.getItem(storageKey);

  if (!storedValue) {
    return defaultNotificationPreferences;
  }

  try {
    const parsedValue = JSON.parse(
      storedValue,
    ) as Partial<NotificationPreferences>;

    return {
      ...defaultNotificationPreferences,
      ...parsedValue,
    };
  } catch {
    return defaultNotificationPreferences;
  }
}

export function saveNotificationPreferences(
  preferences: NotificationPreferences,
) {
  window.localStorage.setItem(
    storageKey,
    JSON.stringify(preferences),
  );
}
