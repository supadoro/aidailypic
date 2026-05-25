import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const globalsPath = "app/globals.css";
const homePath = "src/components/home-tool-discovery.tsx";
const headerPath = "src/components/site-header.tsx";

test("home uses a Toss-like clean surface skin", () => {
  const globals = readFileSync(globalsPath, "utf8");
  const home = readFileSync(homePath, "utf8");

  assert.match(home, /toss-clean/);
  assert.match(globals, /\.toss-clean/);
  assert.match(globals, /#f8fafc/);
  assert.match(globals, /#3182f6/);
  assert.match(globals, /#e5e8eb/);
  assert.match(globals, /box-shadow: 0 8px 24px/);
});

test("global chrome moves away from dark neon header styling", () => {
  const globals = readFileSync(globalsPath, "utf8");
  const header = readFileSync(headerPath, "utf8");

  assert.match(header, /bg-white\/90/);
  assert.match(header, /text-slate-900/);
  assert.match(header, /bg-\[#3182f6\]/);
  assert.doesNotMatch(header, /bg-\[#070812\]\/85/);
  assert.doesNotMatch(header, /FD1D6C|833AB4/);
  assert.doesNotMatch(globals, /radial-gradient/);
});
