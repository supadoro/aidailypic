# AIDailyPick Deployment Checklist

이 문서는 AIDailyPick을 Cloudflare Workers/OpenNext 환경에 배포하기 전 확인할 운영 체크리스트입니다.

## 1. 로컬 검증

PowerShell에서는 `npm.ps1` 실행 정책에 막힐 수 있으므로 `npm.cmd`를 사용합니다.

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
npm.cmd run cf:build
```

모든 명령이 exit code 0으로 끝나야 배포를 진행합니다.

## 2. 관리자 보안 값 설정

`/admin`은 HttpOnly 쿠키 기반 로그인으로 보호됩니다.

Cloudflare에 아래 secrets를 등록합니다.

```powershell
npx wrangler secret put ADMIN_PASSWORD
npx wrangler secret put ADMIN_SESSION_SECRET
```

선택 값:

```text
ADMIN_USER=admin
```

`ADMIN_USER`를 설정하지 않으면 기본값은 `admin`입니다.

2026-05-12 Cloudflare secrets 확인 결과:

- `ADMIN_PASSWORD` 설정됨
- `ADMIN_SESSION_SECRET` 설정됨

## 3. Cloudflare D1 생성

제출, 문의, 뉴스레터 구독 데이터는 `AIDAILYPICK_DB` D1 바인딩이 있을 때 서버에 저장됩니다.

```powershell
npx wrangler d1 create aidailypick-db
npx wrangler d1 execute aidailypick-db --file=docs/d1-schema.sql
```

첫 명령의 출력에서 `database_id`를 복사합니다.

현재 `submissions.status`는 아래 값을 모두 허용해야 합니다.

```text
new, candidate, reviewing, done, featured, hold
```

기존 D1 테이블이 `new`, `reviewing`, `done`만 허용하는 오래된 CHECK 제약으로 만들어져 있었다면 아래 마이그레이션을 먼저 실행합니다.

```powershell
npx wrangler d1 execute aidailypick-db --file=docs/d1-status-migration.sql
```

2026-05-11 원격 D1 확인 결과:

- `submissions` 테이블 있음
- `outbound_clicks` 테이블 있음
- `submissions.status`는 `new`, `candidate`, `reviewing`, `done`, `featured`, `hold`를 모두 허용
- 현재 원격 `submissions` 데이터는 비어 있음

## 4. wrangler.jsonc 바인딩 추가

`wrangler.jsonc`에 실제 `database_id`를 넣어 D1 바인딩을 추가합니다.

```jsonc
"d1_databases": [
  {
    "binding": "AIDAILYPICK_DB",
    "database_name": "aidailypick-db",
    "database_id": "<database-id-from-wrangler>"
  }
]
```

주의: 실제 `database_id` 없이 placeholder를 넣으면 배포가 실패할 수 있습니다.

## 5. 배포 전 최종 빌드

D1 바인딩을 넣은 뒤 다시 Cloudflare 빌드를 실행합니다.

```powershell
npm.cmd run cf:build
```

로컬 Codex 샌드박스나 Windows 권한 환경에서 `Cannot read directory "../../../..": Access is denied.`가 나면 코드 문제가 아닐 수 있습니다. 같은 명령을 일반 PowerShell 또는 WSL에서 다시 실행해 확인합니다. 2026-05-11 기준 이 프로젝트는 샌드박스 밖 실행에서 `npm.cmd run cf:build`가 통과했습니다.

## 6. 배포 후 확인

배포 후 아래 경로를 확인합니다.

- `/admin`: 로그인 화면이 보이는지 확인
- `/admin`: 로그인 후 운영 연결 상태 패널 확인
- `/sitemap.xml`: 툴, 카테고리, 가이드 URL이 포함되는지 확인
- `/robots.txt`: sitemap 위치와 비공개 경로 차단 규칙 확인
- `/submit`: 툴 제안 저장 테스트
- `/launch`: 공개 동의 및 소개 완료 상태의 툴만 보이는지 확인
- `/contact`: 문의 저장 테스트
- `/`: 뉴스레터 구독 저장 테스트

관리자 화면의 운영 연결 상태에서 다음 항목이 확인되어야 합니다.

- 관리자 비밀번호: 연결됨
- 세션 시크릿: 연결됨
- D1 저장소: 연결됨

2026-05-12 배포 확인 결과:

- Cloudflare Worker version: `44dfa120-5e5c-4c52-a202-f736887687da`
- `/launch`: 200 응답, 런칭/제보 CTA 문구 확인
- `/submit`: 200 응답, 필수 정보/공개 동의 섹션 확인
- `/admin`: 200 응답, 관리자 진입 화면 확인
- `/api/launch`: 200 응답, `{"ok":true,"tools":[]}` 확인

2026-05-12 운영 smoke test 결과:

- `/api/submissions`로 임시 테스트 툴 제출 성공
- 원격 D1 `submissions`에 `candidate`, `publicConsent = 1`로 저장 확인
- 원격 D1에서 `featured`로 변경 후 `/api/launch`에 노출 확인
- `/launch` 페이지는 200 응답 확인
- 테스트 레코드 삭제 후 원격 D1 `smoke_count = 0` 확인

2026-05-12 신뢰형 리뷰 배포 확인 결과:

- Cloudflare Worker version: `652e0e1b-b2a7-49e9-a76e-e20e7a37d126`
- `/tools/chatgpt`: 200 응답, `Editorial Check`, `추천하지 않는 경우`, `가격 주의` 확인
- `/tools/tally`: 200 응답, `Editorial Check`, 바이브코딩 메이커 문구, `추천하지 않는 경우` 확인

2026-05-12 홈 신뢰 기준 배포 확인 결과:

- Cloudflare Worker version: `07db8681-89d9-4b26-a52c-68ebaeadab35`
- `/`: 200 응답, `확인한 출처`, `추천 제외 조건`, `깊게 검수한 리뷰` 확인

2026-05-12 신뢰형 리뷰 2차 묶음 배포 확인 결과:

- Cloudflare Worker version: `2637b55d-80b9-48b4-821a-a9ec9e4ea61b`
- Claude, 미리캔버스, OpusClip, Typefully, Buffer에 `sourceNotes`, `beginnerScenario`, `notFor`, `pricingCaution` 추가
- `/`: 200 응답, `10`개 깊게 검수한 리뷰 카운트 확인
- `/tools/claude`: 200 응답, `Anthropic 도움말 기준`, `가격 주의`, `추천하지 않는 경우` 확인
- `/tools/buffer`: 200 응답, `Buffer 공식 가격 페이지`, `가격 주의`, `추천하지 않는 경우` 확인

2026-05-12 신뢰형 리뷰 3차 묶음 배포 확인 결과:

- Cloudflare Worker version: `ad743827-45e3-46d0-b383-00fc496f9f93`
- Zapier, Make, Gamma, Framer, Typedream에 `sourceNotes`, `beginnerScenario`, `notFor`, `pricingCaution` 추가
- `/`: 200 응답, `15`개 깊게 검수한 리뷰 카운트 확인
- `/tools/zapier`: 200 응답, `월 100 tasks`, `가격 주의`, `추천하지 않는 경우` 확인
- `/tools/framer`: 200 응답, `커스텀 도메인`, `가격 주의`, `추천하지 않는 경우` 확인

2026-05-12 신뢰형 리뷰 4차 묶음 배포 확인 결과:

- Cloudflare Worker version: `fe1e36f3-624e-4c13-ac7e-ca4fd93a3657`
- Notion AI, 채널톡, 토스페이먼츠, 모두싸인에 `sourceNotes`, `beginnerScenario`, `notFor`, `pricingCaution` 추가
- `/`: 200 응답, `19`개 깊게 검수한 리뷰 카운트 확인
- `/tools/toss-payments`: 200 응답, `가입비 220,000원`, `가격 주의`, `추천하지 않는 경우` 확인
- `/tools/modusign`: 200 응답, `PERSONAL 월 9,900원`, `AI 계약 관리`, `추천하지 않는 경우` 확인

2026-05-12 검수 기준 페이지 배포 확인 결과:

- Cloudflare Worker version: `4ebc6579-3c84-44b5-bfb5-8b29a4aa52fc`
- `/methodology`: 200 응답, 검수 기준/제휴 공개/메이커 제보 흐름 확인
- `/`: 200 응답, 푸터 `검수 기준` 링크 확인
- `/sitemap.xml`: 200 응답, `https://aidailypick.com/methodology` 포함 확인

2026-05-12 제보 페이지 검수 기준 연결 배포 확인 결과:

- Cloudflare Worker version: `ca26e039-ef1b-4652-ab3b-034f920df5ad`
- `/submit`: 200 응답, `검수 기준 보기` CTA와 `/methodology` 링크 확인
- `/submit`: 200 응답, `런칭 보드 공개 조건` 안내 확인
- `/methodology`: 200 응답 유지 확인

2026-05-12 헤더 검수 기준 링크 배포 확인 결과:

- Cloudflare Worker version: `01bddd92-15b6-4c3a-9325-43a844f5bb77`
- `/`: 200 응답, 헤더/네비게이션 `검수 기준` 링크 확인
- `/methodology`: 200 응답, 검수 기준 페이지 정상 응답 확인

2026-05-12 툴 목록 검수 현황 배포 확인 결과:

- Cloudflare Worker version: `a9bf8c18-17ba-4d10-8874-b63ad5dbc591`
- `/tools`: 200 응답, `19`개 전체 등록 툴, `19`개 깊게 검수한 리뷰, `0`개 검토 예정 후보 확인
- `/tools`: 200 응답, `검수 기준 자세히 보기` 링크 확인
- `/tools/make`: 200 응답, `공식 정보 확인`, `AIDailyPick 검수 기준 보기`, `가격 주의` 확인
- `/`: 200 응답, `19`개 깊게 검수한 리뷰 카운트 유지 확인

2026-05-12 카테고리 검수 현황 배포 확인 결과:

- Cloudflare Worker version: `62de3cca-14d0-4755-b162-93d49d71a764`
- `/category/writing`: 200 응답, `깊게 검수한 리뷰`, `검토 예정 후보`, 검수 기준 링크 확인
- `/category/nocode`: 200 응답, `출처, 첫 사용 장면, 추천 제외 조건, 가격 주의` 설명과 검수 기준 링크 확인
- `/category/bookingPayment`: 200 응답, `수수료와 정산 조건`, 검수 현황, 검수 기준 링크 확인

2026-05-12 런칭/제휴 검수 기준 연결 배포 확인 결과:

- Cloudflare Worker version: `b7667ea1-7b88-45cd-a483-8780bd4f62d9`
- `/launch`: 200 응답, `검수 기준 보기`, `전체 검수 기준 확인하기`, `공개 기준 보기` 확인
- `/affiliate`: 200 응답, `AIDailyPick 검수 기준` 링크와 `출처, 첫 사용 장면, 추천하지 않는 경우, 가격 주의` 문구 확인

2026-05-12 관리자 검수 준비도 UI 배포 확인 결과:

- Cloudflare Worker version: `3a4a0ab6-742d-4d64-a2aa-54f0f20ac8a5`
- `node scripts\admin-review-readiness.test.mjs`: 3개 테스트 통과
- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd run cf:build`: 통과
- `/admin`: 200 응답, 관리자 로그인 진입 확인
- `/admin` HTML이 새 admin chunk `page-634de2664121e297.js` 참조 확인
- admin chunk에서 `Review Gate`, `sourceNotes`, `readyToFeature` 포함 확인
- `/api/launch`: 200 응답, `"ok":true` 유지 확인
- `/methodology`: 200 응답, 검수 기준 페이지 정상 응답 확인

2026-05-12 런칭 API 검수 게이트 배포 확인 결과:

- Cloudflare Worker version: `f2be2ba9-92f7-4046-a705-3844e34cc94b`
- `node scripts\admin-review-readiness.test.mjs`: 3개 테스트 통과
- `node scripts\launch-tools.test.mjs`: 1개 테스트 통과
- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd run cf:build`: 통과
- `/api/launch`: 200 응답, `"ok":true` 유지 확인
- `/launch`: 200 응답, 새 launch chunk `page-0a4ddad8224ea75e.js` 참조 확인
- `/admin`: 200 응답, 새 admin chunk `page-76588e0d587afec5.js` 참조 확인
- launch chunk에서 `readyToFeature` 포함 확인

2026-05-12 관리자 인라인 편집 UI 배포 확인 결과:

- Cloudflare Worker version: `c4210ddf-a929-407f-869b-0449f04f00b9`
- `node scripts\tool-submission-editor.test.mjs`: 3개 테스트 통과
- `node scripts\admin-review-readiness.test.mjs`: 3개 테스트 통과
- `node scripts\launch-tools.test.mjs`: 1개 테스트 통과
- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd run cf:build`: 통과
- `/admin`: 200 응답, 새 admin chunk `page-db4cfd4a7b9e15ef.js` 참조 확인
- admin chunk에서 `Edit Submission`, `toolName`, `mediaUrl`, `publicConsent`, `contactEmail` 포함 확인
- `/api/submissions`: 인증 없이 401 응답 확인
- `/api/launch`: 200 응답, `"ok":true` 유지 확인
- launch chunk에서 `readyToFeature` 유지 확인

2026-05-12 런칭 보드 검수 게이트 운영 smoke test 결과:

- 원격 D1에 `tool-smoke-readiness-20260512-1` 임시 레코드 삽입
- `status='featured'`, `publicConsent=true`여도 가격/이미지 근거가 없으면 `/api/launch`에서 제외됨 확인
- 같은 레코드에 `가격/무료 플랜`과 `mediaUrl`을 보강하자 `/api/launch`에 노출됨 확인
- 테스트 레코드 삭제 후 `/api/launch`에서 사라짐 확인
- 원격 D1 `smoke_count = 0` 확인
- 사용 SQL 파일: `scripts/d1-smoke-readiness-insert.sql`, `scripts/d1-smoke-readiness-complete.sql`, `scripts/d1-smoke-readiness-delete.sql`

2026-05-12 메이커 신청 페이지 전환 구조 배포 확인 결과:

- Cloudflare Worker version: `9dc6ba7b-6076-4614-bec9-7d3314a6838d`
- `node scripts\submit-page-content.test.mjs`: 3개 테스트 통과
- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd run cf:build`: 통과
- `/submit`: 200 응답, `Maker Launch Desk`, `Evidence Pack`, `Review Flow`, `무료 검토` 확인
- `/api/launch`: 200 응답, `"ok":true` 유지 확인

2026-05-12 홈/런칭보드 메이커 CTA 배포 확인 결과:

- Cloudflare Worker version: `124ac7af-42f3-4f1b-99e8-fa2a658b8c02`
- `node scripts\maker-launch-cta.test.mjs`: 3개 테스트 통과
- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd run cf:build`: 통과
- `/`: 200 응답, `작은 SaaS도 근거가 있으면`, `런칭 신청하기`, 새 home chunk `page-c2262ba3ef6f1c42.js` 확인
- `/launch`: 200 응답, `작은 SaaS도 근거가 있으면`, `런칭 신청하기`, 새 launch chunk `page-8fdad226d0b83119.js` 확인
- `/api/launch`: 200 응답, `"ok":true` 유지 확인

2026-05-12 디렉토리 탐색면 메이커 CTA 배포 확인 결과:

- Cloudflare Worker version: `25193192-e844-45e4-a466-ed4fe729d294`
- `node scripts\maker-launch-cta.test.mjs`: 4개 테스트 통과
- `node scripts\submit-page-content.test.mjs`: 3개 테스트 통과
- `node scripts\launch-tools.test.mjs`: 1개 테스트 통과
- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd run cf:build`: 통과
- `/tools`: 200 응답, `국내·바이브코딩 SaaS를 찾고 있습니다.` 확인
- `/category/writing`: 200 응답, `국내·바이브코딩 SaaS를 찾고 있습니다.` 확인
- `/tools/chatgpt`: 200 응답, `국내·바이브코딩 SaaS를 찾고 있습니다.` 확인
- `/api/launch`: 200 응답, `"ok":true` 유지 확인

2026-05-12 제보 작성 가이드 배포 확인 결과:

- Cloudflare Worker version: `52183ead-3e5d-4367-8bdb-a3cd405c4079`
- `node scripts\submit-page-content.test.mjs`: 4개 테스트 통과
- `node scripts\maker-launch-cta.test.mjs`: 4개 테스트 통과
- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd run cf:build`: 통과
- `/submit`: 200 응답, `Submission Brief`, `좋은 제보`, `아쉬운 제보`, `공식 URL이나 바로 열어볼 수 있는 데모 링크` 확인
- `/api/launch`: 200 응답, `"ok":true` 유지 확인

2026-05-12 관리자 운영 점수판 배포 확인 결과:

- Cloudflare Worker version: `e72217b2-fcac-4576-9b00-436c6c6da985`
- `node scripts\admin-review-readiness.test.mjs`: 5개 테스트 통과
- `node scripts\launch-tools.test.mjs`: 1개 테스트 통과
- `node scripts\submit-page-content.test.mjs`: 4개 테스트 통과
- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd run cf:build`: 통과
- `/admin`: 200 응답, 새 admin chunk `page-b3f1d7daa211b2f5.js` 확인
- admin chunk에서 `Operation Score`, `promotionPotential`, `evidenceCompleteness`, `beginnerClarity`, `recommendedAction` 포함 확인
- `/api/launch`: 200 응답, `"ok":true` 유지 확인

2026-05-12 관리자 메이커 자료 요청문 배포 확인 결과:

- Cloudflare Worker version: `b7c07e97-63f9-48a4-b39a-0dde6df0123f`
- `node scripts\admin-review-readiness.test.mjs`: 6개 테스트 통과
- `node scripts\launch-tools.test.mjs`: 1개 테스트 통과
- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd run cf:build`: 통과
- `/admin`: 200 응답, 새 admin chunk `page-9f8c1d75be63dd99.js` 확인
- admin chunk에서 `Operation Score`, `promotionPotential`, `evidenceCompleteness`, `beginnerClarity`, `sourceNotes`, `pricingCaution` 포함 확인
- `/api/launch`: 200 응답, `"ok":true` 유지 확인

2026-05-12 관리자 툴 제안 정렬 컨트롤 배포 확인 결과:

- Cloudflare Worker version: `8f601297-1b7a-473e-bb98-175ad6314af4`
- `node scripts\admin-review-readiness.test.mjs`: 7개 테스트 통과
- `node scripts\launch-tools.test.mjs`: 1개 테스트 통과
- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd run cf:build`: 통과
- `/admin`: 200 응답, 새 admin chunk `page-2e8c8ad0a80208b4.js` 확인
- admin chunk에서 `needsEvidence`, `priority`, `recent`, `Operation Score` 포함 확인
- `/api/launch`: 200 응답, `"ok":true` 유지 확인

2026-05-12 관리자 운영 큐 요약 배포 확인 결과:

- Cloudflare Worker version: `df0c7ee3-26b5-4b31-90cf-c1c2a8663135`
- `node scripts\admin-review-readiness.test.mjs`: 8개 테스트 통과
- `node scripts\launch-tools.test.mjs`: 1개 테스트 통과
- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd run cf:build`: 통과
- `/admin`: 200 응답, 새 admin chunk `page-0dbaea89cdfb4315.js` 확인
- admin chunk에서 `readyToFeature`, `priorityReview`, `needsEvidence`, `holdOrRequest`, `Operation Score` 포함 확인
- `/api/launch`: 200 응답, `"ok":true` 유지 확인

2026-05-12 관리자 운영 큐 필터 배포 확인 결과:

- Cloudflare Worker version: `c5d9a4a7-6e0f-46ef-8c95-c175c3fcd80c`
- `node scripts\admin-review-readiness.test.mjs`: 9개 테스트 통과
- `node scripts\launch-tools.test.mjs`: 1개 테스트 통과
- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd run cf:build`: 통과
- `/admin`: 200 응답, 새 admin chunk `page-cc48e3ab6325c184.js` 확인
- admin chunk에서 `readyToFeature`, `priorityReview`, `needsEvidence`, `holdOrRequest`, `Operation Score`, `ring-pink` 포함 확인
- `/api/launch`: 200 응답, `"ok":true` 유지 확인

2026-05-13 관리자 문의 필터 배포 확인 결과:

- Cloudflare Worker version: `bad1e558-7deb-4e38-a3c0-5a2e4c5c4a7a`
- `node scripts\admin-contact-operations.test.mjs`: 2개 테스트 통과
- `node scripts\admin-review-readiness.test.mjs`: 9개 테스트 통과
- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd run cf:build`: 통과
- `/admin`: 200 응답, 새 admin chunk `page-37d41a6de80b10b7.js` 확인
- admin chunk에서 `partnership`, `support`, `cyan-300`, `readyToFeature` 포함 확인
- `/api/launch`: 200 응답, `"ok":true` 유지 확인

2026-05-13 관리자 뉴스레터 필터 배포 확인 결과:

- Cloudflare Worker version: `4c9b059a-0f3e-4160-a073-6d9526f44485`
- `node scripts\admin-newsletter-operations.test.mjs`: 2개 테스트 통과
- `node scripts\admin-contact-operations.test.mjs`: 2개 테스트 통과
- `node scripts\admin-review-readiness.test.mjs`: 9개 테스트 통과
- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd run cf:build`: 통과
- 배포 산출물 업로드: 새 admin chunk `page-d67d3ff202c8877c.js` 업로드 확인
- `/admin`: 200 응답, admin chunk `page-d67d3ff202c8877c.js` 200 응답
- admin chunk에서 `koreanSaas`, `automation`, `maker`, `violet-300` 포함 확인
- `/api/launch`: 200 응답, `"ok":true` 유지 확인

2026-05-13 관리자 메이커 메일 초안 배포 확인 결과:

- Cloudflare Worker version: `d15fa303-6643-4f2c-9810-a98d8f770d6c`
- `node scripts\admin-review-readiness.test.mjs`: 10개 테스트 통과
- `node scripts\admin-newsletter-operations.test.mjs`: 2개 테스트 통과
- `node scripts\admin-contact-operations.test.mjs`: 2개 테스트 통과
- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd run cf:build`: 통과
- `/admin`: 200 응답, admin chunk `page-01967ddb3e866d8b.js` 200 응답
- admin chunk에서 `mailto:`, `koreanSaas`, `readyToFeature` 포함 확인
- `/api/launch`: 200 응답, `"ok":true` 유지 확인

2026-05-13 제출 폼 검수 준비도 배포 확인 결과:

- Cloudflare Worker version: `1d1ed226-426e-454e-bb01-8f1a480ae1b8`
- `node scripts\submit-tool-quality.test.mjs`: 3개 테스트 통과
- `node scripts\submit-page-content.test.mjs`: 4개 테스트 통과
- `node scripts\admin-review-readiness.test.mjs`: 10개 테스트 통과
- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd run cf:build`: 통과
- `/submit`: 200 응답, submit chunk `page-63c300d1c8a7d75e.js` 200 응답
- submit chunk에서 `Submission Readiness`, `completedCount` 포함 확인
- 브라우저 확인: `/submit` 화면에서 `Submission Readiness`, `검수 준비도`, `자료 보강 필요`, `기본 정보`, `공개 동의` 노출 확인
- `/api/launch`: 200 응답, `"ok":true` 유지 확인

2026-05-13 관리자 제보 품질 요약 배포 확인 결과:

- Cloudflare Worker version: `28704db2-6955-4e37-93cd-495582af09ee`
- `node scripts\submit-tool-quality.test.mjs`: 5개 테스트 통과
- `node scripts\admin-review-readiness.test.mjs`: 10개 테스트 통과
- `node scripts\admin-newsletter-operations.test.mjs`: 2개 테스트 통과
- `node scripts\admin-contact-operations.test.mjs`: 2개 테스트 통과
- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd run cf:build`: 통과
- `/admin`: 200 응답, admin chunk `page-1d7ecb997494db2f.js` 200 응답
- admin chunk에서 `Submission Quality`, `completedCount`, `readyToFeature`, `mailto:` 포함 확인
- submit chunk `page-19248ce05a966ece.js` 200 응답, `Submission Readiness`, `completedCount` 포함 확인
- `/api/launch`: 200 응답, `"ok":true` 유지 확인

2026-05-14 홈 초보자 시작 경로 배포 확인 결과:

- Cloudflare Worker version: `9cf921d9-24ad-423d-9e70-8094876fdf29`
- `node scripts\beginner-paths.test.mjs`: 3개 테스트 통과
- `node scripts\maker-launch-cta.test.mjs`: 4개 테스트 통과
- `node scripts\submit-page-content.test.mjs`: 4개 테스트 통과
- `node scripts\submit-tool-quality.test.mjs`: 5개 테스트 통과
- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd run cf:build`: 통과
- `/`: 200 응답, home chunk `page-24080193faad808d.js` 200 응답
- home chunk에서 `Starter Paths`, `write-first-content`, `automate-first-routine`, `solo-founder-launch` 포함 확인
- home chunk에서 과장 문구 `국내 최고` 미포함 확인
- 브라우저 확인: 홈 화면에서 `Starter Paths`, `내 상황에 맞는 시작 순서`, `글쓰기와 콘텐츠 초안부터 시작`, `반복 업무 자동화는 짧게 연결`, `1인 SaaS는 대기자 모집부터` 노출 확인
- `/api/launch`: 200 응답, `"ok":true` 유지 확인

2026-05-14 툴 목록 초보자 모드 배포 확인 결과:

- Cloudflare Worker version: `d77d4fa0-96c3-4c16-b2d2-69cf78e9c58e`
- `node scripts\beginner-paths.test.mjs`: 4개 테스트 통과
- `node scripts\maker-launch-cta.test.mjs`: 4개 테스트 통과
- `node scripts\submit-page-content.test.mjs`: 4개 테스트 통과
- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd run cf:build`: 통과
- `/tools`: 200 응답, `Beginner Mode`, `목록 보기 전에, 상황부터 고르세요`, `글쓰기와 콘텐츠 초안부터 시작`, `반복 업무 자동화는 짧게 연결`, `1인 SaaS는 대기자 모집부터` 확인
- `/tools`: 과장 문구 `국내 최고` 미포함 확인
- 브라우저 확인: `/tools` 화면에서 `Beginner Mode`, `목록 보기 전에, 상황부터 고르세요`, `글쓰기와 콘텐츠 초안부터 시작`, `반복 업무 자동화는 짧게 연결`, `1인 SaaS는 대기자 모집부터` 노출 확인
- `/api/launch`: 200 응답, `"ok":true` 유지 확인

2026-05-14 툴 카드 검수 노트 배포 확인 결과:

- Cloudflare Worker version: `9e5d88dc-4203-4081-a557-d1be126ab54a`
- `node scripts\tool-card-trust.test.mjs`: 2개 테스트 통과
- `node scripts\beginner-paths.test.mjs`: 4개 테스트 통과
- `node scripts\maker-launch-cta.test.mjs`: 4개 테스트 통과
- `node scripts\submit-page-content.test.mjs`: 4개 테스트 통과
- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd run cf:build`: 통과
- `/tools`: 200 응답, `Review Notes`, `첫 사용`, `추천 제외`, `가격 주의`, `공식 근거` 확인
- `/tools`: 과장 문구 `조회수 보장`, `매출 보장`, `구매 보장`, `국내 최고` 미포함 확인
- 브라우저 확인: `/tools` 화면에서 `Review Notes`, `첫 사용`, `추천 제외`, `가격 주의`, `공식 근거` 노출 확인
- `/api/launch`: 200 응답, `"ok":true` 유지 확인

2026-05-14 카테고리 신뢰 브리프 배포 확인 결과:

- Cloudflare Worker version: `3938d231-610b-4e9c-bb33-6558c3c8d48c`
- `node scripts\category-page-trust.test.mjs`: 2개 테스트 통과
- `node scripts\tool-card-trust.test.mjs`: 2개 테스트 통과
- `node scripts\beginner-paths.test.mjs`: 4개 테스트 통과
- `node scripts\maker-launch-cta.test.mjs`: 4개 테스트 통과
- `node scripts\submit-page-content.test.mjs`: 4개 테스트 통과
- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd run cf:build`: 통과
- `/category/nocode`: 200 응답, `Category Trust Brief`, `카드 읽는 법`, `깊게 검수한 리뷰만`, `후보는 관찰 목록`, `결제 전 공식 가격` 확인
- `/category/nocode`: `Review Notes`, `추천 제외`, `가격 주의` 확인
- `/category/nocode`: 과장 문구 `조회수 보장`, `매출 보장`, `구매 보장`, `국내 최고` 미포함 확인
- 브라우저 확인: `/category/nocode` 화면에서 `Category Trust Brief`, `카드 읽는 법`, `깊게 검수한 리뷰만`, `후보는 관찰 목록`, `결제 전 공식 가격`, `Review Notes` 노출 확인
- `/api/launch`: 200 응답, `"ok":true` 유지 확인

2026-05-14 홈 Market Radar 배포 확인 결과:

- Cloudflare Worker version: `09220419-66bb-4e06-8f4d-ea5974277eaf`
- `node scripts\market-radar.test.mjs`: 2개 테스트 통과
- `node scripts\category-page-trust.test.mjs`: 2개 테스트 통과
- `node scripts\tool-card-trust.test.mjs`: 2개 테스트 통과
- `node scripts\beginner-paths.test.mjs`: 4개 테스트 통과
- `node scripts\maker-launch-cta.test.mjs`: 4개 테스트 통과
- `node scripts\submit-page-content.test.mjs`: 4개 테스트 통과
- `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd run cf:build`: 통과
- `/`: 200 응답, `Market Radar`, `이번 주 AI/SaaS 흐름`, `바이브코딩 SaaS 런칭`, `Top 100보다 상황별 랭킹`, `신규 런칭 보기` 확인
- `/`: 과장 문구 `조회수 보장`, `매출 보장`, `구매 보장`, `국내 최고` 미포함 확인
- 브라우저 확인: 홈 화면에서 `Market Radar`, `이번 주 AI/SaaS 흐름`, `바이브코딩 SaaS 런칭`, `Top 100보다 상황별 랭킹`, `신규 런칭 보기` 노출 확인
- `/api/launch`: 200 응답, `"ok":true` 유지 확인

## 7. 런칭 보드 공개 흐름 확인

런칭 보드는 접수된 모든 제보를 자동으로 공개하지 않습니다. 공개 조건은 아래와 같습니다.

```text
type = 'tool'
status = 'featured'
payload.publicConsent = true
admin readiness = official URL + public consent + summary + audience + pricing evidence + product media
```

운영 배포 후 다음 순서로 smoke test를 진행합니다.

1. `/submit`에서 테스트 툴을 제출합니다.
2. 공개 동의 체크박스를 반드시 체크합니다.
3. `/admin`에 로그인합니다.
4. 제출함에서 해당 툴이 `런칭 후보(candidate)`로 들어왔는지 확인합니다.
5. 관리자에서 `소개완료(featured)`로 변경합니다.
6. `/launch`에서 해당 툴이 공개되는지 확인합니다.
7. 공개 동의를 체크하지 않은 테스트 제보는 `featured`로 바꿀 수 없거나, 공개 페이지에 노출되지 않아야 합니다.

테스트가 끝난 뒤 운영 DB에서 테스트 데이터를 삭제하거나 `hold` 상태로 바꿉니다.

## 8. 검색엔진 제출

배포가 끝난 뒤 Google Search Console에 아래 sitemap을 제출합니다.

```text
https://aidailypick.com/sitemap.xml
```

우선 색인을 요청할 추천 경로:

- `https://aidailypick.com/`
- `https://aidailypick.com/tools`
- `https://aidailypick.com/guides`
- 주요 카테고리 페이지
- 검토 완료 또는 Featured 툴 상세 페이지
- `https://aidailypick.com/launch`
- `https://aidailypick.com/submit`

## 9. Editorial Publishing Standard

정적 툴 리뷰를 Featured 추천처럼 노출하기 전에는 아래 편집 필드를 채웁니다.

- `sourceNotes`: 무엇을 확인했고 정보가 어디에서 왔는지
- `beginnerScenario`: 초보자가 처음 시도할 현실적인 사용 장면
- `notFor`: 이 툴을 추천하지 않는 경우
- `pricingCaution`: 요금제, 사용량, 라이선스 주의점

이 필드가 없으면 디렉토리에는 둘 수 있지만, 확신 있는 추천이 아니라 관찰 후보처럼 보이게 유지합니다.

## 10. 데이터 확인

Cloudflare D1 콘솔이나 Wrangler로 제출 데이터가 저장되는지 확인합니다.

```powershell
npx wrangler d1 execute aidailypick-db --command="SELECT id, type, status, created_at, email, title FROM submissions ORDER BY created_at DESC LIMIT 10"
```

런칭 후보와 공개 완료 데이터를 확인합니다.

```powershell
npx wrangler d1 execute aidailypick-db --command="SELECT id, status, title, url, json_extract(payload_json, '$.publicConsent') AS public_consent FROM submissions WHERE type='tool' ORDER BY created_at DESC LIMIT 10"
```

런칭 보드에 노출될 데이터만 확인합니다.

```powershell
npx wrangler d1 execute aidailypick-db --command="SELECT id, title, url, summary FROM submissions WHERE type='tool' AND status='featured' AND json_extract(payload_json, '$.publicConsent') = 1 ORDER BY created_at DESC LIMIT 10"
```

외부 툴 클릭 추적 데이터도 확인합니다.

```powershell
npx wrangler d1 execute aidailypick-db --command="SELECT tool_slug, source, clicked_at FROM outbound_clicks ORDER BY clicked_at DESC LIMIT 10"
```

## 11. 문제 대응

- 관리자 로그인이 안 되면 `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` secrets를 다시 확인합니다.
- 제출 데이터가 관리자에 보이지 않으면 `AIDAILYPICK_DB` 바인딩 이름이 정확한지 확인합니다.
- `/api/submissions`가 `D1 submissions 테이블이 없습니다`를 반환하면 `docs/d1-schema.sql` 또는 `docs/d1-status-migration.sql`을 적용합니다.
- `/api/launch`는 D1 테이블이 아직 없을 때 빈 목록을 반환할 수 있습니다. 운영에서는 D1 스키마 적용 후 다시 확인합니다.
- 로컬 개발에서는 D1이 없어도 브라우저 `localStorage` fallback으로 제출 데이터가 남을 수 있습니다.
- OpenNext가 Windows에서 경고를 낼 수 있습니다. 배포 빌드가 불안정하면 WSL에서 다시 빌드합니다.

## 2026-05-14 Toss-like clean UI 1차 배포 확인 결과

- 배포 버전: `c509e7a8-4776-44c3-b316-7e83623de9e5`
- 적용 범위: 전역 배경/토큰, 홈 `toss-clean` 스킨, 상단 헤더 밝은 표면과 파란 CTA
- 비교 기준: Product Hunt는 오늘의 런칭과 순위 신호가 강하고, Futurepedia는 카테고리/교육 콘텐츠/공식 이미지/광고 고지가 강함. AIDailyPick은 초보자 기준과 국내 SaaS 제보 흐름을 더 신뢰감 있게 보여주는 방향으로 정리.
- 검증:
  - `node scripts\toss-clean-ui.test.mjs`
  - `node scripts\market-radar.test.mjs`
  - `node scripts\category-page-trust.test.mjs`
  - `node scripts\tool-card-trust.test.mjs`
  - `node scripts\beginner-paths.test.mjs`
  - `node scripts\maker-launch-cta.test.mjs`
  - `node scripts\submit-page-content.test.mjs`
  - `npm.cmd run typecheck`
  - `npm.cmd run lint`
  - `npm.cmd run build`
  - `npm.cmd run cf:build`
  - `npm.cmd run cf:deploy`
- 라이브 확인:
  - `https://aidailypick.com/` 응답 `200`
  - 홈 HTML에 `toss-clean`, `Market Radar`, `바이브코딩 런칭` 포함
  - 예전 어두운 헤더 클래스 `bg-[#070812]/85` 미포함
  - `조회수 보장` 문구 미포함
  - 배포 CSS에 `#f8fafc`, `#3182f6`, `#e5e8eb`, `0 8px 24px` 포함
  - 배포 CSS에 `radial-gradient` 미포함

## 2026-05-18 Toss-like 홈 퍼널 UX 배포 확인 결과

- 배포 버전: `a0c3cfd0-c740-4c0c-9cca-2c8f4d59b421`
- 적용 범위: 홈 첫 화면을 긴 디렉토리에서 `글쓰기`, `쇼츠/릴스`, `상세페이지` 3개 목적 선택 퍼널로 축소
- 제거/축소한 홈 요소: `Market Radar`, `Starter Paths`, `Threads Signal`, `New Watchlist`, `Newsletter` 직접 노출
- 검증:
  - `node scripts\toss-home-funnel.test.mjs`
  - `node scripts\toss-clean-ui.test.mjs`
  - `node scripts\market-radar.test.mjs`
  - `node scripts\beginner-paths.test.mjs`
  - `node scripts\tool-card-trust.test.mjs`
  - `node scripts\category-page-trust.test.mjs`
  - `node scripts\maker-launch-cta.test.mjs`
  - `node scripts\submit-page-content.test.mjs`
  - `npm.cmd run typecheck`
  - `npm.cmd run lint`
  - `npm.cmd run build`
  - `npm.cmd run cf:build`
  - `npm.cmd run cf:deploy`
- 라이브 확인:
  - `https://aidailypick.com/` 응답 `200`
  - 홈 HTML에 `toss-purpose-selector`, `AI 툴, 처음이면 목적부터 고르세요`, `지금은 이 3개만 보세요`, `내 SaaS 제보하기` 포함
  - 홈 HTML에 `Market Radar`, `Starter Paths`, `Newsletter`, `조회수 보장` 미포함
  - 인앱 브라우저 DOM 확인에서 `글쓰기`, `쇼츠/릴스`, `상세페이지` 목적 선택과 신규 H1 확인

## 2026-05-18 Tools 목적 우선 UX 및 카드/푸터 클린 UI 배포 확인 결과

- 배포 버전: `79ff017a-0944-4a7e-836e-2d2432b36446`
- 적용 범위:
  - `/tools`를 전체 목록 중심에서 `처음이면 하나만 고르세요` 목적 선택 구조로 변경
  - 공통 `SaasToolCard`를 어두운 네온 카드에서 흰색/회색/파란 CTA 중심 카드로 변경
  - 공통 푸터를 어두운 배경에서 밝은 표면으로 변경
- 검증:
  - `node scripts\tools-page-clean-ux.test.mjs`
  - `node scripts\toss-home-funnel.test.mjs`
  - `node scripts\toss-clean-ui.test.mjs`
  - `node scripts\market-radar.test.mjs`
  - `node scripts\tool-card-trust.test.mjs`
  - `node scripts\category-page-trust.test.mjs`
  - `node scripts\beginner-paths.test.mjs`
  - `npm.cmd run typecheck`
  - `npm.cmd run lint`
  - `npm.cmd run build`
  - `npm.cmd run cf:build`
  - `npm.cmd run cf:deploy`
- 라이브 확인:
  - `https://aidailypick.com/tools` 응답 `200`
  - `/tools` HTML에 `tools-purpose-finder`, `처음이면 하나만 고르세요`, `추천 3개만 보기`, `근거가 채워진 후보` 포함
  - `/tools` HTML에 `Tool Directory`, `bg-[#070812]`, `border-t border-white/10 bg-[#070812]`, `bg-[linear-gradient`, `조회수 보장` 미포함
  - `/tools` HTML에 밝은 푸터 클래스 `border-t border-slate-100 bg-white` 포함

## 2026-05-18 카테고리 페이지 목적 브리프 UX 배포 확인 결과

- 배포 버전: `d4515e16-e300-4134-bbde-9e6e547a0ddd`
- 적용 범위:
  - `/category/[slug]`를 어두운 디렉토리 페이지에서 밝은 `category-purpose-brief` 구조로 변경
  - 카테고리 상단을 `처음 볼 기준`, `공식 근거`, `가격 주의` 배지와 작은 상태 카드로 정리
  - 추천 목록은 `toolsToShow`로 최대 6개 우선 후보만 노출
  - 그라데이션 CTA와 어두운 카드 표면 제거
- 검증:
  - `node scripts\category-page-trust.test.mjs`
  - `node scripts\tools-page-clean-ux.test.mjs`
  - `node scripts\toss-home-funnel.test.mjs`
  - `node scripts\toss-clean-ui.test.mjs`
  - `node scripts\tool-card-trust.test.mjs`
  - `node scripts\beginner-paths.test.mjs`
  - `node scripts\market-radar.test.mjs`
  - `npm.cmd run typecheck`
  - `npm.cmd run lint`
  - `npm.cmd run build`
  - `npm.cmd run cf:build`
  - `npm.cmd run cf:deploy`
- 라이브 확인:
  - `https://aidailypick.com/category/writing` 응답 `200`
  - HTML에 `category-purpose-brief`, `처음 볼 기준`, `먼저 볼 후보`, `Category Trust Brief` 포함
  - HTML에 `bg-[#070812]`, `bg-[linear-gradient`, `border-white/10`, `조회수 보장` 미포함

## 2026-05-18 툴 상세 페이지 결정 요약 UX 배포 확인 결과

- 배포 버전: `84633905-0cd6-4ce2-9597-69729c8e670c`
- 적용 범위:
  - `/tools/[slug]`를 긴 리뷰/홍보형 상세에서 `tool-decision-summary` 중심의 결정 요약 화면으로 변경
  - 상단에 `맞는 사람`, `쓰지 말아야 할 경우`, `결제 전 확인` 3개 판단 카드를 배치
  - 공식 미디어, 핵심 정보, 편집 검수, FAQ, 관련 툴은 결정 요약 아래로 이동
  - 어두운 네온 표면과 과장 보장 문구 제거
- 검증:
  - `node scripts\tool-detail-clean-ux.test.mjs`
  - `node scripts\tools-page-clean-ux.test.mjs`
  - `node scripts\category-page-trust.test.mjs`
  - `node scripts\toss-home-funnel.test.mjs`
  - `node scripts\toss-clean-ui.test.mjs`
  - `node scripts\tool-card-trust.test.mjs`
  - `node scripts\beginner-paths.test.mjs`
  - `node scripts\market-radar.test.mjs`
  - `npm.cmd run typecheck`
  - `npm.cmd run lint`
  - `npm.cmd run build`
  - `npm.cmd run cf:build`
  - `npm.cmd run cf:deploy`
- 라이브 확인:
  - `https://aidailypick.com/tools/chatgpt` 응답 `200`
  - HTML에 `tool-decision-summary`, `맞는 사람`, `쓰지 말아야 할 경우`, `결제 전 확인`, `official-media-panel`, `related-tool-panel` 포함
  - HTML에 `bg-[#070812]`, `bg-[linear-gradient`, `border-white/10`, `조회수 보장` 미포함
  - 인앱 브라우저 DOM 확인에서 상세 페이지 제목, 결정 요약, 공식 미디어, 관련 툴 섹션 확인

## 2026-05-18 메이커 제보/런칭 보드 클린 퍼널 배포 확인 결과

- 배포 버전: `eda1a1a7-d1eb-42fd-ace4-a957f18f8293`
- 적용 범위:
  - `/submit`을 긴 홍보 랜딩에서 `내 SaaS, 3가지만 보내주세요` 중심의 짧은 제보 퍼널로 변경
  - 제보 폼을 `maker-submit-form` 밝은 카드 표면으로 변경하고, 필수/선택 정보와 검수 준비도를 같은 UI 체계로 정리
  - `/launch`를 `검수된 런칭 후보만 보여줍니다` 중심의 런칭 보드로 변경
  - `LaunchBoardList`를 밝은 `launch-board-summary` 표면으로 변경하고, 데모 링크/가격/공식 이미지 기준을 전면 노출
  - 어두운 네온 배경, 그라데이션 CTA, 과장 보장 문구 제거
- 검증:
  - `node scripts\maker-funnel-clean-ux.test.mjs`
  - `node scripts\submit-page-content.test.mjs`
  - `node scripts\submit-tool-quality.test.mjs`
  - `node scripts\launch-tools.test.mjs`
  - `node scripts\maker-launch-cta.test.mjs`
  - `node scripts\tools-page-clean-ux.test.mjs`
  - `node scripts\category-page-trust.test.mjs`
  - `node scripts\toss-home-funnel.test.mjs`
  - `node scripts\tool-detail-clean-ux.test.mjs`
  - `npm.cmd run typecheck`
  - `npm.cmd run lint`
  - `npm.cmd run build`
  - `npm.cmd run cf:build`
  - `npm.cmd run cf:deploy`
- 라이브 확인:
  - `https://aidailypick.com/submit` 응답 `200`
  - `/submit` HTML에 `maker-submit-hero`, `maker-submit-checklist`, `maker-submit-form`, `3가지만` 포함
  - `https://aidailypick.com/launch` 응답 `200`
  - `/launch` HTML에 `launch-funnel-hero`, `launch-board-rules`, `launch-board-summary`, `검수된 런칭 후보` 포함
  - 두 페이지 HTML에 `bg-[#070812]`, `bg-[linear-gradient`, `조회수 보장` 미포함
  - 인앱 브라우저 DOM 확인에서 `/submit` 첫 화면 문구와 `/launch` 보드 문구 확인

## 2026-05-18 보조 페이지 신뢰/검색 클린 UI 배포 확인 결과

- 배포 버전: `3c01ad3b-fe4c-4172-b95e-471e3bf89267`
- 적용 범위:
  - `/methodology`를 밝은 `methodology-trust-hero` 구조로 변경하고 `추천과 제휴를 분리합니다`를 첫 메시지로 정리
  - `/affiliate` 문구를 `제휴와 추천은 분리합니다` 중심으로 재작성
  - 공통 `InfoPage`를 `info-page-shell` 밝은 정보 페이지 표면으로 변경
  - `/search`를 밝은 `search-query-box` 입력 중심 화면으로 변경
  - 보조 페이지의 어두운 배경, 그라데이션 검색 버튼, 과장 보장 문구 제거
- 검증:
  - `node scripts\auxiliary-pages-clean-ux.test.mjs`
  - `node scripts\maker-funnel-clean-ux.test.mjs`
  - `node scripts\tools-page-clean-ux.test.mjs`
  - `node scripts\category-page-trust.test.mjs`
  - `node scripts\tool-detail-clean-ux.test.mjs`
  - `node scripts\toss-home-funnel.test.mjs`
  - `node scripts\toss-clean-ui.test.mjs`
  - `node scripts\submit-page-content.test.mjs`
  - `node scripts\market-radar.test.mjs`
  - `npm.cmd run typecheck`
  - `npm.cmd run lint`
  - `npm.cmd run build`
  - `npm.cmd run cf:build`
  - `npm.cmd run cf:deploy`
- 라이브 확인:
  - `https://aidailypick.com/methodology` 응답 `200`
  - `/methodology` HTML에 `methodology-trust-hero`, `methodology-levels`, `methodology-disclosure` 포함
  - `https://aidailypick.com/affiliate` 응답 `200`
  - `/affiliate` HTML에 `info-page-shell`, `제휴와 추천은 분리합니다` 포함
  - `https://aidailypick.com/search?q=쇼츠` 응답 `200`
  - `/search` HTML에 `search-finder-hero`, `search-query-box`, `search-results-panel` 포함
  - 세 페이지 HTML에 `bg-[#070812]`, `bg-[#111326]`, `bg-[linear-gradient`, `조회수 보장` 미포함
  - 인앱 브라우저 DOM 확인에서 검수 기준, 제휴 안내, 검색 결과 첫 화면 문구 확인

## 2026-05-18 문의/뉴스레터 클린 폼 배포 확인 결과

- 배포 버전: `da53f340-54cb-4f34-bd4f-397d5a0f6298`
- 적용 범위:
  - `/contact`를 `contact-trust-funnel` 중심의 문의 허브로 변경
  - `ContactForm`을 밝은 `contact-form-panel` 입력 UI로 변경
  - `NewsletterForm`을 밝은 `newsletter-signup-panel`로 변경하고 `/contact`에 노출
  - 문의, 런칭 제보, 새 툴 업데이트 구독 흐름을 한 페이지에서 연결
  - 어두운 입력창, 흰 테두리 기반 폼, 과장 보장 문구 제거
- 검증:
  - `node scripts\contact-newsletter-clean-ux.test.mjs`
  - `node scripts\auxiliary-pages-clean-ux.test.mjs`
  - `node scripts\maker-funnel-clean-ux.test.mjs`
  - `node scripts\admin-contact-operations.test.mjs`
  - `node scripts\admin-newsletter-operations.test.mjs`
  - `node scripts\tools-page-clean-ux.test.mjs`
  - `node scripts\toss-home-funnel.test.mjs`
  - `node scripts\tool-detail-clean-ux.test.mjs`
  - `node scripts\category-page-trust.test.mjs`
  - `npm.cmd run typecheck`
  - `npm.cmd run lint`
  - `npm.cmd run build`
  - `npm.cmd run cf:build`
  - `npm.cmd run cf:deploy`
- 라이브 확인:
  - `https://aidailypick.com/contact` 응답 `200`
  - HTML에 `contact-trust-funnel`, `contact-form-panel`, `newsletter-signup-panel`, `런칭 제보하기`, `새 툴 업데이트 받기` 포함
  - HTML에 `bg-[#070812]`, `bg-[#111326]`, `border-white/10`, `조회수 보장` 미포함
  - 인앱 브라우저 DOM 확인에서 문의 허브, 문의 폼, 뉴스레터 폼 확인

## 2026-05-18 관리자 기본 운영 화면 클린 UI 배포 확인 결과

- 배포 버전: `f9099850-324b-4e5b-ba0d-293ef4fe5efe`
- 적용 범위:
  - `/admin` 비로그인 화면을 밝은 `admin-login-panel` 중심 로그인 UI로 변경
  - 로그인 후 운영 셸을 `admin-operating-shell` 구조로 정리하고 `AIDailyPick 운영 작업대` 메시지로 변경
  - 운영 시작 체크리스트를 `admin-launch-checklist` 밝은 카드로 정리
  - `AdminHealthPanel`, `AdminAnalyticsPanel`, `AdminLogoutButton`의 기본 표면을 흰색/슬레이트 톤으로 변경
  - 관리자 기본 화면의 다크 배경, 흰 반투명 테두리, 과장 보장 문구 제거
- 검증:
  - `node scripts\admin-shell-clean-ux.test.mjs`
  - `node scripts\admin-contact-operations.test.mjs`
  - `node scripts\admin-newsletter-operations.test.mjs`
  - `node scripts\admin-review-readiness.test.mjs`
  - `node scripts\tool-submission-editor.test.mjs`
  - `node scripts\contact-newsletter-clean-ux.test.mjs`
  - `node scripts\auxiliary-pages-clean-ux.test.mjs`
  - `node scripts\maker-funnel-clean-ux.test.mjs`
  - `node scripts\tools-page-clean-ux.test.mjs`
  - `node scripts\toss-home-funnel.test.mjs`
  - `node scripts\tool-detail-clean-ux.test.mjs`
  - `node scripts\category-page-trust.test.mjs`
  - `npm.cmd run typecheck`
  - `npm.cmd run lint`
  - `npm.cmd run build`
  - `npm.cmd run cf:build`
  - `npm.cmd run cf:deploy`
- 라이브 확인:
  - `https://aidailypick.com/admin` 응답 `200`
  - 비로그인 HTML에 `admin-login-panel`, `bg-[#f8fafc]`, 새 admin 청크 `page-96a40d020905a677.js` 포함
  - 비로그인 HTML에 `bg-[#070812]`, `bg-[#111326]`, `border-white/10` 미포함
  - 인앱 브라우저 DOM 확인에서 밝은 배경, 관리자 로그인 패널, 과장 보장 문구 미노출 확인

## 2026-05-18 관리자 내부 제출함/툴 관리 클린 UI 배포 확인 결과

- 배포 버전: `beb86619-3217-4c5b-a0d1-b9a456b1abbe`
- 적용 범위:
  - `AdminInbox`를 밝은 `admin-inbox-panel` 운영 검수 화면으로 변경
  - 툴 제안, 문의, 뉴스레터 큐 카드를 흰색/슬레이트 기반으로 정리
  - 툴 제안 필터를 `admin-inbox-queue-card`로 명시하고 검수 기준 안내를 밝은 정보 박스로 변경
  - `AdminToolManager`를 밝은 `admin-tool-manager-panel` / `admin-tool-editor-panel` 구조로 변경
  - 관리자 내부 화면의 다크 카드, 어두운 입력창, 그라데이션 저장 버튼, 흰 반투명 테두리 제거
- 검증:
  - `node scripts\admin-inner-clean-ux.test.mjs`
  - `node scripts\admin-shell-clean-ux.test.mjs`
  - `node scripts\admin-contact-operations.test.mjs`
  - `node scripts\admin-newsletter-operations.test.mjs`
  - `node scripts\admin-review-readiness.test.mjs`
  - `node scripts\tool-submission-editor.test.mjs`
  - `node scripts\contact-newsletter-clean-ux.test.mjs`
  - `node scripts\maker-funnel-clean-ux.test.mjs`
  - `npm.cmd run typecheck`
  - `npm.cmd run lint`
  - `npm.cmd run build`
  - `npm.cmd run cf:build`
  - `npm.cmd run cf:deploy`
- 라이브 확인:
  - `https://aidailypick.com/admin` 응답 `200`
  - 비로그인 HTML에 `admin-login-panel`, 새 admin 청크 `page-001afc9e4a2d56a7.js` 포함
  - 새 admin 청크에 `admin-inbox-panel`, `admin-tool-manager-panel`, `admin-tool-editor-panel` 포함
  - 라이브 HTML/청크에 `bg-[#070812]`, `bg-[#111326]`, `border-white/10` 미포함
  - 인앱 브라우저 DOM 확인에서 밝은 배경, 관리자 로그인 패널, 과장 보장 문구 미노출 확인

## 2026-05-18 추천 가이드/메이커 CTA 클린 UI 배포 확인 결과

- 배포 버전: `9e3c9239-77f1-4ade-95c8-7d496b601a92`
- 적용 범위:
  - `/guides`를 밝은 `guides-clean-index` 목적별 가이드 목록으로 변경
  - `/guides/[slug]`를 밝은 `guide-clean-detail` 읽기 화면으로 변경
  - 상세 가이드 상단에 `guide-decision-brief`를 추가해 이유, 첫 사용 방법, 검수 기준을 먼저 보이게 변경
  - `MakerLaunchCtaBand`, `MakerLaunchInlineCta`를 밝은 `maker-launch-clean-band`, `maker-launch-clean-inline` 구조로 변경
  - 가이드/메이커 CTA의 다크 배경, 그라데이션 헤드라인, 과장형 배너 톤 제거
- 검증:
  - `node scripts\guides-clean-ux.test.mjs`
  - `node scripts\maker-launch-cta.test.mjs`
  - `node scripts\toss-home-funnel.test.mjs`
  - `node scripts\tools-page-clean-ux.test.mjs`
  - `node scripts\tool-detail-clean-ux.test.mjs`
  - `node scripts\category-page-trust.test.mjs`
  - `node scripts\maker-funnel-clean-ux.test.mjs`
  - `node scripts\contact-newsletter-clean-ux.test.mjs`
  - `node scripts\auxiliary-pages-clean-ux.test.mjs`
  - `npm.cmd run typecheck`
  - `npm.cmd run lint`
  - `npm.cmd run build`
  - `npm.cmd run cf:build`
  - `npm.cmd run cf:deploy`
- 라이브 확인:
  - `https://aidailypick.com/guides` 응답 `200`
  - `/guides` HTML에 `guides-clean-index`, `상황별로 바로 고르는`, `검수 기준` 포함
  - `https://aidailypick.com/guides/solo-founder-launch` 응답 `200`
  - 대표 상세 HTML에 `guide-clean-detail`, `guide-decision-brief`, `이 조합을 쓰는 이유` 포함
  - 두 페이지 HTML에 `bg-[#070812]`, `bg-[linear-gradient`, `border-white/10` 미포함
  - 인앱 브라우저 DOM 확인에서 밝은 배경, 목적형 가이드 첫 화면, 상세 결정 브리프, 과장 보장 문구 미노출 확인

## 2026-05-26 슬라이드형 SaaS 큐레이션 UI 배포 확인 결과

- 배포 버전: `d7ed7dc9-4d6a-47d7-bd49-14e423bc0d8f`
- 적용 범위:
  - `/`를 `saas-slide-home` 중심의 Hero, Category Pills, Featured Tool Cards, Comparison, Guide Preview 섹션 구조로 변경
  - `SlideToolCard` 기반의 3분할 툴 카드 도입: 이미지/스크린샷, 기능 설명, 추천 대상/가격/CTA 분리
  - `/tools` 목록과 `/tools/[slug]` 상세 페이지를 같은 슬라이드형 카드 톤으로 정리
  - `/categories/[category]` 카테고리별 목록 페이지와 `/compare` 비교 페이지 추가
  - 전역 폰트를 Pretendard/SUIT 중심의 부드러운 고딕 스택으로 변경하고 H1/H2/H3 굵기를 800 기준으로 완화
  - 헤더/푸터에 비교 페이지 연결 추가
- 검증:
  - `node scripts\slide-redesign.test.mjs`
  - `node scripts\toss-soft-font.test.mjs`
  - `node scripts\tool-detail-slide-layout.test.mjs`
  - `node scripts\site-header-simplified.test.mjs`
  - `node scripts\tools-page-clean-ux.test.mjs`
  - `node scripts\tool-detail-clean-ux.test.mjs`
  - `node scripts\category-page-trust.test.mjs`
  - `node scripts\guides-clean-ux.test.mjs`
  - `npm.cmd run typecheck`
  - `npm.cmd run lint`
  - `npm.cmd run build`
  - `npm.cmd run cf:build`
  - `npm.cmd run cf:deploy`
- 라이브 확인:
  - `https://aidailypick.com/` 응답 `200`, HTML에 `saas-slide-home` 및 `AI 툴과 한국 SaaS를 슬라이드처럼 빠르게 비교하세요` 포함
  - `https://aidailypick.com/tools` 응답 `200`, HTML에 `slide-tool-card` 포함
  - `https://aidailypick.com/tools/chatgpt` 응답 `200`, HTML에 `tool-detail-slide-page`, `tool-detail-hero-slide` 포함
  - `https://aidailypick.com/compare` 응답 `200`, HTML에 `compare-tool-matrix` 포함
  - `https://aidailypick.com/categories/writing` 응답 `200`, HTML에 `slide-tool-card` 포함
  - 라이브 CSS `/_next/static/css/e96fccbd96e98c7a.css` 응답 `200`, `Pretendard`, `--font-heading`, `saas-curation-page` 포함

## 2026-05-26 Toss형 첫 화면 퍼널 배포 확인 결과

- 배포 버전: `8b6cc66f-f77d-4602-ad5b-24e5c2d7f3ea`
- 적용 범위:
  - `/` 실제 엔트리를 `HomeToolDiscovery`로 연결해 첫 화면을 목적 선택형 퍼널로 변경
  - 첫 화면 핵심 카피를 `AI 툴, 처음이면 목적부터 고르세요`로 정리
  - 첫 화면 선택지를 `글쓰기`, `쇼츠/릴스`, `상세페이지` 3개로 제한
  - 긴 슬라이드형 홈 쇼케이스는 재사용 가능한 보조 레이아웃으로 유지하고, 루트 홈에서는 제거
  - Toss형 홈 테스트가 실제 `app/page.tsx` 엔트리까지 확인하도록 보강
- 검증:
  - `node scripts\toss-home-funnel.test.mjs`
  - `node scripts\slide-redesign.test.mjs`
  - `node scripts\toss-clean-ui.test.mjs`
  - `node scripts\market-radar.test.mjs`
  - `node scripts\beginner-paths.test.mjs`
  - `npm.cmd run typecheck`
  - `npm.cmd run lint`
  - `npm.cmd run build`
  - `npm.cmd run cf:build`
  - `npm.cmd run cf:deploy`
- 라이브 확인:
  - `https://aidailypick.com/` 응답 `200`, HTML에 `toss-purpose-selector` 및 `AI 툴, 처음이면 목적부터 고르세요` 포함
  - 홈 HTML에 이전 루트 홈 식별자인 `saas-slide-home`, `AI 툴과 한국 SaaS` 미포함
  - `https://aidailypick.com/tools` 응답 `200`
  - `https://aidailypick.com/compare` 응답 `200`
  - `https://aidailypick.com/methodology` 응답 `200`

## 2026-05-27 리뷰 말투 편집 메모 배포 확인 결과

- 배포 버전: `b0dd1532-336c-4c31-8f83-8593b57c6752`
- 적용 범위:
  - 첫 화면 노출 툴에 `reviewVoice` 필드를 추가해 쇼핑몰 후기처럼 빠르게 읽히는 한 줄 메모 제공
  - 홈 추천 목록, 일반 툴 카드, 슬라이드형 툴 카드, 툴 상세 페이지에 리뷰 말투 메모 노출
  - 실제 사용자 후기를 꾸며낸 것처럼 보이지 않도록 `편집 메모`와 고지 문구를 함께 표시
  - ChatGPT, Claude, Perplexity, Canva, CapCut, OpusClip, Tally에 첫 리뷰 말투 메모 적용
- 검증:
  - `node scripts\review-voice.test.mjs`
  - `node scripts\toss-home-funnel.test.mjs`
  - `node scripts\tool-card-trust.test.mjs`
  - `node scripts\tool-detail-clean-ux.test.mjs`
  - `node scripts\home-discovery-media.test.mjs`
  - `node scripts\official-media-coverage.test.mjs`
  - `node scripts\slide-redesign.test.mjs`
  - `node scripts\tools-page-clean-ux.test.mjs`
  - `node scripts\tool-detail-slide-layout.test.mjs`
  - `npm.cmd run typecheck`
  - `npm.cmd run lint`
  - `npm.cmd run build`
  - `npm.cmd run cf:build`
  - `npm.cmd run cf:deploy`
- 라이브 확인:
  - `https://aidailypick.com/` 응답 `200`, HTML에 `후기 보듯 3개만 보세요`, `쇼핑몰 후기처럼 바로 이해되는 메모` 포함
  - `https://aidailypick.com/tools` 응답 `200`, HTML에 `리뷰 말투 메모`, `실제 사용자 후기가 아니라 편집 메모` 포함
  - `https://aidailypick.com/tools/chatgpt` 응답 `200`, HTML에 `후기처럼 읽는 편집 메모`, `처음엔 이것저것 다 시키기보다` 포함

## 2026-05-27 처음 보는 사람용 정성 리뷰 카피 배포 확인 결과

- 배포 버전: `b3865269-9b28-4bf1-97d0-ea6fec4be38b`
- 적용 범위:
  - `후기 보듯`, `쇼핑몰 후기처럼`, `리뷰 말투`처럼 표면적인 표현을 화면 카피에서 제거
  - ChatGPT, Claude, Perplexity, Canva, CapCut, OpusClip, Tally의 `reviewVoice`를 더 긴 정성 리뷰 문장으로 재작성
  - 툴을 처음 보는 사람이 `무슨 툴인지`, `언제 쓰는지`, `좋은 점`, `아쉬운 점`을 한 번에 이해하도록 설명 구조 변경
  - 홈/툴 목록/툴 상세의 라벨을 `처음 보는 사람용 리뷰`, `처음 보는 사람용 정성 리뷰`로 변경
  - 가짜 사용 후기를 꾸며낸 것처럼 보이지 않도록 `직접 풀어쓴 리뷰 요약` 고지 유지
- 검증:
  - `node scripts\review-voice.test.mjs`
  - `node scripts\toss-home-funnel.test.mjs`
  - `node scripts\tool-card-trust.test.mjs`
  - `node scripts\tool-detail-clean-ux.test.mjs`
  - `npm.cmd run typecheck`
  - `npm.cmd run lint`
  - `npm.cmd run build`
  - `npm.cmd run cf:build`
  - `npm.cmd run cf:deploy`
- 라이브 확인:
  - `https://aidailypick.com/` 응답 `200`, HTML에 `처음 봐도 이해되는 3개`, `툴 이름을 몰라도 괜찮습니다`, `처음 보는 사람도 이해할 수 있게 풀어쓴 정성 리뷰` 포함
  - `https://aidailypick.com/tools` 응답 `200`, HTML에 `처음 보는 사람용 리뷰`, `가짜 사용 후기가 아니라 직접 풀어쓴 리뷰 요약` 포함
  - `https://aidailypick.com/tools/chatgpt` 응답 `200`, HTML에 `처음 보는 사람용 정성 리뷰`, `ChatGPT는 쉽게 말하면 글, 아이디어, 질문 답변을 대신 초안으로 만들어주는 AI 대화 도구입니다` 포함

## 2026-05-29 인스타/스레드형 추천 리뷰 톤 배포 확인 결과

- 배포 버전: `5cdb20c0-22af-4e32-b2ba-339d5bffecf6`
- 적용 범위:
  - 리뷰 카피를 무거운 `정성 리뷰` 톤에서 한국 인스타/스레드 추천글처럼 가볍게 읽히는 말투로 변경
  - `후기 보듯`, `쇼핑몰 후기처럼`, `리뷰 말투`, `정성 리뷰` 같은 표면적 표현을 실제 화면 코드에서 제거
  - ChatGPT, Claude, Perplexity, Canva, CapCut, OpusClip, Tally의 추천 리뷰 문장을 `써볼 만한 상황`, `좋은 점`, `주의할 점` 중심으로 재작성
  - 과한 커뮤체와 과장 표현은 사용하지 않도록 테스트에 금지어 기준 추가
- 검증:
  - `node scripts\review-voice.test.mjs`
  - `node scripts\toss-home-funnel.test.mjs`
  - `node scripts\tool-card-trust.test.mjs`
  - `node scripts\tool-detail-clean-ux.test.mjs`
  - `npm.cmd run typecheck`
  - `npm.cmd run lint`
  - `npm.cmd run build`
  - `npm.cmd run cf:build`
  - `npm.cmd run cf:deploy`
- 라이브 확인:
  - `https://aidailypick.com/` 응답 `200`, HTML에 `처음 봐도 감 오는 3개`, `툴 이름 몰라도 괜찮아요`, `인스타/스레드 추천글처럼` 포함
  - `https://aidailypick.com/tools` 응답 `200`, HTML에 `가볍게 읽는 추천 리뷰`, `광고 후기처럼 꾸미지 않고` 포함
  - `https://aidailypick.com/tools/chatgpt` 응답 `200`, HTML에 `ChatGPT 처음이면 이걸`, `대화로 쓰는 초안 도우미` 포함

## 2026-05-29 검수 툴 전체 추천 리뷰 톤 확장 배포 확인 결과

- 배포 버전: `b4dddd5b-7a21-486a-ba5d-c4ce93897811`
- 적용 범위:
  - 미리캔버스, Typefully, Buffer, Zapier, Make, Gamma, Framer, Typedream, Notion AI, 채널톡, 토스페이먼츠, 모두싸인에 `reviewVoice` 추가
  - 검수된 주요 툴 전체가 인스타/스레드형 추천 리뷰 톤을 유지하도록 테스트 기준 확장
  - 각 리뷰는 `어떤 툴인지`, `누가 쓰면 좋은지`, `처음엔 어떻게 써볼지`, `조심할 점`을 짧고 자연스럽게 설명
  - 과한 커뮤체와 과장 표현 금지 기준 유지
- 검증:
  - `node scripts\review-voice.test.mjs`
  - `node scripts\tool-card-trust.test.mjs`
  - `node scripts\tools-page-clean-ux.test.mjs`
  - `node scripts\tool-detail-clean-ux.test.mjs`
  - `npm.cmd run typecheck`
  - `npm.cmd run lint`
  - `npm.cmd run build`
  - `npm.cmd run cf:build`
  - `npm.cmd run cf:deploy`
- 라이브 확인:
  - `https://aidailypick.com/tools/miricanvas` 응답 `200`, HTML에 `미리캔버스는 한국어 템플릿이 익숙해서`, `상세페이지나 카드뉴스` 포함
  - `https://aidailypick.com/tools/zapier` 응답 `200`, HTML에 `Zapier는 반복 업무를 앱끼리 이어주는 자동화 툴`, `딱 한 가지 반복 작업만 줄여보는` 포함
  - `https://aidailypick.com/tools/toss-payments` 응답 `200`, HTML에 `토스페이먼츠는 국내 고객에게 결제를 받아야 할 때`, `버튼 하나 붙이면 바로 돈 받는 도구라고 생각하면 안 됩니다` 포함
  - `https://aidailypick.com/tools` 응답 `200`, HTML에 `가볍게 읽는 추천 리뷰`, `인스타/스레드` 포함

## 2026-05-29 SNS형 판단 카드 배포 확인 결과

- 배포 버전: `d85a6171-611d-4b8f-af5d-d885b50fe46d`
- 적용 범위:
  - 큰 툴 카드 우측 영역에 `이런 분께`, `먼저 써볼 일`, `조심할 점` 3칸 판단 요약 추가
  - 처음 보는 사용자가 긴 리뷰를 읽기 전에 대상, 첫 사용 장면, 주의점을 바로 확인할 수 있도록 재구성
  - 인스타/스레드형 추천 리뷰 톤은 유지하되 과한 커뮤체와 가짜 사용자 후기 표현은 제외
  - `scripts/social-decision-card.test.mjs` 추가로 판단 카드 구조와 금지어 기준을 고정
- 검증:
  - `node scripts\social-decision-card.test.mjs`
  - `node scripts\review-voice.test.mjs`
  - `node scripts\slide-redesign.test.mjs`
  - `node scripts\tool-detail-slide-layout.test.mjs`
  - `node scripts\tool-card-trust.test.mjs`
  - `npm.cmd run typecheck`
  - `npm.cmd run lint`
  - `npm.cmd run build`
  - `npm.cmd run cf:build`
  - `npm.cmd run cf:deploy`
- 라이브 확인:
  - `https://aidailypick.com/tools` 응답 `200`, HTML에 `sns-decision-strip`, `이런 분께`, `먼저 써볼 일`, `조심할 점`, `가볍게 읽는 추천 리뷰` 포함
  - `https://aidailypick.com/tools/chatgpt` 응답 `200`, HTML에 `이런 분께`, `먼저 써볼 일`, `조심할 점`, `가볍게 읽는 추천 리뷰` 포함

## 2026-06-01 홈/카드 가독성 개선 배포 확인 결과

- 배포 버전: `931229f8-584f-4929-a6c3-a4e0485bfe24`
- 적용 범위:
  - 홈 첫 화면을 `오늘 할 일 하나만 고르세요` 중심의 짧은 선택 흐름으로 재구성
  - 추천 영역을 `오늘의 3픽` 이미지 카드로 변경하고, 카드 설명을 1줄로 제한
  - 일반 툴 카드의 긴 검수 메모를 `Quick Pick` 요약으로 축소
  - `/tools` 첫 검수 카드 노출을 6개에서 3개로 줄이고 반복 판단 문구 제거
  - `scripts/readability-redesign.test.mjs` 추가로 글 과밀 방지 기준을 고정
- 검증:
  - `node scripts\readability-redesign.test.mjs`
  - `node scripts\home-discovery-media.test.mjs`
  - `node scripts\tool-card-trust.test.mjs`
  - `node scripts\tools-page-clean-ux.test.mjs`
  - `node scripts\review-voice.test.mjs`
  - `npm.cmd run typecheck`
  - `npm.cmd run lint`
  - `npm.cmd run build`
  - `npm.cmd run cf:build`
  - `npm.cmd run cf:deploy`
- 라이브 확인:
  - `https://aidailypick.com/` 응답 `200`, HTML에 `오늘 할 일 하나만 고르세요`, `오늘의 3픽`, `home-visual-pick-card` 포함
  - `https://aidailypick.com/` HTML에 이전 긴 안내 문구 `광고 후기처럼 꾸미지 않고` 미포함
  - `https://aidailypick.com/tools` 응답 `200`, HTML에 `처음 보는 사람도 바로 판단할 수 있게 3개만` 포함
  - `https://aidailypick.com/tools` HTML에 반복 문구 `한 줄 판단:`, `추천 대상:`, `주의:` 미포함

## 2026-05-26 공식 미디어 보강 배포 확인 결과

- 배포 버전: `eccad4cc-89b6-4947-b022-de6505f7164a`
- 적용 범위:
  - 주요 SaaS 카드 14개에 공식 페이지 또는 공식 CDN 기반 `media` 메타데이터 추가
  - ChatGPT 기존 `help.openai.com/logo.png` 이미지 403 문제를 OpenAI 공식 아트 카드 이미지로 교체
  - OpusClip, Typedream 외부 링크를 현재 확인된 공식 도메인으로 정리
  - `next.config.ts`에 공식 이미지 호스트 허용 목록 추가
  - 홈 첫 화면 추천 3개 행에 공식 이미지 썸네일을 표시하고, 미디어가 없는 툴은 기존 이니셜 fallback 유지
- 검증:
  - `node scripts\official-media-coverage.test.mjs`
  - `node scripts\home-discovery-media.test.mjs`
  - `node scripts\slide-redesign.test.mjs`
  - `npm.cmd run typecheck`
  - `npm.cmd run lint`
  - `npm.cmd run build`
  - `npm.cmd run cf:build`
  - `npm.cmd run cf:deploy`
- 라이브 확인:
  - `https://aidailypick.com/?v=eccad4cc` 응답 `200`, HTML에 `AI 툴, 처음이면 목적부터 고르세요`, `home-tool-row-media` 포함
  - `https://aidailypick.com/tools?v=eccad4cc` 응답 `200`, HTML에 `slide-tool-card`, `OpenAI official ChatGPT Images preview image` 포함
  - 인앱 브라우저 로컬 확인에서 홈 첫 화면 썸네일 3개와 `/tools` 슬라이드 이미지 6개 모두 로드 성공
