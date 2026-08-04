export type BrowserRepairStatus =
  | "수리 상담 중"
  | "수리 완료";

export type BrowserRepairRequest = {
  questionId: string;
  questionTitle: string;
  product: string;
  expertId: string;
  expertName: string;
  reason: string;
  status: BrowserRepairStatus;
  createdAt: string;
  completedAt?: string;
};

export type RepairMessageSender =
  | "user"
  | "expert"
  | "system";

export type RepairConversationMessage = {
  id: string;
  sender: RepairMessageSender;
  body: string;
  createdAt: string;
};

const repairRequestPrefix =
  "sonitda:active-repair:";

const repairMessagePrefix =
  "sonitda:repair-messages:";

function isObject(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null
  );
}

export function isBrowserRepairRequest(
  value: unknown,
): value is BrowserRepairRequest {
  if (!isObject(value)) {
    return false;
  }

  const status = value.status;

  return (
    typeof value.questionId === "string" &&
    typeof value.questionTitle === "string" &&
    typeof value.product === "string" &&
    typeof value.expertId === "string" &&
    typeof value.expertName === "string" &&
    typeof value.reason === "string" &&
    (status === "수리 상담 중" ||
      status === "수리 완료") &&
    typeof value.createdAt === "string" &&
    (value.completedAt === undefined ||
      typeof value.completedAt === "string")
  );
}

function isRepairConversationMessage(
  value: unknown,
): value is RepairConversationMessage {
  if (!isObject(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    (value.sender === "user" ||
      value.sender === "expert" ||
      value.sender === "system") &&
    typeof value.body === "string" &&
    typeof value.createdAt === "string"
  );
}

export function getRepairRequestStorageKey(
  questionId: string,
) {
  return `${repairRequestPrefix}${questionId}`;
}

function getRepairMessageStorageKey(
  questionId: string,
) {
  return `${repairMessagePrefix}${questionId}`;
}

export function readBrowserRepairRequest(
  questionId: string,
): BrowserRepairRequest | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.localStorage.getItem(
    getRepairRequestStorageKey(questionId),
  );

  if (!value) {
    return null;
  }

  try {
    const parsedValue: unknown = JSON.parse(value);

    if (!isBrowserRepairRequest(parsedValue)) {
      return null;
    }

    return parsedValue;
  } catch {
    return null;
  }
}

export function readAllBrowserRepairRequests() {
  if (typeof window === "undefined") {
    return [] as BrowserRepairRequest[];
  }

  const requests: BrowserRepairRequest[] = [];

  for (
    let index = 0;
    index < window.localStorage.length;
    index += 1
  ) {
    const key = window.localStorage.key(index);

    if (!key?.startsWith(repairRequestPrefix)) {
      continue;
    }

    const value = window.localStorage.getItem(key);

    if (!value) {
      continue;
    }

    try {
      const parsedValue: unknown = JSON.parse(value);

      if (isBrowserRepairRequest(parsedValue)) {
        requests.push(parsedValue);
      }
    } catch {
      continue;
    }
  }

  return requests;
}

export function saveBrowserRepairRequest(
  request: BrowserRepairRequest,
) {
  window.localStorage.setItem(
    getRepairRequestStorageKey(
      request.questionId,
    ),
    JSON.stringify(request),
  );
}

export function removeBrowserRepairRequest(
  questionId: string,
) {
  window.localStorage.removeItem(
    getRepairRequestStorageKey(questionId),
  );

  window.localStorage.removeItem(
    getRepairMessageStorageKey(questionId),
  );
}

export function readRepairMessages(
  questionId: string,
) {
  if (typeof window === "undefined") {
    return [] as RepairConversationMessage[];
  }

  const value = window.localStorage.getItem(
    getRepairMessageStorageKey(questionId),
  );

  if (!value) {
    return [];
  }

  try {
    const parsedValue: unknown = JSON.parse(value);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(
      isRepairConversationMessage,
    );
  } catch {
    return [];
  }
}

export function saveRepairMessages(
  questionId: string,
  messages: RepairConversationMessage[],
) {
  window.localStorage.setItem(
    getRepairMessageStorageKey(questionId),
    JSON.stringify(messages),
  );
}
