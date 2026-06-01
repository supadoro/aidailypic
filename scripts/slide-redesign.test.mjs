import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const homeShowcasePath = "src/components/home-saas-showcase.tsx";
const slideCardPath = "src/components/slide-tool-card.tsx";
const globalsPath = "app/globals.css";
const categoriesPagePath = "app/categories/[category]/page.tsx";
const comparePagePath = "app/compare/page.tsx";

function read(path) {
  return readFileSync(path, "utf8");
}

test("slide-like SaaS showcase remains available as a reusable supporting layout", () => {
  assert.equal(existsSync(homeShowcasePath), true);
  const showcase = read(homeShowcasePath);

  assert.match(showcase, /saas-slide-home/);
  assert.match(showcase, /hero-section/);
  assert.match(showcase, /category-pills/);
  assert.match(showcase, /featured-tool-cards/);
  assert.match(showcase, /comparison-section/);
  assert.match(showcase, /guide-preview-section/);
});

test("tool introduction card uses a responsive three-panel slide layout", () => {
  assert.equal(existsSync(slideCardPath), true);
  const source = read(slideCardPath);

  assert.match(source, /slide-tool-card/);
  assert.match(source, /slide-tool-media/);
  assert.match(source, /slide-tool-content/);
  assert.match(source, /slide-tool-action/);
  assert.match(source, /md:grid-cols-\[minmax\(240px,0\.9fr\)_minmax\(0,1\.25fr\)_minmax\(220px,0\.7fr\)\]/);
  assert.match(source, /이런 분께/);
  assert.match(source, /먼저 써볼 일/);
  assert.match(source, /조심할 점/);
  assert.match(source, /가격/);
  assert.match(source, /난이도/);
});

test("global design tokens separate heading and body font stacks", () => {
  const source = read(globalsPath);

  assert.match(source, /--font-heading/);
  assert.match(source, /--font-body/);
  assert.match(source, /Pretendard|SUIT/);
  assert.doesNotMatch(source, /--font-heading:[^;]*(Noto Serif KR|Nanum Myeongjo|Georgia|Times New Roman)/);
  assert.match(source, /font-family: var\(--font-body\)/);
  assert.match(source, /\.font-heading/);
});

test("requested supporting route structure exists", () => {
  assert.equal(existsSync(categoriesPagePath), true);
  assert.equal(existsSync(comparePagePath), true);

  const categoriesPage = read(categoriesPagePath);
  const comparePage = read(comparePagePath);

  assert.match(categoriesPage, /generateStaticParams/);
  assert.match(categoriesPage, /getCategoryBySlug/);
  assert.match(comparePage, /compare-tool-matrix/);
  assert.match(comparePage, /비교/);
});
