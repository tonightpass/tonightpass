import { defineDocs, defineConfig } from "fumadocs-mdx/config";

export const docs = defineDocs({
  // Main documentation content
  dir: "content/docs",
});

// Define API reference documentation separately
export const apiReference = defineDocs({
  dir: "content/api-reference",
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
