import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const directoryPath = "src/data/saas-directory.ts";
const nextConfigPath = "next.config.ts";

const priorityMediaSlugs = [
  "claude",
  "miricanvas",
  "opusclip",
  "typefully",
  "buffer",
  "zapier",
  "make",
  "gamma",
  "framer",
  "typedream",
  "notion-ai",
  "channel-talk",
  "toss-payments",
  "modusign",
];

function getToolBlock(source, slug) {
  const slugIndex = source.indexOf(`slug: "${slug}",`);
  assert.notEqual(slugIndex, -1, `${slug} should exist in the SaaS directory`);

  const blockStart = source.lastIndexOf("\n  {", slugIndex);
  const blockEnd = source.indexOf("\n  {", slugIndex + 1);
  const arrayEnd = source.indexOf("\n];", slugIndex);

  return source.slice(blockStart, blockEnd === -1 ? arrayEnd : blockEnd);
}

function getStringField(block, fieldName, slug) {
  const fieldMatch = block.match(new RegExp(`${fieldName}:\\s*"([^"]+)"`));
  assert.ok(fieldMatch, `${slug} should include ${fieldName}`);

  return fieldMatch[1];
}

test("priority SaaS tools include official media metadata for slide cards", () => {
  const source = readFileSync(directoryPath, "utf8");

  for (const slug of priorityMediaSlugs) {
    const toolBlock = getToolBlock(source, slug);

    assert.match(toolBlock, /media:\s*\{/, `${slug} should include media metadata`);
    assert.ok(new URL(getStringField(toolBlock, "imageUrl", slug)), `${slug} should use a valid imageUrl`);
    assert.ok(new URL(getStringField(toolBlock, "imageSourceUrl", slug)), `${slug} should use a valid imageSourceUrl`);
    assert.match(toolBlock, /mediaType:\s*"image"/, `${slug} should use image media`);
  }
});

test("next image config allows official media hostnames used by priority tools", () => {
  const source = readFileSync(directoryPath, "utf8");
  const config = readFileSync(nextConfigPath, "utf8");

  const hostnames = Array.from(
    new Set(
      priorityMediaSlugs.map((slug) => {
        const toolBlock = getToolBlock(source, slug);
        return new URL(getStringField(toolBlock, "imageUrl", slug)).hostname;
      }),
    ),
  );

  for (const hostname of hostnames) {
    assert.match(config, new RegExp(`hostname: "${hostname.replaceAll(".", "\\.")}"`), `${hostname} should be allowed as a Next image host`);
  }
});
