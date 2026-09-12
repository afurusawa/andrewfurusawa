import type { Metadata } from "next";
import { getPublishedBlogEntries } from "../../lib/blogCatalogue";
import { SITE_NAME } from "../../config/site";
import { BlogIndex } from "./BlogIndex";

export const metadata: Metadata = {
  title: `Writing · ${SITE_NAME}`,
  description: "Notes and longer writing from Andrew Furusawa.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  return <BlogIndex entries={getPublishedBlogEntries()} />;
}
