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

## 3. Cloudflare D1 생성

제출, 문의, 뉴스레터 구독 데이터는 `AIDAILYPICK_DB` D1 바인딩이 있을 때 서버에 저장됩니다.

```powershell
npx wrangler d1 create aidailypick-db
npx wrangler d1 execute aidailypick-db --file=docs/d1-schema.sql
```

첫 명령의 출력에서 `database_id`를 복사합니다.

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

## 6. 배포 후 확인

배포 후 아래 경로를 확인합니다.

- `/admin`: 로그인 화면이 보이는지 확인
- `/admin`: 로그인 후 운영 연결 상태 패널 확인
- `/sitemap.xml`: 툴, 카테고리, 가이드 URL이 포함되는지 확인
- `/robots.txt`: sitemap 위치와 비공개 경로 차단 규칙 확인
- `/submit`: 툴 제안 저장 테스트
- `/contact`: 문의 저장 테스트
- `/`: 뉴스레터 구독 저장 테스트

관리자 화면의 운영 연결 상태에서 다음 항목이 확인되어야 합니다.

- 관리자 비밀번호: 연결됨
- 세션 시크릿: 연결됨
- D1 저장소: 연결됨

## 7. 검색엔진 제출

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

## 8. 데이터 확인

Cloudflare D1 콘솔이나 Wrangler로 제출 데이터가 저장되는지 확인합니다.

```powershell
npx wrangler d1 execute aidailypick-db --command="SELECT id, type, status, created_at, email, title FROM submissions ORDER BY created_at DESC LIMIT 10"
```

외부 툴 클릭 추적 데이터도 확인합니다.

```powershell
npx wrangler d1 execute aidailypick-db --command="SELECT tool_slug, source, clicked_at FROM outbound_clicks ORDER BY clicked_at DESC LIMIT 10"
```

## 9. 문제 대응

- 관리자 로그인이 안 되면 `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` secrets를 다시 확인합니다.
- 제출 데이터가 관리자에 보이지 않으면 `AIDAILYPICK_DB` 바인딩 이름이 정확한지 확인합니다.
- 로컬 개발에서는 D1이 없어도 브라우저 `localStorage` fallback으로 제출 데이터가 남을 수 있습니다.
- OpenNext가 Windows에서 경고를 낼 수 있습니다. 배포 빌드가 불안정하면 WSL에서 다시 빌드합니다.
