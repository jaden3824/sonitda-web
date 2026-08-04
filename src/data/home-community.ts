export type CommunityPostType =
  | "질문"
  | "해결 기록"
  | "사용 팁";

export type CommunityPostStatus =
  | "답변 대기"
  | "진단 중"
  | "해결 완료";

export type CommunityPost = {
  id: string;
  type: CommunityPostType;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  createdAt: string;
  commentCount: number;
  helpfulCount: number;
  viewCount: number;
  status?: CommunityPostStatus;
  tags: string[];
  href: string;
  hasAcceptedAnswer?: boolean;
};

export type WaitingQuestion = {
  id: string;
  category: string;
  title: string;
  createdAt: string;
  href: string;
};

export const communityPosts: CommunityPost[] = [
  {
    id: "roborock-s8-charging",
    type: "질문",
    category: "청소가전",
    title:
      "충전독에 올리면 표시등이 꺼지고 충전이 되지 않습니다",
    excerpt:
      "콘센트와 어댑터 연결은 확인했습니다. 본체를 충전독에 올리면 표시등이 잠시 켜졌다가 바로 꺼집니다.",
    author: "청소초보",
    authorRole: "일반 사용자",
    createdAt: "18분 전",
    commentCount: 8,
    helpfulCount: 5,
    viewCount: 126,
    status: "진단 중",
    tags: [
      "로보락",
      "충전 불량",
      "S8 MaxV Ultra",
    ],
    href: "/questions/roborock-s8-charging",
  },
  {
    id: "delonghi-water-leak",
    type: "질문",
    category: "주방가전",
    title:
      "커피 추출 중 드롱기 본체 아래로 물이 새어 나옵니다",
    excerpt:
      "물통과 물받이는 정상적으로 장착했습니다. 추출을 시작하면 오른쪽 아래에서 물이 조금씩 고입니다.",
    author: "홈카페입문",
    authorRole: "일반 사용자",
    createdAt: "41분 전",
    commentCount: 1,
    helpfulCount: 2,
    viewCount: 74,
    status: "답변 대기",
    tags: ["드롱기", "누수", "ECAM"],
    href:
      "/questions?query=%EB%93%9C%EB%A1%B1%EA%B8%B0%20%EB%88%84%EC%88%98",
  },
  {
    id: "galaxy-tab-charge",
    type: "질문",
    category: "모바일·웨어러블",
    title:
      "갤럭시탭이 충전 케이블을 특정 각도로 눌러야 충전됩니다",
    excerpt:
      "케이블과 충전기는 교체해 봤지만 동일합니다. 단자 청소로 해결할 수 있는 문제인지 궁금합니다.",
    author: "태블릿유저",
    authorRole: "일반 사용자",
    createdAt: "1시간 전",
    commentCount: 0,
    helpfulCount: 1,
    viewCount: 39,
    status: "답변 대기",
    tags: ["갤럭시탭", "충전 단자", "접촉 불량"],
    href:
      "/questions?query=%EA%B0%A4%EB%9F%AD%EC%8B%9C%ED%83%AD%20%EC%B6%A9%EC%A0%84",
  },
  {
    id: "dyson-v12-stop",
    type: "해결 기록",
    category: "청소가전",
    title:
      "다이슨 V12가 반복해서 멈추던 문제를 필터 세척으로 해결했습니다",
    excerpt:
      "배터리 문제라고 생각했지만 전문가 답변대로 필터와 흡입 통로를 점검한 뒤 정상 작동했습니다.",
    author: "먼지없는집",
    authorRole: "일반 사용자",
    createdAt: "2시간 전",
    commentCount: 12,
    helpfulCount: 31,
    viewCount: 482,
    status: "해결 완료",
    tags: ["다이슨", "작동 중지", "자가 점검"],
    href:
      "/questions?query=%EB%8B%A4%EC%9D%B4%EC%8A%A8%20V12",
    hasAcceptedAnswer: true,
  },
  {
    id: "coffee-machine-cleaning-tip",
    type: "사용 팁",
    category: "주방가전",
    title:
      "전자동 커피머신 내부 세척 전에 확인해야 할 세 가지",
    excerpt:
      "세정제를 바로 넣기보다 추출기 분리 가능 여부, 물받이 상태, 제조사 세척 모드를 먼저 확인하는 것이 안전합니다.",
    author: "이서연",
    authorRole: "사업자 인증 전문가",
    createdAt: "3시간 전",
    commentCount: 6,
    helpfulCount: 48,
    viewCount: 631,
    tags: ["커피머신", "세척", "관리 방법"],
    href:
      "/questions?query=%EC%BB%A4%ED%94%BC%EB%A8%B8%EC%8B%A0%20%EC%84%B8%EC%B2%99",
  },
  {
    id: "lg-gram-display",
    type: "질문",
    category: "PC·주변기기",
    title:
      "LG그램 화면이 간헐적으로 깜빡이고 밝기가 변합니다",
    excerpt:
      "외부 모니터에서는 정상이라 본체 디스플레이나 케이블 문제로 의심하고 있습니다.",
    author: "그램사용자",
    authorRole: "일반 사용자",
    createdAt: "4시간 전",
    commentCount: 15,
    helpfulCount: 17,
    viewCount: 319,
    status: "해결 완료",
    tags: ["LG그램", "화면 깜빡임", "디스플레이"],
    href:
      "/questions?query=LG%EA%B7%B8%EB%9E%A8%20%ED%99%94%EB%A9%B4",
    hasAcceptedAnswer: true,
  },
  {
    id: "monitor-horizontal-line",
    type: "질문",
    category: "PC·주변기기",
    title:
      "모니터 화면 아래쪽에 가로줄이 생기고 점점 넓어집니다",
    excerpt:
      "HDMI 케이블과 연결 기기를 바꿔도 같은 위치에 줄이 보입니다. 패널 고장인지 확인하고 싶습니다.",
    author: "재택근무중",
    authorRole: "일반 사용자",
    createdAt: "어제",
    commentCount: 3,
    helpfulCount: 4,
    viewCount: 154,
    status: "진단 중",
    tags: ["모니터", "가로줄", "패널"],
    href:
      "/questions?query=%EB%AA%A8%EB%8B%88%ED%84%B0%20%EA%B0%80%EB%A1%9C%EC%A4%84",
  },
  {
    id: "air-purifier-sensor",
    type: "사용 팁",
    category: "생활가전",
    title:
      "공기청정기 수치가 계속 높을 때 센서부터 청소해 보세요",
    excerpt:
      "필터를 교체했는데도 수치가 내려가지 않으면 센서 덮개 안쪽에 먼지가 쌓였을 가능성이 있습니다.",
    author: "김도현",
    authorRole: "사업자 인증 전문가",
    createdAt: "어제",
    commentCount: 9,
    helpfulCount: 76,
    viewCount: 921,
    tags: ["공기청정기", "센서", "자가 관리"],
    href:
      "/questions?query=%EA%B3%B5%EA%B8%B0%EC%B2%AD%EC%A0%95%EA%B8%B0%20%EC%84%BC%EC%84%9C",
  },
  {
    id: "switch-joycon-repair",
    type: "해결 기록",
    category: "게임기",
    title:
      "조이콘 쏠림 증상, 접점 청소 후 재발해서 부품을 교체했습니다",
    excerpt:
      "임시 청소로 잠시 좋아졌지만 증상이 재발해 스틱 모듈을 교체했습니다. 수리 전후 과정을 정리했습니다.",
    author: "게임하는직장인",
    authorRole: "일반 사용자",
    createdAt: "2일 전",
    commentCount: 18,
    helpfulCount: 54,
    viewCount: 1104,
    status: "해결 완료",
    tags: ["닌텐도 스위치", "조이콘", "쏠림"],
    href:
      "/questions?query=%EC%A1%B0%EC%9D%B4%EC%BD%98%20%EC%8F%A0%EB%A6%BC",
    hasAcceptedAnswer: true,
  },
  {
    id: "washer-noise-check",
    type: "사용 팁",
    category: "생활가전",
    title:
      "세탁기 탈수 소음은 수평 상태부터 확인해야 합니다",
    excerpt:
      "베어링 고장으로 단정하기 전에 바닥 수평, 운송 볼트, 세탁물 쏠림을 순서대로 확인하는 것이 좋습니다.",
    author: "박정우",
    authorRole: "개인 전문가",
    createdAt: "3일 전",
    commentCount: 7,
    helpfulCount: 39,
    viewCount: 573,
    tags: ["세탁기", "탈수 소음", "자가 점검"],
    href:
      "/questions?query=%EC%84%B8%ED%83%81%EA%B8%B0%20%ED%83%88%EC%88%98%20%EC%86%8C%EC%9D%8C",
  },
];

export const waitingQuestions: WaitingQuestion[] =
  communityPosts
    .filter(
      (post) =>
        post.type === "질문" &&
        post.status === "답변 대기",
    )
    .map((post) => ({
      id: post.id,
      category: post.category,
      title: post.title,
      createdAt: post.createdAt,
      href: post.href,
    }));

export const popularTopics = [
  "충전 불량",
  "화면 깜빡임",
  "누수",
  "작동 중 멈춤",
  "배터리 교체",
  "이상 소음",
  "자가 점검",
  "수리 비용",
] as const;

export const communityStats = [
  {
    label: "오늘 새 질문",
    value: "24",
  },
  {
    label: "답변 대기",
    value: "11",
  },
  {
    label: "오늘 해결",
    value: "17",
  },
  {
    label: "활동 전문가",
    value: "38",
  },
] as const;
