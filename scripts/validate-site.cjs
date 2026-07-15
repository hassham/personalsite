const fs = require("fs");
const path = require("path");
const YAML = require("yaml");

const root = path.resolve(__dirname, "..", "_site");
const failures = [];

try {
  const cmsConfig = YAML.parse(fs.readFileSync(path.resolve(__dirname, "..", ".pages.yml"), "utf8"));
  if (!cmsConfig.media || !Array.isArray(cmsConfig.content)) failures.push("Pages CMS configuration is incomplete");
  for (const requiredCollection of ["posts", "work"]) {
    if (!cmsConfig.content.some((entry) => entry.name === requiredCollection)) failures.push(`Pages CMS is missing the ${requiredCollection} collection`);
  }
} catch (error) {
  failures.push(`Pages CMS configuration is invalid: ${error.message}`);
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

const pages = walk(root).filter((file) => file.endsWith(".html"));

for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  const relativeFile = path.relative(root, file);
  const ids = [...html.matchAll(/\sid=["']([^"']+)["']/g)].map((match) => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length) failures.push(`${relativeFile}: duplicate IDs (${[...new Set(duplicateIds)].join(", ")})`);

  for (const image of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\salt=["'][^"']*["']/i.test(image[0])) failures.push(`${relativeFile}: image missing alt text`);
  }

  const withoutCode = html.replace(/<pre\b[\s\S]*?<\/pre>/gi, "").replace(/<code\b[\s\S]*?<\/code>/gi, "");
  if (/\{%|\{\{/.test(withoutCode)) failures.push(`${relativeFile}: unrendered template syntax`);

  if (relativeFile !== "gallery.html" && !html.includes("G-306RQ1H12G")) {
    failures.push(`${relativeFile}: analytics is missing`);
  }

  for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/gi)) {
    const reference = match[1].split("#")[0].split("?")[0];
    if (!reference || /^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(reference)) continue;
    const target = reference.startsWith("/")
      ? path.join(root, reference.slice(1))
      : path.resolve(path.dirname(file), reference);
    if (!fs.existsSync(target)) failures.push(`${relativeFile}: missing local resource ${reference}`);
  }
}

const articleCount = pages.filter((file) => path.dirname(file) === path.join(root, "blog")).length;
if (articleCount !== 6) failures.push(`Expected 6 generated articles, found ${articleCount}`);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Validated ${pages.length} generated pages, including ${articleCount} CMS-managed articles.`);
