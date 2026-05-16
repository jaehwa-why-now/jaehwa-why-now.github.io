import { HeartPulse, UserCheck, Flame, Activity, Droplet, ShieldCheck } from 'lucide-react';

const gymAddress = "서울특별시 구로구 디지털로32나길 38 서림빌딩 3, 4층";
const gymMapQuery = `${gymAddress} 에이블짐 구로디지털단지역점`;

export const trainerProfile = {
  name: "진(이재화)",
  title: "프리미엄 퍼스널 팀장",
  tagline: "특전사 출신의 강인함과 전문적인 지식을 바탕으로 확실한 결과를 만듭니다",
  description: "NASM-CPT 자격 및 스포츠 영양 코치 수료를 바탕으로 체계적이고 과학적인 트레이닝을 제공합니다. 7공수여단 특전사 명예전역 및 다년간의 PT 팀장 경력으로 당신의 목표 달성을 끝까지 책임지겠습니다.",
  phone: "010-5888-1297",
  instagram: "https://www.instagram.com/ablegym32?igsh=a2F6bm92NjVnMzBu",
  kakaoTalk: "https://open.kakao.com/o/sFX8icvi",
  location: "에이블짐 구로디지털단지역점",
  address: gymAddress,
  mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(gymMapQuery)}&t=&z=16&ie=UTF8&iwloc=&output=embed`,
  mapUrl: "https://naver.me/F0z2xgR1",
  operatingHours: "평일 00:00 - 24:00 / 주말·공휴일 09:00 - 21:00 / 매월 둘째주 일요일 휴무",
  mainImage: "/assets/foto2.jpeg",
  heroImage: "/assets/foto.jpeg"
};

export const heroStats = [
  { label: "누적 회원 수", value: "1,000+" },
  { label: "평균 목표 달성률", value: "95%" },
  { label: "트레이닝 경력", value: "8년" }
];

export const benefits = [
  {
    icon: UserCheck,
    title: "1:1 맞춤형 진단",
    description: "체형, 라이프스타일, 식습관을 다각도로 분석하여 최적의 방향을 제시합니다."
  },
  {
    icon: HeartPulse,
    title: "체계적인 데이터 관리",
    description: "매주 체성분 분석과 눈바디 기록으로 객관적인 변화를 추적합니다."
  },
  {
    icon: ShieldCheck,
    title: "안전 최우선 코칭",
    description: "부상 방지를 위한 꼼꼼한 자세 교정과 체형별 제한 사항을 고려합니다."
  },
  {
    icon: Droplet,
    title: "현실적인 식단 설계",
    description: "닭가슴살만 고집하지 않습니다. 일상에서 유지 가능한 식단을 구성합니다."
  },
  {
    icon: Flame,
    title: "강력한 동기부여",
    description: "포기하고 싶은 순간, 페이스메이커가 되어 목표 끝까지 함께 달립니다."
  },
  {
    icon: Activity,
    title: "독립 운동 능력 향상",
    description: "PT가 끝난 후에도 스스로 운동할 수 있는 능력을 길러드립니다."
  }
];

export const programs = [
  {
    id: "diet",
    title: "다이어트 & 바디프로필",
    target: "단기간 확실한 체중 감량이 필요하신 분",
    description: "체지방은 빼고 근육량은 지키는 과학적인 다이어트 프로그램입니다.",
    includes: ["주 3회 밀착 트레이닝", "매일 식단 피드백", "바디프로필 촬영 서포트", "맞춤형 유산소 루틴"],
    ctaText: "다이어트 상담하기"
  },
  {
    id: "strength",
    title: "근력 & 체력 향상",
    target: "마른 체형이 고민이거나 체력이 부족하신 분",
    description: "올바른 웨이트 트레이닝으로 탄탄한 몸과 강한 체력을 완성합니다.",
    includes: ["체형별 스트렝스 루틴", "증량 맞춤 영양 설계", "부위별 타겟팅 노하우", "주간 중량 변화 추적"],
    ctaText: "근력 향상 상담하기"
  },
  {
    id: "rehab",
    title: "체형 교정 & 통증 케어",
    target: "거북목, 라운드숄더 등 불균형이 고민이신 분",
    description: "움직임 평가를 통해 원인을 찾고 기능적 트레이닝으로 밸런스를 회복합니다.",
    includes: ["정밀 움직임 평가", "통증 완화 스트레칭", "약화 근육 강화 루틴", "일생생활 자세 교정 가이드"],
    ctaText: "체형 교정 상담하기"
  }
];

export const processSteps = [
  { step: 1, title: "1:1 무료 상담 신청", description: "카카오톡이나 전화를 통해 편하게 상담을 예약합니다." },
  { step: 2, title: "현재 상태 분석", description: "인바디 및 체형 분석, 라이프스타일 체크를 진행합니다." },
  { step: 3, title: "맞춤형 솔루션 설계", description: "목표 달성을 위한 최적의 기간과 프로그램, 식단 방향을 설정합니다." },
  { step: 4, title: "본격적인 트레이닝 시작", description: "매 세션 꼼꼼한 기록과 피드백으로 밀착 관리가 시작됩니다." }
];

export const reviews = [
  {
    id: 1,
    name: "이OO 회원님",
    type: "다이어트 / 3개월 진행",
    text: "운동을 처음 해봐서 두려웠는데, 제 수준에 맞춰서 하나하나 차근차근 알려주셔서 너무 좋았어요. 3개월 만에 체지방만 8kg 감량했습니다!",
    rating: 5
  },
  {
    id: 2,
    name: "김OO 회원님",
    type: "근력 향상 / 6개월 진행",
    text: "매번 작심삼일이었는데, 코치님의 긍정적인 에너지 덕분에 포기하지 않고 여기까지 왔습니다. 골격근량 4kg 증가, 인생 첫 바디프로필도 성공했어요.",
    rating: 5
  },
  {
    id: 3,
    name: "박OO 회원님",
    type: "체형 교정 / 2개월 진행",
    text: "하루 종일 앉아 일하느라 목, 어깨 통증이 심했는데 코치님과 운동하며 통증이 정말 많이 줄었습니다. 일상이 편안해졌어요.",
    rating: 5
  }
];

export const pricingPlans = [
  {
    name: "1:1 체험 PT",
    price: "상담 후 안내",
    target: "나에게 맞는 코치인지 먼저 확인하고 싶은 분",
    includes: ["체성분 및 체형 분석", "목표 설정 상담", "50분 맞춤형 체험 수업"],
    isPopular: false
  },
  {
    name: "베이직 패키지 (10회)",
    price: "상담 후 안내",
    target: "운동의 기초를 잡고 독립할 준비를 하는 분",
    includes: ["1:1 맞춤형 수업 10회", "기본 식단 가이드 제공", "개인 운동 루틴 설계"],
    isPopular: true
  },
  {
    name: "프리미엄 패키지 (30회)",
    price: "상담 후 안내",
    target: "확실한 변화(바디프로필/대회)를 원하시는 분",
    includes: ["1:1 맞춤형 수업 30회", "매일 식단 밀착 관리", "바디프로필 촬영 당일 서포트", "운동복 및 락커 지원"],
    isPopular: false
  }
];

export const faqs = [
  {
    question: "운동을 한 번도 해본 적이 없는데 괜찮을까요?",
    answer: "네, 전혀 문제없습니다! 오히려 처음에 정확한 자세와 습관을 배우는 것이 매우 중요합니다. 회원님의 체력과 눈높이에 맞춰 가장 기초적인 움직임부터 차근차근 지도해 드립니다."
  },
  {
    question: "식단 관리도 해주시나요?",
    answer: "물론입니다. 무조건 굶거나 맛없는 식단만 강요하지 않습니다. 회원님의 생활 패턴(직장인, 교대근무 등)을 고려하여 일상에서 유지 가능한 식단을 함께 구성하고 매일 피드백해 드립니다."
  },
  {
    question: "주 몇 회 정도 운동하는 것이 좋나요?",
    answer: "목표와 개인의 일정에 따라 다르지만, 보통 주 2~3회 PT 수업을 권장합니다. 수업이 없는 날에는 배운 내용을 복습할 수 있도록 개인 운동 루틴을 짜드립니다."
  },
  {
    question: "비용은 어떻게 되나요?",
    answer: "등록 횟수와 프로그램에 따라 비용이 상이합니다. 체험 수업이나 방문 상담을 통해 몸 상태를 먼저 체크한 후 가장 합리적인 프로그램을 추천해 드리고 있습니다. 언제든 편하게 문의해 주세요."
  }
];

export const navigationItems = [
  { name: 'About', href: '#about' },
  { name: 'Programs', href: '#programs' },
  { name: 'FAQ', href: '#faq' }
];
