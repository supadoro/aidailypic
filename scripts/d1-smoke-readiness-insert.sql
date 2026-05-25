DELETE FROM submissions WHERE id = 'tool-smoke-readiness-20260512-1';

INSERT INTO submissions (
  id, type, status, created_at, email, name, title, url, category,
  audience, source, interest, summary, details, message, payload_json
) VALUES (
  'tool-smoke-readiness-20260512-1',
  'tool',
  'featured',
  datetime('now'),
  'smoke-readiness@example.com',
  NULL,
  'Smoke Readiness Tool',
  'https://example.com/smoke-readiness',
  '노코드 툴',
  '1인 창업자',
  NULL,
  NULL,
  'Smoke summary for readiness gate.',
  'No pricing or media yet',
  NULL,
  '{"type":"tool","toolName":"Smoke Readiness Tool","websiteUrl":"https://example.com/smoke-readiness","category":"노코드 툴","audience":"1인 창업자","contactEmail":"smoke-readiness@example.com","summary":"Smoke summary for readiness gate.","details":"No pricing or media yet","mediaUrl":"","publicConsent":true}'
);
