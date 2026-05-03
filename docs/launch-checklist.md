# AIDailyPick Launch Checklist

이 문서는 `aidailypick.com` 런칭 전후에 확인할 항목을 정리합니다.

## 1. Cloudflare Pages 배포 확인

- GitHub 저장소: `https://github.com/supadoro/aidailypic`
- Production branch: `main`
- Framework preset: `Next.js`
- Build command: `npm run build`
- Node version: `NODE_VERSION=20`

확인할 URL:

- `https://aidailypick.com/`
- `https://aidailypick.com/tools`
- `https://aidailypick.com/submit`
- `https://aidailypick.com/contact`
- `https://aidailypick.com/admin`
- `https://aidailypick.com/privacy`
- `https://aidailypick.com/affiliate`
- `https://aidailypick.com/disclaimer`

## 2. 도메인 연결 확인

Cloudflare Pages에서 Custom domain이 아래처럼 연결되어 있어야 합니다.

- `aidailypick.com`
- `www.aidailypick.com` 사용 여부는 선택

확인:

- HTTPS가 정상 적용되는지 확인
- `http://`로 접속해도 `https://`로 이동하는지 확인
- `aidailypic.com`과 혼동되는 표기가 사이트에 없는지 확인

## 3. SEO 기본 확인

확인할 URL:

- `https://aidailypick.com/robots.txt`
- `https://aidailypick.com/sitemap.xml`

확인할 내용:

- `robots.txt`가 sitemap을 가리키는지 확인
- sitemap에 홈, 툴 목록, 툴 상세, 정책 페이지가 포함되는지 확인
- 홈과 툴 페이지에 JSON-LD가 포함되는지 확인

## 4. Google Search Console

순서:

1. Google Search Console에서 속성 추가
2. 도메인 속성으로 `aidailypick.com` 등록
3. Cloudflare DNS TXT 레코드로 소유권 확인
4. sitemap 제출: `https://aidailypick.com/sitemap.xml`
5. 색인 생성 요청

## 5. AdSense 신청 전 확인

필수 페이지:

- 개인정보처리방침: `/privacy`
- 제휴 안내: `/affiliate`
- 면책 고지: `/disclaimer`
- 문의: `/contact`

콘텐츠 품질:

- 홈이 단순 광고판처럼 보이지 않는지 확인
- 툴 상세 페이지에 장점과 아쉬운 점이 모두 있는지 확인
- 제휴 링크/스폰서 표기가 숨겨져 있지 않은지 확인
- 빈 페이지나 깨진 링크가 없는지 확인

## 6. 운영 MVP 확인

현재는 DB 없이 localStorage 기반입니다.

확인 흐름:

1. `/submit`에서 테스트 툴 제안 저장
2. `/contact`에서 테스트 문의 저장
3. `/admin`에서 제출함과 문의함 확인
4. 상태를 `검토 중`, `처리 완료`로 변경
5. 테스트 데이터를 삭제

주의:

- localStorage 데이터는 같은 브라우저에서만 보입니다.
- 실제 운영 전에는 Cloudflare D1, Supabase, Google Sheet/Form 중 하나로 저장소를 교체해야 합니다.

## 7. 다음 운영 개선 후보

- Cloudflare D1 기반 제출/문의 저장
- 관리자 로그인 보호
- 실제 툴 등록 데이터가 공개 페이지에 반영되는 흐름
- AdSense 코드 삽입
- Google Analytics 또는 Plausible 연결
- OG 이미지 생성
