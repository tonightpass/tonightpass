const packageJson = require("./package.json");
const generatePackageJson = require("rollup-plugin-generate-package-json");
const copy = require("rollup-plugin-copy-sync");

delete packageJson.scripts;
delete packageJson.devDependencies;
delete packageJson["size-limit"];
delete packageJson.husky;
delete packageJson.files;

module.exports = {
  rollup(config) {
    config.plugins = [
      ...config.plugins,
      generatePackageJson({
        baseContents: {
          ...packageJson,
          private: false,
          module: "./index.esm.js",
          main: "./index.js",
          typings: "./index.d.ts",
        },
      }),
      copy({
        targets: [
          { src: ["./*.md"], dest: "./dist" },
          { src: ["./LICENSE"], dest: "./dist" },
        ],
      }),
    ];

    return config;
  },
};
