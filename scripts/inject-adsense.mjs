import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "out");

// Exact snippet from Google AdSense > Site verification (AdSense code snippet).
const SNIPPET = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4580359695314991"
     crossorigin="anonymous"></script>`;

const CLIENT = "ca-pub-4580359695314991";

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

const files = await walk(OUT_DIR);
let injected = 0;
let already = 0;
const failures = [];

for (const file of files) {
  const html = await readFile(file, "utf8");
  const hasScriptTag = new RegExp(
    `<script[^>]*src="https://pagead2\\.googlesyndication\\.com/pagead/js/adsbygoogle\\.js\\?client=${CLIENT}"[^>]*>\\s*</script>`
  ).test(html);

  if (hasScriptTag) {
    already += 1;
    continue;
  }
  if (!html.includes("</head>")) {
    failures.push(`${path.relative(process.cwd(), file)}: no </head> to inject into`);
    continue;
  }
  await writeFile(file, html.replace("</head>", `${SNIPPET}\n</head>`), "utf8");
  injected += 1;
}

console.log(
  `adsense: ${injected} page(s) injected, ${already} already had the snippet, ${files.length} html file(s) scanned`
);

if (failures.length > 0) {
  for (const f of failures) console.error(`adsense: ${f}`);
  process.exit(1);
}
