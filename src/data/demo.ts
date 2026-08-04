export type Category = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

export type CasePreview = {
  id: string;
  category: string;
  brand: string;
  model: string;
  title: string;
  status: "답변 대기" | "진단 중" | "해결 완료";
  commentCount: number;
  expertCount: number;
  resolution?: string;
  repairCost?: number;
  createdAt: string;
};

export const categories: Category[] = [
  {
    id: "cleaning",
    name: "청소가전",
    icon: "🧹",
    description: "로봇청소기, 무선청소기",
  },
  {
    id: "kitchen",
    name: "주방가전",
    icon: "☕",
    description: "커피머신, 밥솥, 식기세척기",
  },
  {
    id: "living",
    name: "생활가전",
    icon: "🏠",
    description: "세탁기, 건조기, 공기청정기",
  },
  {
    id: "computer",
    name: "PC·주변기기",
    icon: "💻",
    description: "노트북, 모니터, 프린터",
  },
  {
    id: "mobile",
    name: "모바일·웨어러블",
    icon: "📱",
    description: "스마트폰, 태블릿, 스마트워치",
  },
  {
    id: "audio-video",
    name: "영상·음향",
    icon: "📺",
    description: "TV, 스피커, 이어폰",
  },
  {
    id: "game",
    name: "게임기",
    icon: "🎮",
    description: "콘솔, 컨트롤러, 휴대용 게임기",
  },
  {
    id: "other",
    name: "기타 전자제품",
    icon: "🔧",
    description: "목록에 없는 제품도 질문 가능",
  },
];

export const recentCases: CasePreview[] = [
  {
    id: "roborock-s8-charging",
    category: "청소가전",
    brand: "로보락",
    model: "S8 MaxV Ultra",
    title: "충전독에 올리면 표시등이 꺼지고 충전이 되지 않습니다",
    status: "진단 중",
    commentCount: 8,
    expertCount: 3,
    createdAt: "18분 전",
  },
  {
    id: "dyson-v12-stop",
    category: "청소가전",
    brand: "다이슨",
    model: "V12 Detect Slim",
    title: "작동 중 갑자기 멈추고 잠시 뒤 다시 켜집니다",
    status: "해결 완료",
    commentCount: 12,
    expertCount: 2,
    resolution: "필터 세척 및 배터리 접점 정비",
    repairCost: 0,
    createdAt: "2시간 전",
  },
  {
    id: "delonghi-water-leak",
    category: "주방가전",
    brand: "드롱기",
    model: "ECAM 22.110",
    title: "커피 추출 중 본체 아래로 물이 새어 나옵니다",
    status: "답변 대기",
    commentCount: 1,
    expertCount: 0,
    createdAt: "3시간 전",
  },
  {
    id: "lg-gram-display",
    category: "PC·주변기기",
    brand: "LG전자",
    model: "16ZD90Q",
    title: "화면이 간헐적으로 깜빡이고 밝기가 변합니다",
    status: "해결 완료",
    commentCount: 15,
    expertCount: 4,
    resolution: "디스플레이 케이블 교체",
    repairCost: 78000,
    createdAt: "어제",
  },
];
