import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const appRoot = join(process.cwd(), "app");
const experimentRoot = join(appRoot, "90s");
const hrefIntoExperiment =
  /\bhref\s*=\s*(?:["'`][^"'`]*\/90s(?:["'`/?#]|$)|\{\s*["'`]\s*\/90s)/;

function collectSourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      return collectSourceFiles(path);
    }
    if (!/\.(tsx?|jsx?)$/.test(entry) || entry.endsWith(".test.ts")) {
      return [];
    }
    return [path];
  });
}

describe("modern presentation inbound links", () => {
  it("does not link into /90s from any route outside the experiment", () => {
    const offenders = collectSourceFiles(appRoot)
      .filter((path) => !path.startsWith(experimentRoot))
      .filter((path) => hrefIntoExperiment.test(readFileSync(path, "utf8")))
      .map((path) => relative(process.cwd(), path));

    expect(offenders).toEqual([]);
  });
});
