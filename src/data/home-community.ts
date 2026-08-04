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
  brand: string;
  model: string;
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
  resolution?: string;
};

export const communityPosts: CommunityPost[] = [
  {
    id: "roborock-s8-charging",
    type: "질문",
    category: "청소가전",
    brand: "로보락",
    model: "S8 MaxV Ultra",
    title:
      "충전독에 올리면 표시등이 꺼지고 충전이 되지 않습니다",
    excerpt:
      "콘센트와 어댑터 연결은 확인했습니다. 본체를 충전독에 올리면 잠시 표시등이 켜졌다가 바로 꺼집니다.",
    author: "청소초보",
    authorRole: "일반 사용자",
    createdAt: "18분 전",
    commentCount: 8,
    helpfulCount: 5,
    viewCount: 126,
    status: "진단 중",
    tags: ["로보락", "충전 불량"],
    href: "/questions/roborock-s8-charging",
  },
  {
    id: "delonghi-water-leak",
    type: "질문",
    category: "주방가전",
    brand: "드롱기",
    model: "ECAM 22.110",
    title:
      "커피 추출 중 본체 아래로 물이 새어 나옵니다",
    excerpt:
      "물통과 물받이는 제대로 장착했습니다. 추출을 시작하면 본체 오른쪽 아래에 물이 조금씩 고입니다.",
    author: "홈카페입문",
    authorRole: "일반 사용자",
    createdAt: "42분 전",
    commentCount: 1,
    helpfulCount: 2,
    viewCount: 74,
    status: "답변 대기",
    tags: ["드롱기", "누수"],
    href:
      "/questions?query=%EB%93%9C%EB%A1%B1%EA%B8%B0%20%EB%88%84%EC%88%98",
  },
  {
    id: "galaxy-tab-charge",
    type: "질문",
    category: "모바일·웨어러블",
    brand: "삼성전자",
    model: "갤럭시탭 S8",
    title:
      "충전 케이블을 특정 각도로 눌러야 충전됩니다",
    excerpt:
      "충전기와 케이블을 교체해도 증상이 같습니다. 단자 청소로 해결 가능한 문제인지 궁금합니다.",
    author: "태블릿유저",
    authorRole: "일반 사용자",
    createdAt: "1시간 전",
    commentCount: 0,
    helpfulCount: 1,
    viewCount: 39,
    status: "답변 대기",
    tags: ["갤럭시탭", "충전 단자"],
    href:
      "/questions?query=%EA%B0%A4%EB%9F%AD%EC%8B%9C%ED%83%AD%20%EC%B6%A9%EC%A0%84",
  },
  {
    id: "lg-gram-display",
    type: "질문",
    category: "PC·주변기기",
    brand: "LG전자",
    model: "16ZD90Q",
    title:
      "화면이 간헐적으로 깜빡이고 밝기가 변합니다",
    excerpt:
      "외부 모니터에서는 정상이라 본체 디스플레이 케이블 문제로 의심하고 있습니다.",
    author: "그램사용자",
    authorRole: "일반 사용자",
    createdAt: "3시간 전",
    commentCount: 15,
    helpfulCount: 17,
    viewCount: 319,
    status: "해결 완료",
    tags: ["LG그램", "화면 깜빡임"],
    href:
      "/questions?query=LG%EA%B7%B8%EB%9E%A8%20%ED%99%94%EB%A9%B4",
    resolution: "디스플레이 케이블 교체",
  },
  {
    id: "dyson-v12-stop",
    type: "해결 기록",
    category: "청소가전",
    brand: "다이슨",
    model: "V12 Detect Slim",
    title:
      "작동 중 반복해서 멈추던 문제를 필터 세척으로 해결했습니다",
    excerpt:
      "배터리 문제라고 생각했지만 전문가 답변대로 필터와 흡입 통로를 점검한 뒤 정상 작동했습니다.",
    author: "먼지없는집",
    authorRole: "일반 사용자",
    createdAt: "어제",
    commentCount: 12,
    helpfulCount: 31,
    viewCount: 482,
    status: "해결 완료",
    tags: ["다이슨", "작동 중지"],
    href:
      "/questions?query=%EB%8B%A4%EC%9D%B4%EC%8A%A8%20V12",
    resolution: "필터 세척 및 흡입 통로 정리",
  },
  {
    id: "air-purifier-sensor",
    type: "사용 팁",
    category: "생활가전",
    brand: "공통",
    model: "공기청정기",
    title:
      "필터 교체 후에도 수치가 높다면 센서를 확인해 보세요",
    excerpt:
      "센서 덮개 안쪽에 쌓인 먼지로 인해 미세먼지 수치가 계속 높게 표시될 수 있습니다.",
    author: "김도현",
    authorRole: "사업자 인증 전문가",
    createdAt: "어제",
    commentCount: 9,
    helpfulCount: 76,
    viewCount: 921,
    tags: ["공기청정기", "센서 청소"],
    href:
      "/questions?query=%EA%B3%B5%EA%B8%B0%EC%B2%AD%EC%A0%95%EA%B8%B0%20%EC%84%BC%EC%84%9C",
  },
  {
    id: "switch-joycon-repair",
    type: "해결 기록",
    category: "게임기",
    brand: "닌텐도",
    model: "스위치 조이콘",
    title:
      "조이콘 쏠림이 재발해 스틱 모듈을 교체했습니다",
    excerpt:
      "접점 청소로 잠시 좋아졌지만 증상이 재발해 전문가 상담 후 부품을 교체했습니다.",
    author: "게임하는직장인",
    authorRole: "일반 사용자",
    createdAt: "2일 전",
    commentCount: 18,
    helpfulCount: 54,
    viewCount: 1104,
    status: "해결 완료",
    tags: ["닌텐도 스위치", "조이콘"],
    href:
      "/questions?query=%EC%A1%B0%EC%9D%B4%EC%BD%98%20%EC%8F%A0%EB%A6%BC",
    resolution: "스틱 모듈 교체",
  },
  {
    id: "washer-noise",
    type: "사용 팁",
    category: "생활가전",
    brand: "공통",
    model: "세탁기",
    title:
      "탈수 소음은 수평 상태부터 확인하는 것이 좋습니다",
    excerpt:
      "베어링 고장으로 단정하기 전에 바닥 수평, 세탁물 쏠림, 운송 볼트를 순서대로 점검해야 합니다.",
    author: "박정우",
    authorRole: "개인 전문가",
    createdAt: "3일 전",
    commentCount: 7,
    helpfulCount: 39,
    viewCount: 573,
    tags: ["세탁기", "탈수 소음"],
    href:
      "/questions?query=%EC%84%B8%ED%83%81%EA%B8%B0%20%ED%83%88%EC%88%98%20%EC%86%8C%EC%9D%8C",
  },
];

export const homeQuestions = communityPosts
  .filter((post) => post.type === "질문")
  .slice(0, 5);

export const solvedCases = communityPosts
  .filter(
    (post) =>
      post.status === "해결 완료" &&
      Boolean(post.resolution),
  )
  .slice(0, 3);
