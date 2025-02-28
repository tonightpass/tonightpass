/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  entryPoints: [
    "../../packages/node/src/index.ts",
    "../../packages/react/src/index.ts",
    "../../packages/nest/src/index.ts",
  ],
  out: "./content/api-reference",
  plugin: [
    "typedoc-plugin-mdn-links",
    "typedoc-plugin-markdown",
    "typedoc-plugin-frontmatter",
    "./scripts/typedoc-custom-frontmatter.mjs",
  ],
  readme: "none",
  name: "TonightPass API Reference",
  githubPages: false,
  gitRevision: "master",
  cleanOutputDir: true,
  tsconfig: "./typedoc.tsconfig.json",

  // typedoc-plugin-markdown - file options
  fileExtension: ".mdx",
  entryFileName: "index",

  // typedoc-plugin-markdown - display options
  hidePageTitle: true,
  hideBreadcrumbs: true,
  hidePageHeader: true,
  hideGroupHeadings: true,
  indexFormat: "table",
  parametersFormat: "table",
  classPropertiesFormat: "table",
  enumMembersFormat: "table",
  typeDeclarationFormat: "table",
  propertyMembersFormat: "table",
  interfacePropertiesFormat: "table",

  // typedoc-plugin-markdown - utility options
  formatWithPrettier: true,
};
