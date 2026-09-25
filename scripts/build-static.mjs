import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const res = spawnSync(
  process.execPath,
  ["node_modules/next/dist/bin/next", "build", "--webpack"],
  { stdio: "inherit", env: { ...process.env, NEXT_OUTPUT: "export" } }
);

if (res.status !== 0) process.exit(res.status ?? 1);

if (!existsSync("out/index.html")) {
  console.error("build:static: FAILED — out/index.html was not produced");
  process.exit(1);
}

const htaccess = readFileSync(".htaccess", "utf8").replace(/\r\n/g, "\n");
writeFileSync("out/.htaccess", htaccess);

console.log("build:static: OK — deploy the CONTENTS of out/ (incl. .htaccess) to public_html");
