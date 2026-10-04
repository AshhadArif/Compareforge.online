/**
 * ESM resolve hook so Node can run the TypeScript sources directly:
 * - Next/TS allow extensionless relative imports ("./calc"); Node's native
 *   type-stripping requires an explicit extension.
 * - The tsconfig "@/*" alias maps to "src/*".
 */
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "src");

export async function resolve(specifier, context, nextResolve) {
  let target = specifier;
  if (specifier.startsWith("@/")) target = pathToFileURL(path.join(SRC, specifier.slice(2))).href;

  try {
    return await nextResolve(target, context);
  } catch (err) {
    if (target.startsWith("./") || target.startsWith("../") || target.startsWith("/") || target.startsWith("file:")) {
      for (const suffix of [".ts", ".tsx", "/index.ts"]) {
        try {
          return await nextResolve(target + suffix, context);
        } catch {
          /* try next */
        }
      }
    }
    throw err;
  }
}
