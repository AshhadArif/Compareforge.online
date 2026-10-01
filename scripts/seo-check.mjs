import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = join(process.cwd(), "out");
const SITE = "https://compareforge.online";

/** Collect every .html file under out/ */
function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full));
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

/** Resolve a site path ("/a/b") to a file in out/, if one exists */
function resolveStatic(path) {
  const clean = path.replace(/^\/+/, "").split("?")[0].split("#")[0];
  const candidates = clean === "" ? ["index.html"] : [
    `${clean}.html`,
    join(clean, "index.html"),
    clean,
  ];
  return candidates.some((c) => existsSync(join(ROOT, c)));
}

const files = walk(ROOT);
const errors = [];
const warnings = [];

const pages = files.map((file) => {
  const rel = "/" + relative(ROOT, file).split("\\").join("/");
  const html = readFileSync(file, "utf8");
  const route = rel.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
  return { file, rel, route, html };
});

const canonicals = new Map();

for (const page of pages) {
  const { rel, html } = page;

  // --- meta / structure ---
  const title = (html.match(/<title[^>]*>([^<]*)<\/title>/) || [])[1];
  if (!title || !title.trim()) errors.push(`${rel}: missing <title>`);

  const desc = html.match(/<meta name="description" content="([^"]*)"/);
  if (!desc || !desc[1].trim()) errors.push(`${rel}: missing meta description`);

  // Body markup without <script>/<style> payloads (RSC flight data, bundles).
  const body = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "");

  const h1s = [...body.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
  if (h1s.length !== 1) errors.push(`${rel}: expected exactly 1 <h1>, found ${h1s.length}`);

  // --- heading hierarchy: h1 first, no skipped levels ---
  const headingLevels = [...body.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
  if (headingLevels.length) {
    if (headingLevels[0] !== 1) errors.push(`${rel}: first heading is h${headingLevels[0]}, not h1`);
    let prev = headingLevels[0];
    for (const lvl of headingLevels.slice(1)) {
      if (lvl - prev > 1) {
        errors.push(`${rel}: heading level jump h${prev} -> h${lvl}`);
        break;
      }
      prev = lvl;
    }
  }

  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
  const isUtilityPage = /\/(404|_not-found)\.html$/.test(rel);
  if (!isUtilityPage) {
    if (!canonical) errors.push(`${rel}: missing canonical`);
    else {
      if (canonicals.has(canonical)) {
        errors.push(`${rel}: canonical ${canonical} duplicates ${canonicals.get(canonical)}`);
      } else canonicals.set(canonical, rel);
    }
  }

  // --- JSON-LD ---
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      errors.push(`${rel}: unparsable JSON-LD (${e.message})`);
    }
  }

  // --- links ---
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));

  for (const m of body.matchAll(/<a\b[^>]*?href="([^"]*)"[^>]*?>/g)) {
    const href = m[1];
    if (!href) {
      errors.push(`${rel}: empty href`);
      continue;
    }
    if (/^(https?:|mailto:|tel:)/.test(href)) {
      if (href.startsWith(SITE) === false) continue; // external, skip
      const path = href.slice(SITE.length) || "/";
      if (!resolveStatic(path)) errors.push(`${rel}: broken site link ${href}`);
      continue;
    }
    if (href.startsWith("#")) {
      const id = href.slice(1);
      if (id && !ids.has(id)) errors.push(`${rel}: broken anchor ${href}`);
      continue;
    }
    if (href.startsWith("/")) {
      const [path, hash] = href.split("#");
      if (!resolveStatic(path || "/")) {
        errors.push(`${rel}: broken internal link ${href}`);
        continue;
      }
      if (hash) {
        const targetFile = (() => {
          const clean = (path || "/").replace(/^\/+/, "").split("?")[0];
          if (clean === "") return join(ROOT, "index.html");
          if (existsSync(join(ROOT, `${clean}.html`))) return join(ROOT, `${clean}.html`);
          return join(ROOT, clean, "index.html");
        })();
        if (existsSync(targetFile)) {
          const targetHtml = readFileSync(targetFile, "utf8");
          if (!new RegExp(`\\bid="${hash}"`).test(targetHtml)) {
            errors.push(`${rel}: broken cross-page anchor ${href}`);
          }
        }
      }
      continue;
    }
    warnings.push(`${rel}: relative link ${href}`);
  }
}

// --- sitemap coverage ---
const sitemapPath = join(ROOT, "sitemap.xml");
if (existsSync(sitemapPath)) {
  const sitemap = readFileSync(sitemapPath, "utf8");
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const loc of locs) {
    const path = loc.startsWith(SITE) ? loc.slice(SITE.length) || "/" : null;
    if (path === null) {
      errors.push(`sitemap: non-site URL ${loc}`);
      continue;
    }
    if (!resolveStatic(path)) errors.push(`sitemap: URL has no file ${loc}`);
  }
  const htmlRoutes = pages
    .map((p) => p.route)
    .filter((r) => !r.includes("/_") && !r.includes("/404"));
  const notInSitemap = htmlRoutes.filter(
    (r) => !locs.includes(SITE + (r === "/" ? "" : r))
  );
  if (notInSitemap.length) {
    warnings.push(`${notInSitemap.length} pages not in sitemap: ${notInSitemap.slice(0, 10).join(", ")}${notInSitemap.length > 10 ? "…" : ""}`);
  }
}

console.log(`pages checked: ${pages.length}`);
console.log(`errors: ${errors.length}`);
for (const e of errors) console.log(`  ERROR ${e}`);
console.log(`warnings: ${warnings.length}`);
for (const w of warnings.slice(0, 30)) console.log(`  WARN  ${w}`);

process.exit(errors.length ? 1 : 0);
