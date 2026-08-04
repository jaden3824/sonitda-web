export type MyActivityStatus =
  | "답변 대기"
  | "진단 중"
  | "수리 상담 중"
  | "해결 완료";

export type MyQuestion = {
  id: string;
  title: string;
  product: string;
  status: MyActivityStatus;
  commentCount: number;
  updatedAt: string;
};

export type RepairRequest = {
  id: string;
  questionId: string;
  product: string;
  expertName: string;
  status: "전문가 답변 확인" | "수리 상담 중" | "수리 완료";
  nextAction: string;
  updatedAt: string;
};

export const currentUser = {
  username: "cleaning_beginner",
  nickname: "청소초보",
  memberType: "일반 사용자",
  joinedAt: "2026년 8월",
  stats: {
    questionCount: 2,
    commentCount: 6,
    savedCount: 3,
  },
};

export const myQuestions: MyQuestion[] = [
  {
    id: "roborock-s8-charging",
    title: "충전독에 올리면 표시등이 꺼지고 충전이 되지 않습니다",
    product: "로보락 · S8 MaxV Ultra",
    status: "진단 중",
    commentCount: 4,
    updatedAt: "4분 전",
  },
  {
    id: "dyson-v12-stop",
    title: "작동 중 갑자기 멈추고 잠시 뒤 다시 켜집니다",
    product: "다이슨 · V12 Detect Slim",
    status: "해결 완료",
    commentCount: 12,
    updatedAt: "2일 전",
  },
];

export const repairRequests: RepairRequest[] = [
  {
    id: "repair-request-1",
    questionId: "roborock-s8-charging",
    product: "로보락 S8 MaxV Ultra",
    expertName: "김도현",
    status: "전문가 답변 확인",
    nextAction: "공개 답변을 확인한 뒤 수리 요청 여부를 결정해 주세요.",
    updatedAt: "4분 전",
  },
];
