import { collection, config, fields } from "@keystatic/core";

/**
 * Local-only authoring UI. Entries are Markdown files under content/blog/.
 * Presentations never import this module — they read those files through
 * app/lib/blogCatalogue.ts.
 */
export default config({
  storage: {
    kind: "local",
  },
  ui: {
    brand: { name: "Writing" },
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "content/blog/*",
      entryLayout: "content",
      format: { contentField: "content" },
      columns: ["title", "date", "draft"],
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            validation: { isRequired: true },
          },
        }),
        date: fields.date({
          label: "Date",
          validation: { isRequired: true },
        }),
        summary: fields.text({
          label: "Summary",
          description: "Teaser on both presentations, and the meta description.",
          multiline: true,
          validation: { isRequired: true, length: { min: 1 } },
        }),
        draft: fields.checkbox({
          label: "Draft",
          description:
            "Drafts stay off the public listing, sitemap, and RSS until you uncheck this and push.",
          defaultValue: true,
        }),
        content: fields.markdoc({
          label: "Body",
          extension: "md",
          options: {
            heading: true,
            bold: true,
            italic: true,
            strikethrough: false,
            code: true,
            blockquote: true,
            orderedList: true,
            unorderedList: true,
            table: false,
            link: true,
            divider: true,
            codeBlock: true,
            image: {
              directory: "public/blog",
              publicPath: "/blog/",
            },
          },
        }),
      },
    }),
  },
});
