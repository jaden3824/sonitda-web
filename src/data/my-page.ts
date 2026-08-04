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

export type RepairRequestStatus =
  | "전문가 선택 전"
  | "수리 상담 중"
  | "수리 완료";

export type RepairRequest = {
  id: string;
  questionId: string;
  questionTitle: string;
  product: string;
  expertName?: string;
  expertId?: string;
  status: RepairRequestStatus;
  nextAction: string;
  updatedAt: string;
};

export const currentUser = {
  username: "cleaning_beginner",
  nickname: "청소초보",
  email: "cleaning@example.com",
  profileImage: "/images/profiles/default-profile.png",
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
    questionTitle:
      "충전독에 올리면 표시등이 꺼지고 충전이 되지 않습니다",
    product: "로보락 · S8 MaxV Ultra",
    status: "전문가 선택 전",
    nextAction:
      "공개 답변을 비교한 뒤 수리를 요청할 전문가를 선택해 주세요.",
    updatedAt: "4분 전",
  },
  {
    id: "repair-request-2",
    questionId: "delonghi-water-leak",
    questionTitle:
      "커피 추출 중 본체 아래로 물이 새어 나옵니다",
    product: "드롱기 · ECAM 22.110",
    expertName: "이서연",
    status: "수리 상담 중",
    nextAction:
      "점검 방식과 제품 전달 방법을 전문가와 조율하고 있습니다.",
    updatedAt: "어제",
  },
  {
    id: "repair-request-3",
    questionId: "dyson-v12-stop",
    questionTitle:
      "작동 중 갑자기 멈추고 잠시 뒤 다시 켜집니다",
    product: "다이슨 · V12 Detect Slim",
    expertName: "김도현",
    expertId: "kim-dohyeon",
    status: "수리 완료",
    nextAction:
      "필터 세척과 배터리 접점 정비 후 정상 작동을 확인했습니다.",
    updatedAt: "2일 전",
  },
];

