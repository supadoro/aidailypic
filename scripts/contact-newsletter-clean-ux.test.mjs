import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const contactPagePath = "app/contact/page.tsx";
const contactFormPath = "src/components/contact-form.tsx";
const newsletterFormPath = "src/components/newsletter-form.tsx";

test("contact page routes users to submit, contact, and newsletter without dark landing chrome", () => {
  const source = readFileSync(contactPagePath, "utf8");

  assert.match(source, /contact-trust-funnel/);
  assert.match(source, /NewsletterForm/);
  assert.match(source, /런칭 제보하기/);
  assert.match(source, /새 툴 업데이트 받기/);
  assert.doesNotMatch(source, /text-pink-100|hover:text-white|bg-\[#070812\]/);
});

test("contact form uses a clean light input panel", () => {
  const source = readFileSync(contactFormPath, "utf8");

  assert.match(source, /contact-form-panel/);
  assert.match(source, /bg-white/);
  assert.match(source, /bg-\[#3182f6\]/);
  assert.doesNotMatch(source, /bg-\[#070812\]|bg-\[#111326\]/);
  assert.doesNotMatch(source, /border-white\/10|text-white\/|focus:border-pink/);
});

test("newsletter form is a reusable light signup component", () => {
  const source = readFileSync(newsletterFormPath, "utf8");

  assert.match(source, /newsletter-signup-panel/);
  assert.match(source, /bg-white/);
  assert.match(source, /bg-\[#3182f6\]/);
  assert.match(source, /관심 주제/);
  assert.doesNotMatch(source, /bg-\[#070812\]|bg-\[#111326\]/);
  assert.doesNotMatch(source, /border-white\/10|text-white\/|focus:border-pink/);
});
