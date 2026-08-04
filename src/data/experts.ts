export type ExpertVerification =
  | "사업자 인증"
  | "경력 인증"
  | "인증 검토 중";

export type ExpertAvailability =
  | "수리 상담 가능"
  | "온라인 답변만 가능"
  | "현재 상담 불가";

export type ExpertProfile = {
  id: string;
  name: string;
  verification: ExpertVerification;
  availability: ExpertAvailability;
  headline: string;
  introduction: string;
  experienceYears: number;
  specialties: string[];
  brands: string[];
  serviceAreas: string[];
  answerCount: number;
  helpfulCount: number;
  solvedCount: number;
  averageResponseTime: string;
  isBusinessVerified: boolean;
};

export const experts: ExpertProfile[] = [
  {
    id: "kim-dohyeon",
    name: "김도현",
    verification: "사업자 인증",
    availability: "수리 상담 가능",
    headline: "로봇청소기와 무선청소기 전문 수리",
    introduction:
      "로봇청소기 충전 불량, 도킹 스테이션, 센서, 흡입 모터와 배터리 문제를 주로 진단하고 수리합니다.",
    experienceYears: 8,
    specialties: [
      "로봇청소기",
      "무선청소기",
      "충전독",
      "배터리",
    ],
    brands: [
      "로보락",
      "다이슨",
      "에코백스",
      "샤오미",
    ],
    serviceAreas: [
      "서울",
      "경기",
      "택배 수리",
    ],
    answerCount: 426,
    helpfulCount: 318,
    solvedCount: 147,
    averageResponseTime: "평균 18분",
    isBusinessVerified: true,
  },
  {
    id: "park-jeongwoo",
    name: "박정우",
    verification: "경력 인증",
    availability: "온라인 답변만 가능",
    headline: "전자제품 전원부와 회로 진단",
    introduction:
      "전자제품이 켜지지 않거나 작동 중 꺼지는 증상을 중심으로 안전한 확인 방법과 수리 필요 여부를 안내합니다.",
    experienceYears: 11,
    specialties: [
      "전원 불량",
      "충전 불량",
      "회로 진단",
      "소형가전",
    ],
    brands: [
      "삼성전자",
      "LG전자",
      "다이슨",
      "필립스",
    ],
    serviceAreas: [
      "온라인 답변",
    ],
    answerCount: 291,
    helpfulCount: 204,
    solvedCount: 96,
    averageResponseTime: "평균 34분",
    isBusinessVerified: false,
  },
];

export function getExpertById(expertId: string) {
  return experts.find((expert) => expert.id === expertId);
}
