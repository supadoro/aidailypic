UPDATE submissions
SET
  details = '가격/무료 플랜: 베타 무료. 제품 이미지/스크린샷: https://example.com/smoke-readiness.gif',
  payload_json = '{"type":"tool","toolName":"Smoke Readiness Tool","websiteUrl":"https://example.com/smoke-readiness","category":"노코드 툴","audience":"1인 창업자","contactEmail":"smoke-readiness@example.com","summary":"Smoke summary for readiness gate.","details":"가격/무료 플랜: 베타 무료. 제품 이미지/스크린샷: https://example.com/smoke-readiness.gif","mediaUrl":"https://example.com/smoke-readiness.gif","publicConsent":true}'
WHERE id = 'tool-smoke-readiness-20260512-1';
