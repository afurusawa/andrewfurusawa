import { readFileSync, writeFileSync } from "fs";
const p = "app/prototype/homepage-chrome-budget/page.tsx";
let s = readFileSync(p, "utf8");
s = s.replace(
  /className="([^"]*\$\{[^"]*)"/g,
  "className={`$1`}",
);
writeFileSync(p, s);
console.log("fixed", (s.match(/className=\{`/g) || []).length);
