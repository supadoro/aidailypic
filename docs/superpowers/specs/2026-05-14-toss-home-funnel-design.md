# Toss Home Funnel Design

## Goal

홈 첫 화면을 긴 AI/SaaS 디렉토리에서 벗어나, 처음 방문자가 1초 안에 “내 목적을 하나 고르면 된다”고 이해하는 선택형 퍼널로 바꾼다.

## UX Direction

- 첫 화면의 핵심 문장은 하나만 둔다: `AI 툴, 처음이면 목적부터 고르세요`
- 첫 화면 선택지는 3개만 둔다: `글쓰기`, `쇼츠/릴스`, `상세페이지`
- 긴 설명, 시장 분석, 검수 철학, 많은 SaaS 목록은 홈 첫 화면에서 제거한다.
- 검색은 보조 행동으로 두고, 추천 툴은 선택한 목적에 맞는 3개만 보여준다.
- 메이커 제보는 별도 큰 섹션이 아니라 조용한 한 줄 CTA로 노출한다.

## Content Rules

- 첫 화면에서 사용자가 읽어야 하는 문장 수를 최소화한다.
- `Market Radar`, `Starter Paths`, 긴 신뢰 설명은 홈에 직접 펼치지 않는다.
- 신뢰는 긴 문장보다 짧은 라벨로 표현한다: `직접 테스트`, `공식 근거`, `초보자 기준`.
- 과장 표현과 트래픽 보장 표현은 사용하지 않는다.

## Files

- `src/components/home-tool-discovery.tsx`: 홈 UI를 단일 선택 퍼널로 축소한다.
- `scripts/toss-home-funnel.test.mjs`: 홈이 선택형 퍼널 구조를 유지하는지 검사한다.
- `scripts/market-radar.test.mjs`: Market Radar 데이터 검증은 유지하되 홈 직접 노출 요구는 제거한다.

## Success Criteria

- 홈 컴포넌트가 `toss-purpose-selector`를 포함한다.
- 첫 화면 선택지가 정확히 3개다.
- 홈에는 `Market Radar`, `Starter Paths`, `Threads Signal`, `New Watchlist`, `Newsletter` 섹션명이 직접 렌더링되지 않는다.
- 홈에서 `SaasToolCard` 반복 목록 대신 3개 이하의 목적별 추천이 보인다.
- 타입체크, 린트, 빌드, Cloudflare 배포 빌드가 통과한다.
