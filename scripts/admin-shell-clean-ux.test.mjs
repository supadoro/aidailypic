import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const adminPagePath = "app/admin/page.tsx";
const loginPath = "src/components/admin-login-form.tsx";
const logoutPath = "src/components/admin-logout-button.tsx";
const healthPath = "src/components/admin-health-panel.tsx";
const analyticsPath = "src/components/admin-analytics-panel.tsx";

function assertLightAdminSurface(source) {
  assert.doesNotMatch(source, /bg-\[#070812\]|bg-\[#111326\]/);
  assert.doesNotMatch(source, /border-white\/10|text-white\/|shadow-\[0_24px_90px/);
  assert.doesNotMatch(source, /bg-\[linear-gradient/);
}

test("admin page shell is a light operational workspace", () => {
  const source = readFileSync(adminPagePath, "utf8");

  assert.match(source, /admin-operating-shell/);
  assert.match(source, /admin-launch-checklist/);
  assert.match(source, /bg-\[#f8fafc\]/);
  assert.match(source, /운영 작업대/);
  assertLightAdminSurface(source);
});

test("admin login and logout controls match the clean operational UI", () => {
  const login = readFileSync(loginPath, "utf8");
  const logout = readFileSync(logoutPath, "utf8");

  assert.match(login, /admin-login-panel/);
  assert.match(login, /bg-white/);
  assert.match(login, /bg-\[#3182f6\]/);
  assertLightAdminSurface(login);
  assert.match(logout, /border-slate-200/);
  assertLightAdminSurface(logout);
});

test("admin health panel uses light status cards", () => {
  const source = readFileSync(healthPath, "utf8");

  assert.match(source, /admin-health-panel/);
  assert.match(source, /bg-white/);
  assert.match(source, /운영 연결 상태/);
  assertLightAdminSurface(source);
});

test("admin analytics panel uses light metric cards and controls", () => {
  const source = readFileSync(analyticsPath, "utf8");

  assert.match(source, /admin-analytics-panel/);
  assert.match(source, /bg-white/);
  assert.match(source, /써보러 가기 클릭 분석/);
  assertLightAdminSurface(source);
});
