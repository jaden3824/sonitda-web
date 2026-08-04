export type ParticipantRole =
  | "질문자"
  | "일반 사용자"
  | "개인 전문가"
  | "사업자 인증 전문가";

export type QuestionComment = {
  id: string;
  author: {
    name: string;
    role: ParticipantRole;
    profile: string;
    expertId?: string;
    helpfulCount?: number;
  };
  content: string;
  createdAt: string;
  replyTo?: string;
  isAccepted?: boolean;
  canRequestRepair?: boolean;
};

export type QuestionDetail = {
  id: string;
  category: string;
  brand: string;
  model: string;
  title: string;
  symptom: string;
  description: string;
  attemptedActions: string[];
  images: {
    src: string;
    alt: string;
    caption: string;
  }[];
  status: "답변 대기" | "진단 중" | "해결 완료";
  createdAt: string;
  viewCount: number;
  questioner: {
    name: string;
  };
  comments: QuestionComment[];
};

export const questionDetail: QuestionDetail = {
  id: "roborock-s8-charging",
  category: "청소가전",
  brand: "로보락",
  model: "S8 MaxV Ultra",
  title: "충전독에 올리면 표시등이 꺼지고 충전이 되지 않습니다",
  symptom:
    "청소기는 정상적으로 움직이지만 충전독에 올리면 잠시 후 표시등이 꺼지고 배터리가 충전되지 않습니다.",
  description:
    "구매한 지 약 1년 4개월 정도 됐습니다. 어제까지 정상적으로 사용했지만 오늘부터 충전이 되지 않습니다. 직접 충전독에 올려놓아도 같은 증상이 발생합니다.",
  attemptedActions: [
    "충전독 전원 케이블을 뽑았다가 다시 연결했습니다.",
    "청소기와 충전독의 충전 단자를 마른 천으로 닦았습니다.",
    "다른 콘센트에도 연결해 봤지만 증상이 같습니다.",
  ],
  images: [
    {
      src: "/images/questions/roborock-s8-charging-1.jpg",
      alt: "충전독과 로봇청소기의 상태",
      caption: "충전독에 올려놓은 로봇청소기 상태",
    },
    {
      src: "/images/questions/roborock-s8-charging-2.jpg",
      alt: "충전 어댑터와 전원 연결 상태",
      caption: "충전 어댑터와 전원 케이블 연결 상태",
    },
  ],
  status: "진단 중",
  createdAt: "18분 전",
  viewCount: 126,
  questioner: {
    name: "청소초보",
  },
  comments: [
    {
      id: "comment-1",
      author: {
        name: "김도현",
        role: "사업자 인증 전문가",
        profile: "로봇청소기 수리 8년",
        expertId: "kim-dohyeon",
        helpfulCount: 318,
      },
      content:
        "말씀하신 증상만 보면 충전 단자의 단순 오염보다는 충전독 내부 전원부나 어댑터 출력 문제일 가능성이 있습니다. 우선 청소기를 올리기 전에는 충전독 표시등이 계속 켜져 있는지 확인해 주세요.",
      createdAt: "12분 전",
      canRequestRepair: true,
    },
    {
      id: "comment-2",
      author: {
        name: "청소초보",
        role: "질문자",
        profile: "질문 작성자",
      },
      content:
        "청소기를 올리기 전에는 표시등이 켜져 있습니다. 청소기를 올리면 2~3초 정도 켜져 있다가 꺼집니다.",
      createdAt: "9분 전",
      replyTo: "김도현",
    },
    {
      id: "comment-3",
      author: {
        name: "박정우",
        role: "개인 전문가",
        profile: "전자제품 수리 경력 11년",
        expertId: "park-jeongwoo",
        helpfulCount: 204,
      },
      content:
        "충전이 시작되는 순간 전압이 떨어지는 증상일 수 있습니다. 어댑터나 충전독 전원부가 부하를 견디지 못하는 경우 이런 현상이 나타납니다. 안전을 위해 충전독을 직접 분해하지는 마세요.",
      createdAt: "7분 전",
      canRequestRepair: false,
    },
    {
      id: "comment-4",
      author: {
        name: "김도현",
        role: "사업자 인증 전문가",
        profile: "로봇청소기 수리 8년",
        expertId: "kim-dohyeon",
        helpfulCount: 318,
      },
      content:
        "추가 설명을 보면 전원부 쪽 가능성이 더 높아 보입니다. 정확한 확인에는 어댑터 출력과 충전독 내부 전압 측정이 필요합니다. 동일 모델에서는 어댑터 불량과 충전독 전원 보드 문제를 모두 확인해야 합니다.",
      createdAt: "4분 전",
      replyTo: "청소초보",
      canRequestRepair: true,
    },
  ],
};
