import { writeFileSync } from "fs";
import { execSync } from "child_process";

const body = execSync("gh issue view 66 --json body --jq .body", {
  encoding: "utf8",
});

const insertion = `
- [Set the performance budget for the rebuilt homepage chrome](https://github.com/afurusawa/andrewfurusawa/issues/79) — Live ceilings carry in KiB, \`/\` only: 500 / 150 / 100 / 200 plus CWV. Pinned latin stack (Inter / Newsreader / Plex 400, Fraunces optical-size at 400, self-hosted Fraunces cut) fits: 242.9 / 117.8 / 92.5 KiB measured on \`prototype/homepage-chrome-budget\`. Extra weights do not fit.

`;

const marker =
  "New term **Colour scheme** in `CONTEXT.md` (`domain/colour-scheme`).\n\n## Not yet specified";

if (!body.includes(marker)) {
  throw new Error("map marker not found");
}

const next = body.replace(
  marker,
  "New term **Colour scheme** in `CONTEXT.md` (`domain/colour-scheme`).\n" +
    insertion +
    "## Not yet specified",
);

writeFileSync(".tmp-budget-lh/map-66.md", next);
console.log("patched", next.length);
