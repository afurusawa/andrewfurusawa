import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

/**
 * Coerce YAML frontmatter to a trimmed string. Bare dates become YYYY-MM-DD
 * because the YAML parser turns them into Date objects.
 */
export function frontmatterString(value: unknown): string | undefined {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return typeof value === "string" && value.trim() !== ""
    ? value.trim()
    : undefined;
}

/**
 * Compile Markdown to sanitized HTML. Standard Markdown only — no GFM and
 * no raw HTML, which the default sanitize schema strips on the way through.
 */
export async function renderMarkdownHtml(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}
