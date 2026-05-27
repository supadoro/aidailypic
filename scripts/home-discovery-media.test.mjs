import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const componentPath = "src/components/home-tool-discovery.tsx";

test("home discovery rows show official media thumbnails when a tool has media", () => {
  const source = readFileSync(componentPath, "utf8");

  assert.match(source, /import Image from "next\/image";/, "home discovery should use optimized official media images");
  assert.match(source, /tool\.media\s*\?/, "tool rows should branch on official media availability");
  assert.match(source, /className="home-tool-row-media/, "tool rows should expose a stable media thumbnail surface");
  assert.match(source, /src=\{tool\.media\.imageUrl\}/, "official media should come from the tool directory imageUrl");
  assert.match(source, /\{tool\.logoText\}/, "tool rows should keep the logo-text fallback when media is missing");
});
