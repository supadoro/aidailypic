export const forbiddenSubmitPageClaims = ["조회수 보장", "매출 보장", "구매 보장"];

export const makerValueProps = [
  {
    title: "첫 사용자가 이해할 언어로 정리",
    description: "메이커의 기능 설명을 초보자 관점의 문제, 사용 장면, 첫 결과물 중심으로 바꿔 소개합니다.",
  },
  {
    title: "광고가 아니라 검수 메모로 노출",
    description: "데모, 가격, 이미지, 한계가 확인된 제보만 공개 후보가 되며 과장된 성과 문구는 줄입니다.",
  },
  {
    title: "한국 SaaS와 바이브코딩 툴에 맞춘 발견 경로",
    description: "AI 자동화, 노코드, 생산성, 마케팅 SaaS를 찾는 사용자가 훑어볼 수 있는 런칭 보드로 연결합니다.",
  },
];

export const evidencePackItems = [
  "실제로 열리는 데모 또는 공식 홈페이지 URL",
  "무료 플랜, 무료체험, 유료 전환 조건이 보이는 가격 정보",
  "공식 스크린샷, 제품 이미지, 데모 GIF 중 하나",
  "처음 쓰는 사용자가 3분 안에 해볼 수 있는 사용 흐름",
  "가장 잘 맞는 사용자와 추천하지 않는 사용자",
  "Cursor, Claude Code, Lovable, v0, Replit, Bolt 등 제작 스택",
];

export const reviewTimeline = [
  {
    title: "제보 접수",
    description: "제출 내용은 관리자 제출함에 후보 상태로 들어갑니다.",
  },
  {
    title: "근거 확인",
    description: "데모 링크, 가격/무료 범위, 이미지 사용 동의, 초보자 사용 흐름을 확인합니다.",
  },
  {
    title: "소개문 정리",
    description: "누가 쓰면 좋은지, 어디서 막힐 수 있는지, 어떤 자료가 공식 근거인지 분리합니다.",
  },
  {
    title: "공개 또는 보류",
    description: "검수 준비도가 채워지면 런칭 보드에 공개하고, 부족하면 보류하거나 추가 자료를 요청합니다.",
  },
];

export const promotionPaths = [
  {
    label: "무료 검토",
    title: "런칭 후보 등록",
    description: "데모와 타깃이 명확한 제품은 무료로 검토 후보에 넣습니다.",
    disclosure: "무료 검토는 공개 노출을 보장하지 않습니다.",
  },
  {
    label: "유료 소개",
    title: "런칭 스폰서",
    description: "홈, 뉴스레터, SNS 소재로 묶어 더 강한 노출을 설계합니다.",
    disclosure: "유료 소개는 스폰서 여부를 공개합니다.",
  },
  {
    label: "피드백 리포트",
    title: "초보자 관점 점검",
    description: "랜딩, 온보딩, 가격, CTA에서 처음 쓰는 사람이 막히는 지점을 정리합니다.",
    disclosure: "피드백은 개선 제안이며 성과를 보장하지 않습니다.",
  },
];

export const submissionPrepChecklist = [
  "공식 URL이나 바로 열어볼 수 있는 데모 링크를 준비해주세요.",
  "무료 플랜, 무료체험, 유료 전환 조건처럼 가격을 확인할 수 있는 근거를 적어주세요.",
  "제품 이미지, 공식 스크린샷, 데모 GIF 중 하나를 함께 보내면 검토가 빨라집니다.",
  "가장 잘 맞는 사용자와 추천하지 않는 사용자, 처음 막히는 지점을 같이 적어주세요.",
  "바이브코딩으로 만들었다면 사용한 제작 스택과 현재 운영 상태를 알려주세요.",
];

export const submissionExampleCards = [
  {
    tone: "good",
    label: "좋은 제보",
    title: "검토자가 바로 확인할 수 있는 제보",
    description: "공식 URL, 가격 근거, 데모 이미지, 추천 대상, 한계를 한 번에 확인할 수 있습니다.",
    example:
      "1인 쇼핑몰 셀러가 상품 상세페이지 초안을 만드는 툴입니다. 공식 데모 URL과 가격 페이지가 있고, 무료 플랜은 월 5개 생성까지입니다. 이미지/GIF 사용 동의가 가능하며, 대량 상품 등록에는 아직 맞지 않습니다.",
  },
  {
    tone: "weak",
    label: "아쉬운 제보",
    title: "광고 문구만 있고 확인 근거가 부족한 제보",
    description: "무엇을 줄여주는지, 누가 쓰는지, 가격이나 실제 화면이 있는지 확인하기 어렵습니다.",
    example:
      "국내 최고의 AI SaaS입니다. 누구나 쓰면 좋고 생산성이 크게 오릅니다. 자세한 내용은 아직 비공개지만 먼저 소개해주세요.",
  },
];
