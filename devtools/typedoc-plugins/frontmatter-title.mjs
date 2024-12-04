// @ts-check
import { MarkdownPageEvent } from "typedoc-plugin-markdown";

/**
 * @param {import('typedoc-plugin-markdown').MarkdownApplication} app
 */
export function load(app) {
  app.renderer.on(
    MarkdownPageEvent.BEGIN,
    /** @param {import('typedoc-plugin-markdown').MarkdownPageEvent} page */
    (page) => {
      /**
       * Update page.frontmatter object using information from the page model as JSON
       *
       * Here if the page is a class, we set the title to the class name
       */
      page.frontmatter = {
        // e.g add a title
        title: page.model?.name.replace("@tonightpass/", ""),
        hideTitle: true,
        // spread the existing frontmatter
        ...page.frontmatter,
      };
    },
  );
}
